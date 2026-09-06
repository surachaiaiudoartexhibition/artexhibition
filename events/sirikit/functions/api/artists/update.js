// Cloudflare Pages Function: /api/artists/update
// POST: Update artist details (name, academic title, bio, avatar, contact) across all submissions,
// clean up replaced avatar from Cloudinary, and update D1.

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
  const { request, env } = context;

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
    const oldArtistName = (body.old_artist_name || body.artist_name || '').trim();

    if (!oldArtistName) {
      return new Response(JSON.stringify({
        success: false,
        error: "Missing required parameter: old_artist_name"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 1. Fetch current artist artworks to check old avatars
    const currentRows = await env.DB.prepare(
      "SELECT id, artist_name, artist_name_th, artist_name_en, artist_avatar_url FROM submissions WHERE artist_name = ? OR artist_name_th = ? OR artist_name_en = ?"
    ).bind(oldArtistName, oldArtistName, oldArtistName).all();

    if (!currentRows.results || currentRows.results.length === 0) {
      return new Response(JSON.stringify({
        success: false,
        error: `No artist found matching "${oldArtistName}".`
      }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }

    const cloudName = env.CLOUDINARY_CLOUD_NAME || 'gpea1udi';
    const apiKey = env.CLOUDINARY_API_KEY;
    const apiSecret = env.CLOUDINARY_API_SECRET;
    const oldPublicIdsToDelete = new Set();

    // Check if avatar has changed
    const newAvatar = body.artist_avatar_url;
    if (newAvatar !== undefined) {
      for (const row of currentRows.results) {
        if (row.artist_avatar_url && row.artist_avatar_url !== newAvatar) {
          const oldAvatarId = extractCloudinaryPublicId(row.artist_avatar_url);
          if (oldAvatarId) oldPublicIdsToDelete.add(oldAvatarId);
        }
      }
    }

    // Destroy old avatar from Cloudinary if changed
    const cloudinaryResults = [];
    if (oldPublicIdsToDelete.size > 0 && apiKey && apiSecret) {
      for (const pid of oldPublicIdsToDelete) {
        const res = await destroyOnCloudinary(pid, cloudName, apiKey, apiSecret);
        cloudinaryResults.push(res);
      }
    }

    // Build update clauses
    const allowed = [
      'artist_name', 'artist_name_th', 'artist_name_en',
      'academic_title', 'academic_title_th', 'academic_title_en',
      'artist_avatar_url', 'artist_bio', 'artist_bio_th', 'artist_bio_en',
      'nationality', 'artist_email', 'artist_phone'
    ];

    const setClauses = [];
    const updateParams = [];

    for (const key of allowed) {
      if (body[key] !== undefined) {
        setClauses.push(`${key} = ?`);
        updateParams.push(body[key]);
      }
    }

    // Ensure fallback for artist_name
    if (body.artist_name_th && body.artist_name === undefined) {
      setClauses.push("artist_name = ?");
      updateParams.push(body.artist_name_th);
    }

    if (setClauses.length > 0) {
      updateParams.push(oldArtistName, oldArtistName, oldArtistName);
      await env.DB.prepare(`
        UPDATE submissions SET ${setClauses.join(', ')} 
        WHERE artist_name = ? OR artist_name_th = ? OR artist_name_en = ?
      `).bind(...updateParams).run();
    }

    return new Response(JSON.stringify({
      success: true,
      affectedRows: currentRows.results.length,
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
