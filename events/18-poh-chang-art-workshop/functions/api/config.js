// Cloudflare Pages Function: /api/config
// Returns public client configurations (Cloudinary cloud name, upload preset, event metadata)
export async function onRequestGet(context) {
  const { env } = context;

  const publicConfig = {
    eventId: env.EVENT_ID || "printmaking-2026",
    eventTitle: env.EVENT_TITLE || "นิทรรศการภาพพิมพ์และศิลปกรรมร่วมสมัย | วิทยาลัยเพาะช่าง",
    eventTheme: env.EVENT_THEME || "heritage",
    cloudinaryCloudName: env.CLOUDINARY_CLOUD_NAME || "",
    cloudinaryUploadPreset: env.CLOUDINARY_UPLOAD_PRESET || "",
    masterPortalUrl: env.MASTER_PORTAL_URL || ""
  };

  // Pure env-var config (no D1 read at all) that every page loads on every visit -
  // a short edge cache here cuts Pages Functions invocations for free, with no
  // staleness risk worth worrying about: these values only change when an admin
  // edits Cloudflare Pages' own environment variables, which is rare and doesn't
  // need to be reflected within seconds.
  return new Response(JSON.stringify(publicConfig), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=60, s-maxage=60"
    }
  });
}
