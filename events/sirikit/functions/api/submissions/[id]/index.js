import { isAdminRequest } from '../../../_shared/sanitize.js';
// Cloudflare Pages Function: /api/submissions/:id
// GET: Retrieve single artwork by ID

export async function onRequestGet(context) {
  const { request, params, env } = context;
  const id = params.id;

  try {
    const stmt = env.DB.prepare(
      "SELECT * FROM submissions WHERE id = ?"
    ).bind(id);

    let submission = await stmt.first();

    const isAdmin = isAdminRequest(request, env);
    if (submission && !isAdmin) {
      if (submission.status !== 'approved') submission = null;
      else delete submission.artist_phone;
    }

    if (!submission) {
      return new Response(JSON.stringify({
        success: false,
        error: "Artwork not found"
      }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      submission
    }), {
      headers: { "Content-Type": "application/json", "Cache-Control": isAdmin ? "no-store" : "public, max-age=30" }
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
