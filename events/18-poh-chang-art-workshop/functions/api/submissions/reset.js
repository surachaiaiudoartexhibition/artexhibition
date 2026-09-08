// Cloudflare Pages Function: /api/submissions/reset
// POST: Delete all submissions for this event (requires admin key)
export async function onRequestPost(context) {
  const { request, env } = context;

  const adminKey = request.headers.get('x-admin-key');
  const expectedKey = env.ADMIN_KEY || 'admin123';
  if (!adminKey || adminKey !== expectedKey) {
    return new Response(JSON.stringify({ success: false, error: 'Unauthorized: Invalid or missing admin key.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const countRes = await env.DB.prepare('SELECT COUNT(*) as cnt FROM submissions').first();
    const deleted = countRes?.cnt ?? 0;
    await env.DB.prepare('DELETE FROM submissions').run();
    try {
      await env.DB.prepare("DELETE FROM sqlite_sequence WHERE name = 'submissions'").run();
    } catch (_) {}

    // Also notify Master Portal to remove all artworks from this event
    const masterPortalUrl = env.MASTER_PORTAL_URL;
    const secretToken = env.SHARED_SECRET_TOKEN;
    const eventId = env.EVENT_ID;
    let masterSyncResult = { attempted: false };

    if (masterPortalUrl && secretToken && eventId) {
      masterSyncResult.attempted = true;
      try {
        const syncEndpoint = `${masterPortalUrl.replace(/\/+$/, '')}/api/sync`;
        const webhookRes = await fetch(syncEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${secretToken}`
          },
          body: JSON.stringify({
            action: 'delete_event',
            event_id: eventId
          })
        });
        masterSyncResult.status = webhookRes.status;
        masterSyncResult.success = webhookRes.ok;
        masterSyncResult.response = await webhookRes.json().catch(() => null);
      } catch (err) {
        masterSyncResult.error = err.message;
      }
    }

    return new Response(JSON.stringify({ success: true, deleted, masterPortalSync: masterSyncResult, message: 'All submissions deleted successfully.' }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
