// Cloudflare Pages Function: /api/submissions/:id/delete
// POST or DELETE: Delete artwork submission from D1 database

export async function onRequest(context) {
  const { request, params, env } = context;
  const id = params.id;

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
    // 1. Check if submission exists
    const fetchStmt = env.DB.prepare(
      "SELECT id, title, artist_name, status FROM submissions WHERE id = ?"
    ).bind(id);
    const submission = await fetchStmt.first();

    if (!submission) {
      return new Response(JSON.stringify({
        success: false,
        error: `Submission with ID ${id} not found.`
      }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 2. Delete from D1 Database
    const deleteStmt = env.DB.prepare(
      "DELETE FROM submissions WHERE id = ?"
    ).bind(id);
    await deleteStmt.run();

    return new Response(JSON.stringify({
      success: true,
      message: `Artwork #${id} (${submission.title}) deleted successfully.`,
      deletedId: Number(id)
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
