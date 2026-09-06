// Cloudflare Pages Function: /api/submissions/:id/reject
// POST: Reject submission

export async function onRequestPost(context) {
  const { request, params, env } = context;
  const id = params.id;

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
    const updateStmt = env.DB.prepare(
      "UPDATE submissions SET status = 'rejected' WHERE id = ?"
    ).bind(id);
    await updateStmt.run();

    return new Response(JSON.stringify({
      success: true,
      message: `Submission ${id} rejected.`
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
