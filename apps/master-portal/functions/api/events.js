// Cloudflare Pages Function: /api/events
// GET: List all active registered exhibition events
// POST: Register or update an event (Admin authenticated)

export async function onRequestGet(context) {
  const { env } = context;

  try {
    const stmt = env.DB.prepare(`
      SELECT 
        e.event_id,
        e.event_title,
        e.portal_url,
        e.status,
        e.catalog_url,
        e.created_at,
        COUNT(m.global_id) as artwork_count
      FROM registered_events e
      LEFT JOIN master_artworks m ON e.event_id = m.event_id
      GROUP BY e.event_id
      ORDER BY e.created_at DESC
    `);
    const result = await stmt.all();

    const events = (result.results || []).map(ev => ({
      ...ev,
      catalog_url: ev.catalog_url || (ev.portal_url ? `${ev.portal_url.replace(/\/+$/, '')}/catalog.html` : null)
    }));

    return new Response(JSON.stringify({
      success: true,
      events
    }), {
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

export async function onRequestPost(context) {
  const { request, env } = context;

  const adminKey = request.headers.get("x-admin-key");
  if (env.MASTER_ADMIN_KEY && adminKey !== env.MASTER_ADMIN_KEY) {
    return new Response(JSON.stringify({
      success: false,
      error: "Unauthorized: Invalid Master Admin Key."
    }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const body = await request.json();
    const { event_id, event_title, portal_url, secret_token, status = "active", catalog_url = null } = body;

    if (!event_id || !event_title || !portal_url || !secret_token) {
      return new Response(JSON.stringify({
        success: false,
        error: "Missing required fields: event_id, event_title, portal_url, and secret_token."
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const stmt = env.DB.prepare(`
      INSERT INTO registered_events (event_id, event_title, portal_url, secret_token, status, catalog_url, created_at)
      VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(event_id) DO UPDATE SET
        event_title = excluded.event_title,
        portal_url = excluded.portal_url,
        secret_token = excluded.secret_token,
        status = excluded.status,
        catalog_url = excluded.catalog_url;
    `).bind(
      event_id.trim(),
      event_title.trim(),
      portal_url.trim(),
      secret_token.trim(),
      status,
      catalog_url ? catalog_url.trim() : null
    );

    await stmt.run();

    return new Response(JSON.stringify({
      success: true,
      message: `Event '${event_id}' registered successfully.`,
      event: { event_id, event_title, portal_url, status }
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
