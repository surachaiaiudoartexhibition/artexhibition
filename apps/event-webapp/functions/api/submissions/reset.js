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
    await env.DB.prepare('DELETE FROM submissions').run();
    try {
      await env.DB.prepare("DELETE FROM sqlite_sequence WHERE name = 'submissions'").run();
    } catch (_) {}

    return new Response(JSON.stringify({ success: true, message: 'All submissions deleted successfully.' }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
