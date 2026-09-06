/**
 * Automated test for Master Portal Active Pull Endpoint
 */
const assert = require('node:assert');

async function testPullEndpoint() {
  console.log("Testing POST http://localhost:8788/api/sync/pull ...");
  const res = await fetch('http://localhost:8788/api/sync/pull', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  });

  assert.strictEqual(res.status, 200, `Expected 200 status, got ${res.status}`);
  const data = await res.json();
  assert.strictEqual(data.success, true, "Expected success to be true");
  assert(Array.isArray(data.events), "Expected events to be an array");
  console.log("✅ Active Pull Endpoint works properly:", data.message);

  console.log("Testing GET http://localhost:8788/api/artworks ...");
  const artRes = await fetch('http://localhost:8788/api/artworks');
  assert.strictEqual(artRes.status, 200);
  const artData = await artRes.json();
  assert.strictEqual(artData.success, true);
  assert(artData.artworks.length > 0, "Expected artworks in database");
  console.log(`✅ Artworks query verified: ${artData.artworks.length} artwork(s) available.`);

  console.log("Testing 3D Gallery static assets ...");
  const g3dHtml = await fetch('http://localhost:8788/gallery-3d.html');
  assert.strictEqual(g3dHtml.status, 200);
  const g3dJs = await fetch('http://localhost:8788/js/gallery-3d.js');
  assert.strictEqual(g3dJs.status, 200);
  console.log("✅ 3D Gallery HTML and JavaScript served successfully.");

  console.log("\n🎉 All Active Pull and 3D Gallery tests passed!");
}

testPullEndpoint().catch(err => {
  console.error("❌ Test failed:", err);
  process.exit(1);
});
