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

  try {
    // Get max display order
    const maxRes = await env.DB.prepare('SELECT MAX(display_order) as maxOrder FROM submissions').first();
    let currentOrder = (maxRes && maxRes.maxOrder) ? maxRes.maxOrder : 0;
    const defaultStatus = body.status || 'approved';

    const insertStmt = env.DB.prepare(`
      INSERT INTO submissions (
        title, artist_name, description,
        image_url, thumbnail_url,
        artist_avatar_url, artist_bio,
        nationality, technique, dimensions,
        year_created, price, status, display_order,
        title_th, artist_name_th, artist_bio_th,
        technique_th, description_th
      ) VALUES (
        ?, ?, ?,
        ?, ?,
        ?, ?,
        ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?,
        ?, ?
      )
    `);

    const cleanDash = (v) => (!v || String(v).trim() === '' || String(v).trim() === '-') ? '-' : String(v).trim();
    const batchStatements = items.map(item => {
      currentOrder += 1;
      const title = cleanDash(item.title || item.artworkTitle || item.ชื่องาน);
      const artist = cleanDash(item.artist_name || item.artistName || item.ชื่อศิลปิน);
      const desc = cleanDash(item.description || item.concept || item.แนวคิด);
      const img = item.image_url || item.imageUrl || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&q=80';
      const avatar = item.artist_avatar_url || item.artistAvatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80';
      const bio = cleanDash(item.artist_bio || item.bio || item.ประวัติ);
      const nat = cleanDash(item.nationality || item.country || item.สัญชาติ || item.ประเทศ);
      const tech = cleanDash(item.technique || item.medium || item.เทคนิค);
      const dims = cleanDash(item.dimensions || item.size || item.ขนาด);
      const yr = cleanDash(item.year_created || item.year || item.ปี);
      const pr = cleanDash(item.price || item.ราคา);
      const stat = item.status || defaultStatus;

      return insertStmt.bind(
        title, artist, desc,
        img, img,
        avatar, bio,
        nat, tech, dims,
        yr, pr, stat, currentOrder,
        title, artist, bio,
        tech, desc
      );
    });

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
