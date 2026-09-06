/**
 * Test script for Active Pull Ingestion
 */
const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');

const masterDb = new DatabaseSync(path.join(__dirname, 'master-local.sqlite'));
const eventDb = new DatabaseSync(path.join(__dirname, 'event-local.sqlite'));

// Ensure migrations
const existingCols = masterDb.prepare("PRAGMA table_info(master_artworks)").all().map(c => c.name);
const neededCols = [
  ['description', 'TEXT'],
  ['technique', 'TEXT'],
  ['dimensions', 'TEXT'],
  ['year_created', 'TEXT'],
  ['zone', "TEXT DEFAULT 'Main Gallery'"],
  ['artist_avatar_url', 'TEXT'],
  ['nationality', "TEXT DEFAULT 'Thailand'"]
];

for (const [col, typeDef] of neededCols) {
  if (!existingCols.includes(col)) {
    try {
      masterDb.exec(`ALTER TABLE master_artworks ADD COLUMN ${col} ${typeDef};`);
      console.log(`Migrated column: ${col}`);
    } catch (e) {
      console.warn(`Column ${col} migration note:`, e.message);
    }
  }
}

console.log("Master artworks columns:", masterDb.prepare("PRAGMA table_info(master_artworks)").all().map(c => c.name));

// Simulate pull from local event
const events = masterDb.prepare("SELECT * FROM registered_events WHERE status = 'active'").all();
console.log(`Found ${events.length} active event(s)`);

for (const ev of events) {
  console.log(`Pulling for event: ${ev.event_id} (${ev.event_title})`);
  const subs = eventDb.prepare("SELECT * FROM submissions WHERE status = 'approved'").all();
  console.log(`  Found ${subs.length} approved submission(s) in local event DB`);

  for (const sub of subs) {
    const globalId = `${ev.event_id}-${String(sub.id).padStart(4, '0')}`;
    const eventPageUrl = `${ev.portal_url.replace(/\/+$/, '')}/artwork.html?id=${sub.id}`;

    masterDb.prepare(`
      INSERT INTO master_artworks (
        global_id, event_id, title, artist_name, image_url, thumbnail_url,
        event_page_url, description, technique, dimensions, year_created,
        zone, artist_avatar_url, nationality, published_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(global_id) DO UPDATE SET
        title = excluded.title,
        artist_name = excluded.artist_name,
        image_url = excluded.image_url,
        thumbnail_url = excluded.thumbnail_url,
        event_page_url = excluded.event_page_url,
        description = excluded.description,
        technique = excluded.technique,
        dimensions = excluded.dimensions,
        year_created = excluded.year_created,
        zone = excluded.zone,
        artist_avatar_url = excluded.artist_avatar_url,
        nationality = excluded.nationality;
    `).run(
      globalId,
      ev.event_id,
      (sub.title || '').trim(),
      (sub.artist_name || '').trim(),
      sub.image_url,
      sub.thumbnail_url || sub.image_url,
      eventPageUrl,
      sub.description || '',
      sub.technique || '',
      sub.dimensions || '',
      sub.year_created || '',
      sub.zone || 'Main Gallery',
      sub.artist_avatar_url || '',
      sub.nationality || 'Thailand'
    );
  }
}

const totalArtworks = masterDb.prepare("SELECT count(*) as count FROM master_artworks").get();
console.log(`Total artworks in master database after sync: ${totalArtworks.count}`);
const sample = masterDb.prepare("SELECT global_id, title, artist_name, technique, dimensions FROM master_artworks LIMIT 3").all();
console.log("Sample records:", sample);
