-- ==========================================================
-- Master Portal D1 Schema (schema_master.sql)
-- Multi-Tenant Virtual Exhibition System
-- ==========================================================

CREATE TABLE IF NOT EXISTS registered_events (
    event_id TEXT PRIMARY KEY,
    event_title TEXT NOT NULL,
    portal_url TEXT NOT NULL,
    secret_token TEXT NOT NULL,
    status TEXT DEFAULT 'active', -- 'active', 'archived'
    catalog_url TEXT, -- Link to exhibition catalogue (/catalog.html or direct PDF)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS master_artworks (
    global_id TEXT PRIMARY KEY, -- e.g., 'printmaking-2026-0042'
    event_id TEXT NOT NULL,
    title TEXT NOT NULL,
    artist_name TEXT NOT NULL,
    image_url TEXT NOT NULL,
    thumbnail_url TEXT,
    event_page_url TEXT NOT NULL,
    description TEXT,
    technique TEXT,
    dimensions TEXT,
    year_created TEXT,
    zone TEXT,
    artist_avatar_url TEXT,
    nationality TEXT,
    published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES registered_events(event_id)
);

CREATE INDEX IF NOT EXISTS idx_artworks_event ON master_artworks(event_id);
CREATE INDEX IF NOT EXISTS idx_artworks_published ON master_artworks(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_artworks_artist ON master_artworks(artist_name);
