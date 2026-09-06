export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const dataUrl = body.data_url || body.dataUrl || body.image || body.avatar;

    if (!dataUrl || typeof dataUrl !== 'string' || !dataUrl.startsWith('data:image/')) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid data_url' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      url: dataUrl
    }), {
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
