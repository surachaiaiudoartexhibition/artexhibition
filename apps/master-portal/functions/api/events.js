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

export async function onRequestPut(context) {
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
    const { event_id, event_title, portal_url, secret_token, status, catalog_url } = body;

    if (!event_id) {
      return new Response(JSON.stringify({
        success: false,
        error: "Missing required field: event_id."
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const existing = await env.DB.prepare("SELECT * FROM registered_events WHERE event_id = ?").bind(event_id.trim()).first();
    if (!existing) {
      return new Response(JSON.stringify({
        success: false,
        error: `Event '${event_id}' not found.`
      }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }

    const updatedTitle = event_title !== undefined && event_title !== null ? event_title.trim() : existing.event_title;
    const updatedUrl = portal_url !== undefined && portal_url !== null ? portal_url.trim() : existing.portal_url;
    const updatedToken = secret_token && secret_token.trim() ? secret_token.trim() : existing.secret_token;
    const updatedStatus = status !== undefined && status !== null ? status.trim() : existing.status;
    const updatedCatalog = catalog_url !== undefined ? (catalog_url ? catalog_url.trim() : null) : existing.catalog_url;

    const stmt = env.DB.prepare(`
      UPDATE registered_events
      SET event_title = ?, portal_url = ?, secret_token = ?, status = ?, catalog_url = ?
      WHERE event_id = ?
    `).bind(updatedTitle, updatedUrl, updatedToken, updatedStatus, updatedCatalog, event_id.trim());

    await stmt.run();

    return new Response(JSON.stringify({
      success: true,
      message: `Event '${event_id}' updated successfully.`,
      event: {
        event_id: event_id.trim(),
        event_title: updatedTitle,
        portal_url: updatedUrl,
        status: updatedStatus,
        catalog_url: updatedCatalog
      }
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

export async function onRequestDelete(context) {
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
    const url = new URL(request.url);
    let event_id = url.searchParams.get("event_id");

    if (!event_id) {
      try {
        const body = await request.json();
        event_id = body.event_id;
      } catch (_) {}
    }

    if (!event_id) {
      return new Response(JSON.stringify({
        success: false,
        error: "Missing required query parameter or body: event_id."
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Delete related artworks first to maintain integrity
    await env.DB.prepare("DELETE FROM master_artworks WHERE event_id = ?").bind(event_id.trim()).run();
    // Delete the event
    await env.DB.prepare("DELETE FROM registered_events WHERE event_id = ?").bind(event_id.trim()).run();

    return new Response(JSON.stringify({
      success: true,
      message: `Event '${event_id}' and related artworks deleted successfully.`
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
