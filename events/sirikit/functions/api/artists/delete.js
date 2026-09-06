// Cloudflare Pages Function: /api/artists/delete
// POST: Delete artist and all associated submissions from D1 database

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
      SELECT id, title FROM submissions 
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

    // 2. Delete all submissions for this artist
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
      deletedIds: rows.map(r => r.id)
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
