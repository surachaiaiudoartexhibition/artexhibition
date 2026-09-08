// Cloudflare Pages Function: /api/submissions/:id/reject
// POST: Reject submission, and if it was previously approved (and thus
// synced to the Master Portal), notify Master to remove it too so a
// rejected artwork never keeps showing up on the master gallery.

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
    // 1. Check prior status so we know whether Master needs to be notified
    const existing = await env.DB.prepare(
      "SELECT status FROM submissions WHERE id = ?"
    ).bind(id).first();

    const wasApproved = existing && existing.status === "approved";

    const updateStmt = env.DB.prepare(
      "UPDATE submissions SET status = 'rejected' WHERE id = ?"
    ).bind(id);
    await updateStmt.run();

    // 2. If it was previously approved, remove it from the Master Portal
    let masterSyncResult = { attempted: false, success: false };
    if (wasApproved) {
      const masterPortalUrl = env.MASTER_PORTAL_URL;
      const secretToken = env.SHARED_SECRET_TOKEN;
      const eventId = env.EVENT_ID || "event";
      const globalId = `${eventId}-${String(id).padStart(4, "0")}`;

      if (masterPortalUrl && secretToken) {
        masterSyncResult.attempted = true;
        try {
          const syncEndpoint = `${masterPortalUrl.replace(/\/+$/, "")}/api/sync`;
          const webhookRes = await fetch(syncEndpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${secretToken}`
            },
            body: JSON.stringify({
              action: "delete",
              event_id: eventId,
              global_id: globalId
            })
          });
          masterSyncResult.status = webhookRes.status;
          masterSyncResult.success = webhookRes.ok;
          masterSyncResult.response = await webhookRes.json().catch(() => null);
        } catch (webhookErr) {
          masterSyncResult.error = webhookErr.message;
        }
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: `Submission ${id} rejected.`,
      masterPortalSync: masterSyncResult
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
