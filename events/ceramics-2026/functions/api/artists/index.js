// Cloudflare Pages Function: /api/artists
// GET: Returns list of approved artists with their profile and list of approved artworks

export async function onRequestGet(context) {
  const { env } = context;

  try {
    const stmt = env.DB.prepare(`
      SELECT id, title, artist_name, artist_avatar_url, artist_bio, nationality, 
             artist_email, artist_phone, technique, dimensions, year_created, 
             price, description, image_url, thumbnail_url, zone, display_order
      FROM submissions 
      WHERE status = 'approved'
      ORDER BY artist_name ASC, display_order ASC, id ASC
    `);

    const result = await stmt.all();
    const rows = result.results || [];

    // Group artworks by artist
    const artistsMap = new Map();

    for (const row of rows) {
      const artistKey = (row.artist_name || "").trim().toLowerCase();
      if (!artistsMap.has(artistKey)) {
        artistsMap.set(artistKey, {
          artist_name: row.artist_name,
          artist_avatar_url: row.artist_avatar_url || "",
          artist_bio: row.artist_bio || "",
          nationality: row.nationality || "Thailand",
          artist_email: row.artist_email || "",
          artist_phone: row.artist_phone || "",
          artworks_count: 0,
          artworks: []
        });
      }

      const artist = artistsMap.get(artistKey);
      if (!artist.artist_avatar_url && row.artist_avatar_url) {
        artist.artist_avatar_url = row.artist_avatar_url;
      }
      if (!artist.artist_bio && row.artist_bio) {
        artist.artist_bio = row.artist_bio;
      }
      if (!artist.nationality && row.nationality) {
        artist.nationality = row.nationality;
      }

      artist.artworks_count += 1;
      artist.artworks.push({
        id: row.id,
        title: row.title,
        technique: row.technique,
        dimensions: row.dimensions,
        year_created: row.year_created,
        price: row.price,
        description: row.description,
        image_url: row.image_url,
        thumbnail_url: row.thumbnail_url || row.image_url,
        zone: row.zone
      });
    }

    const artists = Array.from(artistsMap.values());

    return new Response(JSON.stringify({
      success: true,
      count: artists.length,
      artists
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
