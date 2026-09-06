export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const adminKey = request.headers.get('x-admin-key') || body.adminKey;
    const expectedKey = env.ADMIN_KEY || 'admin123';

    if (adminKey !== expectedKey) {
      return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const row = await env.DB.prepare("SELECT value FROM catalog_config WHERE key = 'main'").first();
    let config = {};
    if (row && row.value) {
      try { config = JSON.parse(row.value); } catch (_) {}
    }

    config.event_info = {
      title_th: body.eventTitle || '',
      title_en: body.eventTitleEn || '',
      description_th: body.eventDescriptionTh || '',
      description_en: body.eventDescriptionEn || ''
    };

    await env.DB.prepare(
      "INSERT OR REPLACE INTO catalog_config (key, value, updated_at) VALUES ('main', ?, CURRENT_TIMESTAMP)"
    ).bind(JSON.stringify(config)).run();

    return new Response(JSON.stringify({ success: true, config: config.event_info }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
