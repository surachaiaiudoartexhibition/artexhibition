// Cloudflare Pages Function: /api/artworks
// GET: Global Exhibition Showcase query with cross-event filters, search, and pagination

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  const eventId = url.searchParams.get("event_id");
  const queryTerm = url.searchParams.get("q");
  const rawLimit = url.searchParams.get("limit");
  const limit = rawLimit ? Math.min(parseInt(rawLimit, 10), 500) : 200;
  const offset = Math.max(parseInt(url.searchParams.get("offset") || "0", 10), 0);

  try {
    let sql = `
      SELECT 
        m.global_id,
        m.event_id,
        m.title,
        m.artist_name,
        m.image_url,
        m.thumbnail_url,
        m.event_page_url,
        m.description,
        m.technique,
        m.dimensions,
        m.year_created,
        m.zone,
        m.artist_avatar_url,
        m.nationality,
        m.published_at,
        COALESCE(e.event_title, m.event_id) as event_title,
        e.portal_url as event_portal_url
      FROM master_artworks m
      LEFT JOIN registered_events e ON m.event_id = e.event_id
      WHERE 1=1
    `;
    const params = [];

    if (eventId) {
      sql += " AND m.event_id = ?";
      params.push(eventId);
    }

    if (queryTerm) {
      sql += " AND (m.title LIKE ? OR m.artist_name LIKE ?)";
      const pattern = `%${queryTerm}%`;
      params.push(pattern, pattern);
    }

    sql += " ORDER BY m.published_at DESC LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const stmt = env.DB.prepare(sql).bind(...params);
    const result = await stmt.all();

    // Total count for pagination
    let countSql = "SELECT COUNT(*) as total FROM master_artworks WHERE 1=1";
    const countParams = [];
    if (eventId) {
      countSql += " AND event_id = ?";
      countParams.push(eventId);
    }
    if (queryTerm) {
      countSql += " AND (title LIKE ? OR artist_name LIKE ?)";
      const pattern = `%${queryTerm}%`;
      countParams.push(pattern, pattern);
    }
    const countStmt = env.DB.prepare(countSql).bind(...countParams);
    const countRes = await countStmt.first();

    return new Response(JSON.stringify({
      success: true,
      total: countRes ? countRes.total : (result.results || []).length,
      limit,
      offset,
      artworks: result.results || []
    }), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=15"
      }
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
