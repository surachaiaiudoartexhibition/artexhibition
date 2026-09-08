// Cloudflare Pages Function: POST /api/submissions/sync-all
// Full re-sync of all approved submissions to Master Portal:
//   1. delete_event  → wipe master_artworks for this event
//   2. upsert each   → re-push every approved submission

export async function onRequestPost(context) {
  const { request, env } = context;

  const adminKey = request.headers.get('x-admin-key');
  const expectedKey = env.ADMIN_KEY || 'admin123';
  if (!adminKey || adminKey !== expectedKey) {
    return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
      status: 401, headers: { 'Content-Type': 'application/json' }
    });
  }

  const masterPortalUrl = env.MASTER_PORTAL_URL;
  const secretToken = env.SHARED_SECRET_TOKEN;
  const eventId = env.EVENT_ID;
  const baseUrl = env.EVENT_PAGE_BASE_URL || 'https://18pohchangartworkshop.pages.dev';

  if (!masterPortalUrl || !secretToken || !eventId) {
    return new Response(JSON.stringify({ success: false, error: 'MASTER_PORTAL_URL / SHARED_SECRET_TOKEN / EVENT_ID not configured' }), {
      status: 500, headers: { 'Content-Type': 'application/json' }
    });
  }

  const syncEndpoint = `${masterPortalUrl.replace(/\/+$/, '')}/api/sync`;

  async function callSync(payload) {
    const res = await fetch(syncEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${secretToken}`
      },
      body: JSON.stringify(payload)
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data };
  }

  try {
    // Step 1: delete_event — wipe all for this event in master portal
    const deleteResult = await callSync({ action: 'delete_event', event_id: eventId });

    // Step 2: fetch all approved submissions from this event's D1
    const result = await env.DB.prepare(
      "SELECT * FROM submissions WHERE status = 'approved' ORDER BY display_order ASC, id ASC"
    ).all();
    const submissions = result.results || [];

    // Step 3: upsert each one to master portal
    let pushed = 0;
    let failed = 0;
    const errors = [];

    for (const sub of submissions) {
      // Skip if no image (can't show in master portal)
      if (!sub.image_url || sub.image_url.trim() === '') {
        failed++;
        continue;
      }

      const globalId = `${eventId}-${String(sub.id).padStart(4, '0')}`;
      const eventPageUrl = `${baseUrl}/artwork.html?id=${sub.id}`;

      const upsertResult = await callSync({
        action: 'upsert',
        event_id: eventId,
        global_id: globalId,
        title: sub.title || '-',
        artist: sub.artist_name || '-',
        image_url: sub.image_url,
        thumbnail_url: sub.thumbnail_url || sub.image_url,
        event_page_url: eventPageUrl,
        description: sub.description || '',
        technique: sub.technique || '',
        dimensions: sub.dimensions || '',
        year_created: sub.year_created || '',
        zone: sub.zone || '',
        artist_avatar_url: sub.artist_avatar_url || '',
        nationality: sub.nationality || ''
      });

      if (upsertResult.ok) {
        pushed++;
      } else {
        failed++;
        errors.push({ id: sub.id, title: sub.title, error: upsertResult.data?.error });
      }
    }

    return new Response(JSON.stringify({
      success: true,
      event_id: eventId,
      step1_delete_event: deleteResult,
      step2_total_approved: submissions.length,
      step3_pushed: pushed,
      step3_failed: failed,
      errors: errors.length > 0 ? errors : undefined
    }), {
      status: 200, headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500, headers: { 'Content-Type': 'application/json' }
    });
  }
}
