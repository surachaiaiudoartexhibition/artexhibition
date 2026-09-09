// Cloudflare Pages Function: POST /api/submissions/sync-all
// Full re-sync of all approved submissions to Master Portal, ONE BATCH per call:
//   - offset=0 (default): first wipes master_artworks for this event, then upserts
//     up to `limit` submissions
//   - offset>0: upserts the next `limit` submissions (no delete - already done)
// A single Cloudflare Worker/Pages Function invocation has a hard cap on how many
// subrequests (fetch calls) it can make - the old version looped every approved
// submission inside one invocation and failed once an event passed ~150 artworks
// (see AGENT_HANDOFF.md). Splitting into small batches, each its own invocation
// driven by the caller looping over offsets, keeps every single call safely under
// that limit no matter how large an event's approved list grows.
const MAX_BATCH_SIZE = 30;

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

  const url = new URL(request.url);
  const offset = Math.max(0, parseInt(url.searchParams.get('offset') || '0', 10) || 0);
  const requestedLimit = parseInt(url.searchParams.get('limit') || '', 10);
  const limit = Math.min(MAX_BATCH_SIZE, (requestedLimit > 0 ? requestedLimit : MAX_BATCH_SIZE));

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
    let deleteResult = null;
    if (offset === 0) {
      // Only wipe once, on the very first batch of a fresh sync run.
      deleteResult = await callSync({ action: 'delete_event', event_id: eventId });
    }

    // Fetch the full approved list once to know total count and slice this batch -
    // the D1 read itself doesn't count against the subrequest cap, only fetch() does.
    const result = await env.DB.prepare(
      "SELECT * FROM submissions WHERE status = 'approved' ORDER BY display_order ASC, id ASC"
    ).all();
    const allSubmissions = result.results || [];
    const totalApproved = allSubmissions.length;
    const batch = allSubmissions.slice(offset, offset + limit);

    let pushed = 0;
    let failed = 0;
    const errors = [];

    for (const sub of batch) {
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

    const nextOffset = offset + batch.length;
    const hasMore = nextOffset < totalApproved;

    return new Response(JSON.stringify({
      success: true,
      event_id: eventId,
      step1_delete_event: deleteResult,
      total_approved: totalApproved,
      batch_offset: offset,
      batch_size: batch.length,
      batch_pushed: pushed,
      batch_failed: failed,
      next_offset: hasMore ? nextOffset : null,
      has_more: hasMore,
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
