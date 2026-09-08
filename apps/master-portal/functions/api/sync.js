// Cloudflare Pages Function: /api/sync
// POST: Webhook Ingestion API for Event Artworks (Authenticated via Bearer Token)

export async function onRequestPost(context) {
  const { request, env } = context;

  // 1. Validate Authorization Header (Bearer Token)
  const authHeader = request.headers.get("Authorization") || "";
  const tokenMatch = authHeader.match(/^Bearer\s+(.+)$/i);
  const bearerToken = tokenMatch ? tokenMatch[1].trim() : null;

  if (!bearerToken) {
    return new Response(JSON.stringify({
      success: false,
      error: "Unauthorized: Missing or malformed Authorization Bearer header."
    }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const payload = await request.json();
    const { action = 'upsert', event_id, global_id } = payload;

    // ============================================================
    // ACTION: DELETE — remove artwork from master_artworks
    // ============================================================
    if (action === 'delete') {
      if (!event_id || !global_id) {
        return new Response(JSON.stringify({
          success: false,
          error: "Bad Request: Missing event_id or global_id for delete action."
        }), { status: 400, headers: { "Content-Type": "application/json" } });
      }

      // Validate token
      const eventStmt = env.DB.prepare(
        "SELECT secret_token FROM registered_events WHERE event_id = ?"
      ).bind(event_id);
      const registeredEvent = await eventStmt.first();

      const isAuthorized =
        (registeredEvent && registeredEvent.secret_token === bearerToken) ||
        (env.GLOBAL_SYNC_SECRET && bearerToken === env.GLOBAL_SYNC_SECRET);

      if (!isAuthorized) {
        return new Response(JSON.stringify({
          success: false,
          error: "Forbidden: Invalid secret token for the specified event_id."
        }), { status: 403, headers: { "Content-Type": "application/json" } });
      }

      await env.DB.prepare(
        "DELETE FROM master_artworks WHERE global_id = ? AND event_id = ?"
      ).bind(global_id, event_id).run();

      return new Response(JSON.stringify({
        success: true,
        message: `Artwork ${global_id} removed from Master Portal.`,
        action: 'delete',
        global_id,
        event_id
      }), { status: 200, headers: { "Content-Type": "application/json" } });
    }

    // ============================================================
    // ACTION: DELETE_EVENT — remove ALL artworks for an event
    // ============================================================
    if (action === 'delete_event') {
      if (!event_id) {
        return new Response(JSON.stringify({
          success: false,
          error: "Bad Request: Missing event_id for delete_event action."
        }), { status: 400, headers: { "Content-Type": "application/json" } });
      }

      const eventStmt2 = env.DB.prepare(
        "SELECT secret_token FROM registered_events WHERE event_id = ?"
      ).bind(event_id);
      const regEvent2 = await eventStmt2.first();

      const isAuth2 =
        (regEvent2 && regEvent2.secret_token === bearerToken) ||
        (env.GLOBAL_SYNC_SECRET && bearerToken === env.GLOBAL_SYNC_SECRET);

      if (!isAuth2) {
        return new Response(JSON.stringify({
          success: false,
          error: "Forbidden: Invalid secret token."
        }), { status: 403, headers: { "Content-Type": "application/json" } });
      }

      const countRes = await env.DB.prepare(
        "SELECT COUNT(*) as cnt FROM master_artworks WHERE event_id = ?"
      ).bind(event_id).first();
      const deletedCount = countRes?.cnt ?? 0;

      await env.DB.prepare(
        "DELETE FROM master_artworks WHERE event_id = ?"
      ).bind(event_id).run();

      return new Response(JSON.stringify({
        success: true,
        message: `All ${deletedCount} artworks for event '${event_id}' removed from Master Portal.`,
        action: 'delete_event',
        event_id,
        deleted: deletedCount
      }), { status: 200, headers: { "Content-Type": "application/json" } });
    }

    // ============================================================
    // ACTION: UPSERT (default) — add/update artwork in master_artworks
    // ============================================================
    const {
      title,
      artist,
      image_url,
      thumbnail_url,
      event_page_url,
      description = '',
      technique = '',
      dimensions = '',
      year_created = '',
      zone = '',
      artist_avatar_url = '',
      nationality = ''
    } = payload;

    // Validate payload fields
    if (!event_id || !global_id || !title || !artist || !image_url || !event_page_url) {
      return new Response(JSON.stringify({
        success: false,
        error: "Bad Request: Missing required fields (event_id, global_id, title, artist, image_url, event_page_url)."
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 2. Validate token against registered_events database or global fallback
    const eventStmt = env.DB.prepare(
      "SELECT event_id, secret_token, status FROM registered_events WHERE event_id = ?"
    ).bind(event_id);
    const registeredEvent = await eventStmt.first();

    let isAuthorized = false;

    if (registeredEvent) {
      if (registeredEvent.secret_token === bearerToken) {
        isAuthorized = true;
      }
    } else if (env.GLOBAL_SYNC_SECRET && bearerToken === env.GLOBAL_SYNC_SECRET) {
      // Auto-register event if global sync secret matches
      isAuthorized = true;
      try {
        await env.DB.prepare(`
          INSERT INTO registered_events (event_id, event_title, portal_url, secret_token, status, created_at)
          VALUES (?, ?, ?, ?, 'active', CURRENT_TIMESTAMP)
        `).bind(
          event_id,
          event_id,
          new URL(event_page_url).origin,
          bearerToken
        ).run();
      } catch (insertErr) {
        console.warn("Event auto-registration warning:", insertErr.message);
      }
    }

    if (!isAuthorized) {
      return new Response(JSON.stringify({
        success: false,
        error: "Forbidden: Invalid secret token for the specified event_id."
      }), {
        status: 403,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 3. UPSERT into master_artworks table
    const upsertStmt = env.DB.prepare(`
      INSERT INTO master_artworks (
        global_id,
        event_id,
        title,
        artist_name,
        image_url,
        thumbnail_url,
        event_page_url,
        description,
        technique,
        dimensions,
        year_created,
        zone,
        artist_avatar_url,
        nationality,
        published_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(global_id) DO UPDATE SET
        title = excluded.title,
        artist_name = excluded.artist_name,
        image_url = excluded.image_url,
        thumbnail_url = excluded.thumbnail_url,
        event_page_url = excluded.event_page_url,
        description = excluded.description,
        technique = excluded.technique,
        dimensions = excluded.dimensions,
        year_created = excluded.year_created,
        zone = excluded.zone,
        artist_avatar_url = excluded.artist_avatar_url,
        nationality = excluded.nationality;
    `).bind(
      global_id.trim(),
      event_id.trim(),
      title.trim(),
      artist.trim(),
      image_url.trim(),
      (thumbnail_url || image_url).trim(),
      event_page_url.trim(),
      description,
      technique,
      dimensions,
      year_created,
      zone,
      artist_avatar_url,
      nationality
    );

    await upsertStmt.run();

    return new Response(JSON.stringify({
      success: true,
      message: `Artwork ${global_id} synchronized and upserted successfully to Master Portal.`,
      artwork: {
        global_id,
        event_id,
        title,
        artist,
        image_url,
        thumbnail_url: thumbnail_url || image_url,
        event_page_url
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
