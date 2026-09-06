// Cloudflare Pages Function: /api/submissions/:id
// GET: Retrieve single artwork by ID

export async function onRequestGet(context) {
  const { params, env } = context;
  const id = params.id;

  try {
    const stmt = env.DB.prepare(
      "SELECT * FROM submissions WHERE id = ?"
    ).bind(id);

    const submission = await stmt.first();

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
