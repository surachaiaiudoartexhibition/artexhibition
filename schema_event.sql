-- ==========================================================
-- Event Local D1 Schema (schema_event.sql)
-- Multi-Tenant Virtual Exhibition System
-- ==========================================================

CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    title_th TEXT,
    title_en TEXT,
    artist_name TEXT NOT NULL,
    artist_name_th TEXT,
    artist_name_en TEXT,
    academic_title TEXT,
    academic_title_th TEXT,
    academic_title_en TEXT,
    artist_avatar_url TEXT,
    artist_bio TEXT,
    artist_bio_th TEXT,
    artist_bio_en TEXT,
    nationality TEXT DEFAULT 'Thailand',
    artist_email TEXT,
    artist_phone TEXT,
    technique TEXT,
    technique_th TEXT,
    technique_en TEXT,
    dimensions TEXT,
    year_created TEXT,
    price TEXT,
    description TEXT,
    description_th TEXT,
    description_en TEXT,
    cloudinary_public_id TEXT,
    image_url TEXT NOT NULL,
    thumbnail_url TEXT,
    zone TEXT DEFAULT 'Main Gallery',
    display_order INTEGER DEFAULT 0,
    status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_artist ON submissions(artist_name);

CREATE TABLE IF NOT EXISTS catalog_config (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
