// Cloudflare Pages Function: /api/submissions
// GET: List submissions (filtered by status or all for admin)
// POST: Submit new artwork (status: 'pending')

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const statusParam = url.searchParams.get("status");
  const rawLimit = url.searchParams.get("limit");
  const limit = rawLimit ? Math.min(parseInt(rawLimit, 10), 1000) : 500;
  const offset = Math.max(parseInt(url.searchParams.get("offset") || "0", 10), 0);

  const adminKey = request.headers.get("x-admin-key");
  const isAdmin = adminKey && env.ADMIN_KEY && adminKey === env.ADMIN_KEY;

  try {
    const zoneParam = url.searchParams.get("zone");
    let query = "SELECT * FROM submissions";
    const params = [];

    const conditions = [];
    if (!isAdmin) {
      // Public visitors can only view approved submissions
      conditions.push("status = 'approved'");
    } else if (statusParam && ["pending", "approved", "rejected"].includes(statusParam)) {
      conditions.push("status = ?");
      params.push(statusParam);
    }

    if (zoneParam) {
      conditions.push("zone = ?");
      params.push(zoneParam);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    query += " ORDER BY id DESC LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const stmt = env.DB.prepare(query).bind(...params);
    const result = await stmt.all();

    // Admin reads (curator dashboard, right after approving/rejecting something) must
    // never be cached - they need to see their own change immediately. Public reads
    // (every visitor loading the catalog/gallery) are safe to cache briefly: a change
    // an admin makes shows up for the public within this window regardless, and a
    // short shared window is what actually protects D1's daily row-read quota when
    // many visitors hit the same page at once (e.g. an opening-day traffic spike).
    return new Response(JSON.stringify({
      success: true,
      submissions: result.results || [],
      isAdmin
    }), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": isAdmin
          ? "no-store, no-cache, must-revalidate"
          : "public, max-age=30, s-maxage=30"
      }
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

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const {
      title,
      artist_name,
      artist_avatar_url = "",
      artist_bio = "",
      nationality = "Thailand",
      artist_email = "",
      artist_phone = "",
      technique = "",
      dimensions = "",
      year_created = new Date().getFullYear().toString(),
      price = "",
      description = "",
      cloudinary_public_id = "",
      image_url,
      thumbnail_url,
      zone = "Main Gallery",
      display_order = 0
    } = body;

    if (!title || !artist_name || !image_url) {
      return new Response(JSON.stringify({
        success: false,
        error: "Missing required fields: title, artist_name, and image_url are required."
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Default status is 'pending'
    const status = "pending";

    const stmt = env.DB.prepare(`
      INSERT INTO submissions (
        title, artist_name, artist_avatar_url, artist_bio, nationality, 
        artist_email, artist_phone, technique, dimensions, year_created, 
        price, description, cloudinary_public_id, image_url, thumbnail_url, 
        zone, display_order, status, created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(
      title.trim(),
      artist_name.trim(),
      artist_avatar_url.trim(),
      artist_bio.trim(),
      nationality.trim(),
      artist_email.trim(),
      artist_phone.trim(),
      technique.trim(),
      dimensions.trim(),
      year_created.trim(),
      price.trim(),
      description.trim(),
      cloudinary_public_id.trim(),
      image_url.trim(),
      (thumbnail_url || image_url).trim(),
      zone.trim(),
      display_order,
      status
    );

    const result = await stmt.run();
    const insertId = result.meta?.last_row_id;

    return new Response(JSON.stringify({
      success: true,
      submission: {
        id: insertId,
        title,
        artist_name,
        artist_avatar_url,
        artist_bio,
        nationality,
        artist_email,
        artist_phone,
        technique,
        dimensions,
        year_created,
        price,
        description,
        image_url,
        thumbnail_url: thumbnail_url || image_url,
        zone,
        status,
        created_at: new Date().toISOString()
      },
      message: "Artwork submitted successfully! Awaiting curator approval."
    }), {
      status: 201,
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
