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

  return new Response(JSON.stringify(publicConfig), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, no-cache, must-revalidate"
    }
  });
}
