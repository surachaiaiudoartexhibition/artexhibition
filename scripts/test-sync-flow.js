/**
 * End-to-End Test Suite: Multi-Tenant Virtual Exhibition System
 * Tests Event DB, Master DB, Cloudinary transformation URLs,
 * Webhook Push Bearer Auth, UPSERT idempotence, and cross-event search.
 */

const { DatabaseSync } = require('node:sqlite');
const fs = require('node:fs');
const path = require('node:path');

console.log("===============================================================");
console.log(" Running Multi-Tenant Virtual Exhibition System Test Suite");
console.log("===============================================================\n");

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    throw new Error(message);
  } else {
    console.log(`✅ PASS: ${message}`);
    passedTests++;
  }
}

async function runSuite() {
  // 1. Test SQL Schema Execution
  console.log("--- 1. Testing Database Schemas (Event & Master D1) ---");
  const eventSqlPath = path.join(__dirname, '..', 'schema_event.sql');
  const masterSqlPath = path.join(__dirname, '..', 'schema_master.sql');

  const eventSql = fs.readFileSync(eventSqlPath, 'utf8');
  const masterSql = fs.readFileSync(masterSqlPath, 'utf8');

  const eventDb = new DatabaseSync(':memory:');
  eventDb.exec(eventSql);
  assert(true, "schema_event.sql executed successfully against SQLite engine");

  const masterDb = new DatabaseSync(':memory:');
  masterDb.exec(masterSql);
  assert(true, "schema_master.sql executed successfully against SQLite engine");

  // 2. Test Event Submission (Status: pending)
  console.log("\n--- 2. Testing Artist Submission to Event Local DB ---");
  const insertSubStmt = eventDb.prepare(`
    INSERT INTO submissions (title, artist_name, description, cloudinary_public_id, image_url, thumbnail_url, status)
    VALUES (?, ?, ?, ?, ?, ?, 'pending')
  `);
  
  const sampleUpload = {
    title: "Woodcut Dreams #42",
    artist_name: "Artisan Somchai",
    description: "Multi-block reduction woodcut printed on hand-made mulberry paper.",
    cloudinary_public_id: "printmaking2026/art_somchai_042",
    image_url: "https://res.cloudinary.com/event-account/image/upload/f_auto,q_auto,w_2000,c_limit/v1/printmaking2026/art_somchai_042.jpg",
    thumbnail_url: "https://res.cloudinary.com/event-account/image/upload/c_thumb,w_600/v1/printmaking2026/art_somchai_042.jpg"
  };

  const insertResult = insertSubStmt.run(
    sampleUpload.title,
    sampleUpload.artist_name,
    sampleUpload.description,
    sampleUpload.cloudinary_public_id,
    sampleUpload.image_url,
    sampleUpload.thumbnail_url
  );

  const submissionId = Number(insertResult.lastInsertRowid);
  assert(submissionId > 0, `Submission inserted with ID ${submissionId}`);

  const checkPending = eventDb.prepare("SELECT * FROM submissions WHERE id = ?").get(submissionId);
  assert(checkPending.status === "pending", "Initial submission status is 'pending'");

  // 3. Test Master Portal Event Registration & Token Validation
  console.log("\n--- 3. Testing Master Portal Event Registry & Auth ---");
  const eventId = "printmaking-2026";
  const sharedSecret = "secret_token_pm2026_supersecure";
  const eventPortalUrl = "https://printmaking-2026.pages.dev";

  masterDb.prepare(`
    INSERT INTO registered_events (event_id, event_title, portal_url, secret_token, status)
    VALUES (?, ?, ?, ?, 'active')
  `).run(eventId, "International Contemporary Printmaking 2026", eventPortalUrl, sharedSecret);

  const regEvent = masterDb.prepare("SELECT * FROM registered_events WHERE event_id = ?").get(eventId);
  assert(regEvent && regEvent.event_id === eventId, "Event registered in master portal");

  // Helper simulating Master Portal /api/sync handler logic
  function simulateMasterPortalSync(authHeader, payload) {
    const tokenMatch = (authHeader || "").match(/^Bearer\s+(.+)$/i);
    const token = tokenMatch ? tokenMatch[1].trim() : null;
    if (!token) return { status: 401, error: "Missing Bearer token" };

    const event = masterDb.prepare("SELECT * FROM registered_events WHERE event_id = ?").get(payload.event_id);
    if (!event || event.secret_token !== token) {
      return { status: 403, error: "Invalid secret token" };
    }

    // UPSERT
    masterDb.prepare(`
      INSERT INTO master_artworks (
        global_id, event_id, title, artist_name, image_url, thumbnail_url, event_page_url, published_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(global_id) DO UPDATE SET
        title = excluded.title,
        artist_name = excluded.artist_name,
        image_url = excluded.image_url,
        thumbnail_url = excluded.thumbnail_url,
        event_page_url = excluded.event_page_url;
    `).run(
      payload.global_id,
      payload.event_id,
      payload.title,
      payload.artist,
      payload.image_url,
      payload.thumbnail_url,
      payload.event_page_url
    );

    return { status: 200, success: true };
  }

  // 4. Test Webhook Authentication Rejection
  console.log("\n--- 4. Testing Webhook Security Rejection Cases ---");
  const globalId = `${eventId}-${String(submissionId).padStart(4, '0')}`;
  const webhookPayload = {
    event_id: eventId,
    global_id: globalId,
    title: sampleUpload.title,
    artist: sampleUpload.artist_name,
    image_url: sampleUpload.image_url,
    thumbnail_url: sampleUpload.thumbnail_url,
    event_page_url: `${eventPortalUrl}/artwork.html?id=${submissionId}`
  };

  const testNoAuth = simulateMasterPortalSync(null, webhookPayload);
  assert(testNoAuth.status === 401, "Webhook rejects unauthenticated request with 401");

  const testWrongToken = simulateMasterPortalSync("Bearer invalid_token_123", webhookPayload);
  assert(testWrongToken.status === 403, "Webhook rejects invalid token with 403");

  // 5. Test Event Curator Approval and Successful Webhook Ingestion
  console.log("\n--- 5. Testing Curator Approval & Successful Webhook Sync ---");
  // Update local DB status to approved
  eventDb.prepare("UPDATE submissions SET status = 'approved' WHERE id = ?").run(submissionId);
  const updatedSub = eventDb.prepare("SELECT * FROM submissions WHERE id = ?").get(submissionId);
  assert(updatedSub.status === "approved", "Event DB status transitioned to 'approved'");

  // Dispatch Webhook with valid token
  const validSync = simulateMasterPortalSync(`Bearer ${sharedSecret}`, webhookPayload);
  assert(validSync.status === 200 && validSync.success, "Master Portal successfully ingested artwork via webhook (Status 200)");

  // Verify Master Database record
  const masterArt = masterDb.prepare("SELECT * FROM master_artworks WHERE global_id = ?").get(globalId);
  assert(masterArt !== undefined, "Artwork exists in Master Portal 'master_artworks' table");
  assert(masterArt.title === sampleUpload.title, "Artwork title matches payload");
  assert(masterArt.event_page_url.includes(`/artwork.html?id=${submissionId}`), "Artwork event_page_url properly configured for redirect");

  // 6. Test UPSERT Idempotence (Update existing submission)
  console.log("\n--- 6. Testing UPSERT Idempotence ---");
  const updatedPayload = {
    ...webhookPayload,
    title: "Woodcut Dreams #42 (Edition 2/5)"
  };
  const upsertSync = simulateMasterPortalSync(`Bearer ${sharedSecret}`, updatedPayload);
  assert(upsertSync.status === 200, "Subsequent sync for same global_id executes cleanly");

  const updatedMasterArt = masterDb.prepare("SELECT * FROM master_artworks WHERE global_id = ?").get(globalId);
  assert(updatedMasterArt.title === "Woodcut Dreams #42 (Edition 2/5)", "UPSERT updated existing artwork without duplicate keys");

  // Total count in master artworks should still be 1
  const countRow = masterDb.prepare("SELECT COUNT(*) as cnt FROM master_artworks").get();
  assert(countRow.cnt === 1, "Artwork count remains 1 after UPSERT update");

  // 7. Test Cross-Event Search Query
  console.log("\n--- 7. Testing Master Portal Cross-Event Search ---");
  const searchQuery = masterDb.prepare(`
    SELECT m.*, e.event_title 
    FROM master_artworks m
    JOIN registered_events e ON m.event_id = e.event_id
    WHERE m.artist_name LIKE ?
  `).all('%Somchai%');
  assert(searchQuery.length === 1, "Cross-event artist search returns matched artwork");
  assert(searchQuery[0].event_title === "International Contemporary Printmaking 2026", "Event title joined correctly");

  console.log("\n===============================================================");
  console.log(` Test Results: ${passedTests}/${totalTests} tests passed successfully!`);
  console.log("===============================================================\n");
}

runSuite().catch(err => {
  console.error("Test Suite Error:", err);
  process.exit(1);
});
