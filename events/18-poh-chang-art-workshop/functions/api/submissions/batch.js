/**
 * Cloudflare Pages Function: Batch Submissions Import API
 * POST /api/submissions/batch
 */
export async function onRequestPost(context) {
  const { request, env } = context;

  const adminKey = request.headers.get('x-admin-key');
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ success: false, error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const keyToCheck = adminKey || body.adminKey;
  if (keyToCheck !== 'admin123') {
    return new Response(JSON.stringify({ success: false, error: 'Unauthorized: Invalid Admin Key' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const items = body.items || [];
  if (!Array.isArray(items) || items.length === 0) {
    return new Response(JSON.stringify({ success: false, error: 'No items provided' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (!env.DB) {
    return new Response(JSON.stringify({ success: false, error: 'Database binding DB not found' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Cloudinary configuration for storage
  const cloudName = env.CLOUDINARY_CLOUD_NAME || 'gpea1udi';
  const uploadPreset = env.CLOUDINARY_UPLOAD_PRESET || 'art_event_sirikit';

  async function uploadToCloudinary(base64DataUrl) {
    if (!base64DataUrl || typeof base64DataUrl !== 'string' || !base64DataUrl.startsWith('data:image/')) {
      return { url: '', public_id: '' };
    }
    try {
      const formData = new FormData();
      formData.append('file', base64DataUrl);
      formData.append('upload_preset', uploadPreset);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData
      });
      if (!res.ok) {
        const errText = await res.text();
        console.warn('Cloudinary upload error:', res.status, errText);
        return { url: '', public_id: '' };
      }
      const data = await res.json();
      return {
        url: data.secure_url || data.url || '',
        public_id: data.public_id || ''
      };
    } catch (e) {
      console.warn('Cloudinary upload exception:', e.message);
      return { url: '', public_id: '' };
    }
  }

  try {
    // Get max display order
    const maxRes = await env.DB.prepare('SELECT MAX(display_order) as maxOrder FROM submissions').first();
    let currentOrder = (maxRes && maxRes.maxOrder) ? maxRes.maxOrder : 0;
    const defaultStatus = body.status || 'approved';

    const insertStmt = env.DB.prepare(`
      INSERT INTO submissions (
        title, artist_name, description,
        image_url, thumbnail_url, cloudinary_public_id,
        artist_avatar_url, artist_bio,
        nationality, technique, dimensions,
        year_created, price, status, display_order,
        title_th, artist_name_th, artist_bio_th,
        technique_th, description_th, artist_email
      ) VALUES (
        ?, ?, ?,
        ?, ?, ?,
        ?, ?,
        ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?
      )
    `);

    const cleanDash = (v) => (!v || String(v).trim() === '' || String(v).trim() === '-') ? '-' : String(v).trim();
    const batchStatements = [];

    for (let idx = 0; idx < items.length; idx++) {
      const item = items[idx];
      currentOrder += 1;
      const title = cleanDash(item.title || item.artworkTitle || item.ชื่องาน);
      const artist = cleanDash(item.artist_name || item.artistName || item.ชื่อศิลปิน);
      const desc = cleanDash(item.description || item.concept || item.แนวคิด);

      // Artwork Image resolution:
      // 1. Direct image_url if provided
      // 2. Upload image_data_url to Cloudinary
      // 3. Fallback: empty string (NEVER mockup)
      let img = item.image_url || item.imageUrl || '';
      let artPublicId = item.cloudinary_public_id || '';
      if (!img && item.image_data_url) {
        const uploadRes = await uploadToCloudinary(item.image_data_url);
        img = uploadRes.url;
        artPublicId = uploadRes.public_id;
      }

      // Artist Avatar resolution:
      // Strictly NO mockup! If not provided, empty string
      let avatar = item.artist_avatar_url || item.artistAvatarUrl || '';
      if (avatar && avatar.includes('unsplash.com')) {
        avatar = '';
      }
      if (!avatar && item.artist_avatar_data_url) {
        const avUploadRes = await uploadToCloudinary(item.artist_avatar_data_url);
        avatar = avUploadRes.url;
      }

      const bio = cleanDash(item.artist_bio || item.bio || item.ประวัติ);
      const nat = cleanDash(item.nationality || item.country || item.สัญชาติ || item.ประเทศ);
      const tech = cleanDash(item.technique || item.medium || item.เทคนิค);
      const dims = cleanDash(item.dimensions || item.size || item.ขนาด);
      const yr = cleanDash(item.year_created || item.year || item.ปี);
      const pr = cleanDash(item.price || item.ราคา);
      const stat = item.status || defaultStatus;

      let emailRaw = item.artist_email || item.email || item.อีเมล || item.อีเมล์ || '';
      let emailVal = (emailRaw && String(emailRaw).trim() !== '-' && String(emailRaw).includes('@')) ? String(emailRaw).trim() : '';

      batchStatements.push(
        insertStmt.bind(
          title, artist, desc,
          img, img, artPublicId,
          avatar, bio,
          nat, tech, dims,
          yr, pr, stat, currentOrder,
          title, artist, bio,
          tech, desc, emailVal
        )
      );
    }

    await env.DB.batch(batchStatements);

    return new Response(JSON.stringify({ success: true, count: items.length }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
