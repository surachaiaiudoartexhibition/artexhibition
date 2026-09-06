// Cloudflare Pages Function: /api/submissions/:id/approve
// POST: Curate & Approve artwork, update D1, and push Webhook to Master Portal

export async function onRequestPost(context) {
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
    // 1. Fetch submission from Local D1
    const fetchStmt = env.DB.prepare(
      "SELECT id, title, artist_name, description, cloudinary_public_id, image_url, thumbnail_url, status FROM submissions WHERE id = ?"
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

    // 2. Update status in Local D1 to 'approved'
    const updateStmt = env.DB.prepare(
      "UPDATE submissions SET status = 'approved' WHERE id = ?"
    ).bind(id);
    await updateStmt.run();

    // 3. Prepare Master Portal Webhook Payload
    const eventId = env.EVENT_ID || "printmaking-2026";
    const globalId = `${eventId}-${String(submission.id).padStart(4, "0")}`;

    // Base URL for event page
    const requestUrl = new URL(request.url);
    const baseUrl = env.EVENT_PAGE_BASE_URL || requestUrl.origin;
    const eventPageUrl = `${baseUrl}/artwork.html?id=${submission.id}`;

    const webhookPayload = {
      event_id: eventId,
      global_id: globalId,
      title: submission.title,
      artist: submission.artist_name,
      image_url: submission.image_url,
      thumbnail_url: submission.thumbnail_url || submission.image_url,
      event_page_url: eventPageUrl
    };

    let syncResult = {
      attempted: false,
      success: false,
      status: null,
      response: null
    };

    // 4. Dispatch Webhook to Master Portal if configured
    const masterPortalUrl = env.MASTER_PORTAL_URL;
    const secretToken = env.SHARED_SECRET_TOKEN;

    if (masterPortalUrl && secretToken) {
      syncResult.attempted = true;
      const syncEndpoint = `${masterPortalUrl.replace(/\/+$/, "")}/api/sync`;

      try {
        const webhookResponse = await fetch(syncEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${secretToken}`
          },
          body: JSON.stringify(webhookPayload)
        });

        syncResult.status = webhookResponse.status;
        const responseData = await webhookResponse.json().catch(() => null);
        syncResult.response = responseData;
        syncResult.success = webhookResponse.ok;
      } catch (webhookError) {
        syncResult.success = false;
        syncResult.error = webhookError.message;
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: "Submission approved successfully.",
      submission: {
        ...submission,
        status: "approved"
      },
      webhook: {
        payload: webhookPayload,
        syncResult
      }
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
