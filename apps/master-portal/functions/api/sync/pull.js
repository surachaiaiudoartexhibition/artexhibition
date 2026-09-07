// Cloudflare Pages Function: /api/sync/pull
// POST: Pull approved artworks from registered event webapps and upsert into master database

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
    let targetEventId = null;
    try {
      const body = await request.json();
      targetEventId = body.event_id || null;
    } catch {
      // Empty body is allowed, will pull all active events
    }

    let eventsQuery = "SELECT event_id, event_title, portal_url, secret_token, status FROM registered_events WHERE status = 'active'";
    const params = [];
    if (targetEventId) {
      eventsQuery += " AND event_id = ?";
      params.push(targetEventId);
    }

    const eventsStmt = env.DB.prepare(eventsQuery).bind(...params);
    const eventsResult = await eventsStmt.all();
    const events = eventsResult.results || [];

    if (events.length === 0) {
      return new Response(JSON.stringify({
        success: false,
        message: targetEventId ? `No active event found with id '${targetEventId}'` : "No active events registered in system."
      }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }

    const results = [];
    let totalSynced = 0;

    for (const ev of events) {
      const eventReport = {
        event_id: ev.event_id,
        event_title: ev.event_title,
        portal_url: ev.portal_url,
        synced_count: 0,
        status: "success",
        error: null
      };

      try {
        const fetchUrl = `${ev.portal_url.replace(/\/+$/, "")}/api/submissions?status=approved&limit=500&_t=${Date.now()}`;
        const res = await fetch(fetchUrl, {
          headers: {
            "Accept": "application/json",
            "User-Agent": "Master-Portal-Ingestion-Bot/1.0"
          }
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status} from event API: ${fetchUrl}`);
        }

        const data = await res.json();
        const submissions = data.submissions || [];

        for (const sub of submissions) {
          const globalId = `${ev.event_id}-${String(sub.id).padStart(4, "0")}`;
          const eventPageUrl = `${ev.portal_url.replace(/\/+$/, "")}/artwork.html?id=${sub.id}`;

          const upsertStmt = env.DB.prepare(`
            INSERT INTO master_artworks (
              global_id, event_id, title, artist_name, image_url, thumbnail_url,
              event_page_url, description, technique, dimensions, year_created,
              zone, artist_avatar_url, nationality, published_at
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
            globalId,
            ev.event_id,
            (sub.title || "").trim(),
            (sub.artist_name || "").trim(),
            sub.image_url,
            sub.thumbnail_url || sub.image_url,
            eventPageUrl,
            sub.description || "",
            sub.technique || "",
            sub.dimensions || "",
            sub.year_created || "",
            sub.zone || "Main Gallery",
            sub.artist_avatar_url || "",
            sub.nationality || "Thailand"
          );

          await upsertStmt.run();
          eventReport.synced_count++;
          totalSynced++;
        }
      } catch (eventErr) {
        eventReport.status = "error";
        eventReport.error = eventErr.message;
      }

      results.push(eventReport);
    }

    return new Response(JSON.stringify({
      success: true,
      message: `Successfully pulled and synchronized ${totalSynced} artwork(s) across ${events.length} event(s).`,
      total_synced: totalSynced,
      events: results
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
