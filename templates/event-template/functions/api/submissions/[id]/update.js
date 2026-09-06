// Cloudflare Pages Function: /api/submissions/:id/update
// POST: Update artwork submission details, replace images, delete replaced images from Cloudinary, and update D1

/**
 * Extracts public_id from a Cloudinary image URL
 */
function extractCloudinaryPublicId(url) {
  if (!url || typeof url !== 'string' || !url.includes('res.cloudinary.com')) return null;
  const uploadIndex = url.indexOf('/upload/');
  if (uploadIndex === -1) return null;
  const pathAfterUpload = url.substring(uploadIndex + 8);
  const parts = pathAfterUpload.split('/');
  
  const vIndex = parts.findIndex(p => /^v\d+$/.test(p));
  let publicParts;
  if (vIndex !== -1) {
    publicParts = parts.slice(vIndex + 1);
  } else {
    let start = 0;
    while (start < parts.length && (
      parts[start].includes(',') || 
      parts[start].startsWith('c_') || 
      parts[start].startsWith('w_') || 
      parts[start].startsWith('h_') || 
      parts[start].startsWith('f_') || 
      parts[start].startsWith('q_')
    )) {
      start++;
    }
    publicParts = parts.slice(start);
  }
  const publicIdWithExt = publicParts.join('/');
  return publicIdWithExt.replace(/\.[^/.]+$/, '');
}

/**
 * Executes signed Cloudinary destroy API call
 */
async function destroyOnCloudinary(publicId, cloudName, apiKey, apiSecret) {
  if (!publicId || !cloudName || !apiKey || !apiSecret) {
    return { skipped: true, reason: 'missing_credentials_or_public_id', publicId };
  }

  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const strToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    
    // Web Crypto API SHA-1
    const msgBuffer = new TextEncoder().encode(strToSign);
    const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    const formData = new FormData();
    formData.append('public_id', publicId);
    formData.append('timestamp', timestamp.toString());
    formData.append('api_key', apiKey);
    formData.append('signature', signature);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    return {
      success: data.result === 'ok' || data.result === 'not found',
      result: data.result,
      publicId
    };
  } catch (err) {
    console.warn(`[Cloudinary Destroy] Failed for ${publicId}:`, err.message);
    return {
      success: false,
      error: err.message,
      publicId
    };
  }
}

export async function onRequestPost(context) {
  const { request, params, env } = context;
  const id = params.id;

  // Verify Admin authorization key if configured
  const adminKey = request.headers.get("x-admin-key");
  if (env.ADMIN_KEY && adminKey !== env.ADMIN_KEY) {
    return new Response(JSON.stringify({
      success: false,
      error: "Unauthorized: Invalid or missing admin key."
    }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const body = await request.json();

    // 1. Fetch current submission
    const current = await env.DB.prepare("SELECT * FROM submissions WHERE id = ?").bind(id).first();
    if (!current) {
      return new Response(JSON.stringify({
        success: false,
        error: `Submission with ID ${id} not found.`
      }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }

    const cloudName = env.CLOUDINARY_CLOUD_NAME || 'gpea1udi';
    const apiKey = env.CLOUDINARY_API_KEY;
    const apiSecret = env.CLOUDINARY_API_SECRET;
    const oldPublicIdsToDelete = new Set();

    // Check if artwork image was replaced
    if (body.image_url && body.image_url !== current.image_url) {
      if (current.cloudinary_public_id) oldPublicIdsToDelete.add(current.cloudinary_public_id);
      const oldArtId = extractCloudinaryPublicId(current.image_url);
      if (oldArtId) oldPublicIdsToDelete.add(oldArtId);
      const oldThumbId = extractCloudinaryPublicId(current.thumbnail_url);
      if (oldThumbId) oldPublicIdsToDelete.add(oldThumbId);
    }

    // Check if artist avatar was replaced
    if (body.artist_avatar_url !== undefined && body.artist_avatar_url !== current.artist_avatar_url) {
      const oldAvatarId = extractCloudinaryPublicId(current.artist_avatar_url);
      if (oldAvatarId) oldPublicIdsToDelete.add(oldAvatarId);
    }

    // Destroy old images from Cloudinary if credentials are present
    const cloudinaryResults = [];
    if (oldPublicIdsToDelete.size > 0 && apiKey && apiSecret) {
      for (const pid of oldPublicIdsToDelete) {
        const res = await destroyOnCloudinary(pid, cloudName, apiKey, apiSecret);
        cloudinaryResults.push(res);
      }
    }

    // Allowed updatable columns
    const allowedFields = [
      'title', 'title_th', 'title_en',
      'artist_name', 'artist_name_th', 'artist_name_en',
      'academic_title', 'academic_title_th', 'academic_title_en',
      'artist_avatar_url', 'artist_bio', 'artist_bio_th', 'artist_bio_en',
      'nationality', 'artist_email', 'artist_phone',
      'technique', 'technique_th', 'technique_en',
      'dimensions', 'year_created', 'price',
      'description', 'description_th', 'description_en',
      'cloudinary_public_id', 'image_url', 'thumbnail_url',
      'zone', 'display_order', 'status'
    ];

    const setClauses = [];
    const updateParams = [];

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        setClauses.push(`${field} = ?`);
        updateParams.push(body[field]);
      }
    }

    // If title/title_th/artist_name was updated, ensure fallback
    if (body.title_th && body.title === undefined) {
      setClauses.push("title = ?");
      updateParams.push(body.title_th);
    }
    if (body.artist_name_th && body.artist_name === undefined) {
      setClauses.push("artist_name = ?");
      updateParams.push(body.artist_name_th);
    }
    if (body.image_url && body.thumbnail_url === undefined) {
      setClauses.push("thumbnail_url = ?");
      updateParams.push(body.image_url);
    }

    if (setClauses.length > 0) {
      updateParams.push(id);
      await env.DB.prepare(`UPDATE submissions SET ${setClauses.join(', ')} WHERE id = ?`).bind(...updateParams).run();
    }

    const updated = await env.DB.prepare("SELECT * FROM submissions WHERE id = ?").bind(id).first();

    return new Response(JSON.stringify({
      success: true,
      submission: updated,
      cloudinaryDeleted: Array.from(oldPublicIdsToDelete),
      cloudinaryResults
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({
      success: false,
      error: err.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
