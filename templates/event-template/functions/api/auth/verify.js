// Cloudflare Pages Function: /api/auth/verify
// POST: check the curator admin key against the ADMIN_KEY secret (no data returned)
export async function onRequestPost({ request, env }) {
  const adminKey = request.headers.get('x-admin-key');
  const ok = Boolean(env.ADMIN_KEY && adminKey && adminKey === env.ADMIN_KEY);
  return new Response(JSON.stringify({ success: ok }), {
    status: ok ? 200 : 401,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
  });
}
