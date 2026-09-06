// Cloudflare Pages Function: /api/artists/delete
// POST: Delete artist, all associated submissions from D1 database, and all images from Cloudinary storage immediately

/**
 * Extracts public_id from a Cloudinary image URL
 */
function extractCloudinaryPublicId(url) {
  if (!url || typeof url !== 'string' || !url.includes('res.cloudinary.com')) return null;
  const uploadIndex = url.indexOf('/upload/');
  if (uploadIndex === -1) return null;
  const pathAfterUpload = url.substring(uploadIndex + 8);
  const parts = pathAfterUpload.split('/');
  
  // Find index of version 'v123456' if present
  const vIndex = parts.findIndex(p => /^v\d+$/.test(p));
  let publicParts;
  if (vIndex !== -1) {
    publicParts = parts.slice(vIndex + 1);
  } else {
    // If no version string, skip transformations
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
    const body = await request.json().catch(() => ({}));
    const artistName = (body.artist_name || body.name || "").trim();

    if (!artistName) {
      return new Response(JSON.stringify({
        success: false,
        error: "artist_name is required"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 1. Find all submissions associated with this artist
    const checkStmt = env.DB.prepare(`
      SELECT id, title, image_url, thumbnail_url, artist_avatar_url, cloudinary_public_id 
      FROM submissions 
      WHERE artist_name = ? 
         OR artist_name_th = ? 
         OR artist_name_en = ?
    `).bind(artistName, artistName, artistName);
    
    const results = await checkStmt.all();
    const rows = results.results || [];

    if (rows.length === 0) {
      return new Response(JSON.stringify({
        success: false,
        error: `No artworks found for artist: ${artistName}`
      }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 2. Collect all Cloudinary public IDs to delete
    const cloudName = env.CLOUDINARY_CLOUD_NAME || 'gpea1udi';
    const apiKey = env.CLOUDINARY_API_KEY;
    const apiSecret = env.CLOUDINARY_API_SECRET;

    const publicIdsToDelete = new Set();
    for (const sub of rows) {
      if (sub.cloudinary_public_id) publicIdsToDelete.add(sub.cloudinary_public_id.trim());
      const artPid = extractCloudinaryPublicId(sub.image_url);
      if (artPid) publicIdsToDelete.add(artPid);
      const thumbPid = extractCloudinaryPublicId(sub.thumbnail_url);
      if (thumbPid) publicIdsToDelete.add(thumbPid);
      const avPid = extractCloudinaryPublicId(sub.artist_avatar_url);
      if (avPid) publicIdsToDelete.add(avPid);
    }

    // 3. Delete from Cloudinary immediately
    const cloudinaryResults = [];
    if (publicIdsToDelete.size > 0 && apiKey && apiSecret) {
      for (const pid of publicIdsToDelete) {
        const res = await destroyOnCloudinary(pid, cloudName, apiKey, apiSecret);
        cloudinaryResults.push(res);
      }
    } else if (publicIdsToDelete.size > 0) {
      console.log(`[Cloudinary] Deletion note: Found ${publicIdsToDelete.size} Cloudinary images for artist ${artistName}, but CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET are not set in environment.`);
    }

    // 4. Delete all submissions for this artist from D1 Database
    const deleteStmt = env.DB.prepare(`
      DELETE FROM submissions 
      WHERE artist_name = ? 
         OR artist_name_th = ? 
         OR artist_name_en = ?
    `).bind(artistName, artistName, artistName);
    
    await deleteStmt.run();

    return new Response(JSON.stringify({
      success: true,
      message: `Artist "${artistName}" and ${rows.length} artworks deleted successfully.`,
      deletedArtist: artistName,
      deletedCount: rows.length,
      deletedIds: rows.map(r => r.id),
      cloudinaryDeleted: Array.from(publicIdsToDelete),
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
