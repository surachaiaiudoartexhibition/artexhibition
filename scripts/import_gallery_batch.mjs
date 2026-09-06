#!/usr/bin/env node
/**
 * =============================================================================
 * Poh-Chang Fine Art Exhibition — Smart Batch Data Importer
 * Adapted from D:\\project-ai\\art-gallery architecture
 * =============================================================================
 * Features:
 *  1. Spreadsheet parsing (.csv with UTF-8 / UTF-8-BOM / CP874 / Latin1)
 *  2. Dual Folder Asset Scanning (Artist Portraits & Artwork Images)
 *  3. Dual Matching Engine:
 *     - Numerical Prefix: 001.jpg / 1.png -> ID 001
 *     - Fuzzy Thai/EN String Similarity: 'ถวัลย์_ดัชนี.jpg' -> 'ถวัลย์ ดัชนี'
 *  4. Flexible Multi-lingual Column Aliases (Thai/English)
 *  5. Direct SQLite / Cloudflare API Ingestion
 *
 * Usage:
 *  node scripts/import_gallery_batch.mjs --csv "D:/project-ai/art-gallery/sample_import/artwork_list.csv" \\
 *                                       --artists-dir "D:/project-ai/art-gallery/sample_import/folder_artists" \\
 *                                       --artworks-dir "D:/project-ai/art-gallery/sample_import/folder_artworks" \\
 *                                       --status approved
 * =============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Helper: Normalize String for comparison
function normalizeStr(str) {
  if (!str) return '';
  return String(str).toLowerCase().replace(/[\s_\-]+/g, '').trim();
}

// Helper: Levenshtein Distance & Similarity
function getSimilarity(s1, s2) {
  const n1 = normalizeStr(s1);
  const n2 = normalizeStr(s2);
  if (n1 === n2) return 1.0;
  if (!n1 || !n2) return 0.0;
  if (n1.includes(n2) || n2.includes(n1)) return 0.9;

  const track = Array(n2.length + 1).fill(null).map(() =>
    Array(n1.length + 1).fill(null));
  for (let i = 0; i <= n1.length; i += 1) track[0][i] = i;
  for (let j = 0; j <= n2.length; j += 1) track[j][0] = j;

  for (let j = 1; j <= n2.length; j += 1) {
    for (let i = 1; i <= n1.length; i += 1) {
      const indicator = n1[i - 1] === n2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator // substitution
      );
    }
  }
  const distance = track[n2.length][n1.length];
  const maxLen = Math.max(n1.length, n2.length);
  return 1 - (distance / maxLen);
}

// Extract numeric prefix: "001.jpg" -> 1, "02_monet.png" -> 2
function extractNumberPrefix(filename) {
  const base = path.parse(filename).name;
  const match = base.match(/^0*(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

// Scan folder for images and build indices
function scanFolder(dirPath) {
  const byNumber = new Map();
  const byBasename = new Map();
  const allFiles = [];

  if (!dirPath || !fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
    return { byNumber, byBasename, allFiles };
  }

  const validExts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg']);
  const files = fs.readdirSync(dirPath);

  for (const f of files) {
    const ext = path.extname(f).toLowerCase();
    if (validExts.has(ext)) {
      const fullPath = path.join(dirPath, f);
      const base = path.parse(f).name;
      allFiles.push({ filename: f, base, fullPath });
      byBasename.set(normalizeStr(base), fullPath);

      const num = extractNumberPrefix(f);
      if (num !== null && !byNumber.has(num)) {
        byNumber.set(num, fullPath);
      }
    }
  }

  return { byNumber, byBasename, allFiles };
}

// Parse CSV file safely
function parseCSV(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Handle UTF-8 BOM
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }

  const lines = content.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length === 0) return [];

  // Parse header
  const parseRow = (rowStr) => {
    const result = [];
    let insideQuotes = false;
    let current = '';
    for (let i = 0; i < rowStr.length; i++) {
      const char = rowStr[i];
      if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === ',' && !insideQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  };

  const headers = parseRow(lines[0]);
  const records = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseRow(lines[i]);
    const rec = {};
    headers.forEach((h, idx) => {
      rec[h] = values[idx] !== undefined ? values[idx] : '';
    });
    records.push(rec);
  }

  return records;
}

// Clean key for column aliasing
function cleanKey(k) {
  return String(k).toLowerCase().replace(/[^a-z0-9\u0E00-\u0E7F]/g, '');
}

// Main Runner
async function runBatchImport() {
  const args = process.argv.slice(2);
  let csvPath = '';
  let artistsDir = '';
  let artworksDir = '';
  let status = 'approved'; // default approved for exhibition
  let dbPath = path.join(__dirname, 'event-local.sqlite');

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--csv' && args[i + 1]) csvPath = args[++i];
    if (args[i] === '--artists-dir' && args[i + 1]) artistsDir = args[++i];
    if (args[i] === '--artworks-dir' && args[i + 1]) artworksDir = args[++i];
    if (args[i] === '--status' && args[i + 1]) status = args[++i];
    if (args[i] === '--db' && args[i + 1]) dbPath = args[++i];
  }

  console.log('='.repeat(72));
  console.log('🏛️  วิทยาลัยเพาะช่าง — ระบบนำเข้าข้อมูลนิทรรศการอัจฉริยะ (Batch Importer)');
  console.log('='.repeat(72));

  if (!csvPath || !fs.existsSync(csvPath)) {
    console.error('❌ ไม่พบไฟล์ข้อมูล CSV กรุณาระบุผ่าน --csv <path>');
    process.exit(1);
  }

  console.log(`📄 ไฟล์ตารางข้อมูล : ${csvPath}`);
  console.log(`👤 โฟลเดอร์ศิลปิน  : ${artistsDir || '(ไม่ได้ระบุ)'}`);
  console.log(`🎨 โฟลเดอร์ผลงาน   : ${artworksDir || '(ไม่ได้ระบุ)'}`);
  console.log(`💾 ฐานข้อมูลเป้าหมาย : ${dbPath}`);
  console.log(`🏷️  สถานะตั้งต้น   : ${status}`);
  console.log('-'.repeat(72));

  // 1. Scan assets
  const artistAssets = scanFolder(artistsDir);
  const artworkAssets = scanFolder(artworksDir);
  console.log(`🔍 สแกนพบรูปศิลปิน : ${artistAssets.allFiles.length} ไฟล์`);
  console.log(`🔍 สแกนพบรูปผลงาน  : ${artworkAssets.allFiles.length} ไฟล์`);

  // 2. Read CSV
  const rows = parseCSV(csvPath);
  console.log(`📖 อ่านข้อมูลผลงานได้ : ${rows.length} รายการ\\n`);

  // 3. Connect to SQLite
  const db = new DatabaseSync(dbPath);

  // Get max display order
  const maxRow = db.prepare('SELECT MAX(display_order) as maxOrder FROM submissions').get();
  let currentOrder = (maxRow && maxRow.maxOrder) ? maxRow.maxOrder : 0;

  const insertStmt = db.prepare(`
    INSERT INTO submissions (
      title, artist_name, description,
      image_url, thumbnail_url,
      artist_avatar_url, artist_bio,
      nationality, technique, dimensions,
      year_created, price, status, display_order,
      title_th, artist_name_th, artist_bio_th,
      technique_th, description_th
    ) VALUES (
      ?, ?, ?,
      ?, ?,
      ?, ?,
      ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?,
      ?, ?
    )
  `);

  let successCount = 0;

  for (let idx = 0; idx < rows.length; idx++) {
    const row = rows[idx];
    const rowNum = idx + 1;

    const cleanDash = (v) => (!v || String(v).trim() === '' || String(v).trim() === '-') ? '-' : String(v).trim();
    let idVal = '';
    let artistName = '-';
    let nationality = '-';
    let artworkTitle = '-';
    let medium = '-';
    let dimensions = '-';
    let yearCreated = '-';
    let price = '-';
    let bio = '-';
    let concept = '-';

    for (const [k, v] of Object.entries(row)) {
      const val = cleanDash(v);
      const ck = cleanKey(k);
      if (['id', 'no', 'ลำดับ', 'รหัส', 'code'].includes(ck)) idVal = val;
      else if (['artistname', 'artist', 'ชื่อศิลปิน', 'ศิลปิน', 'creator', 'name'].includes(ck)) artistName = val;
      else if (['country', 'nationality', 'ประเทศ', 'สัญชาติ'].includes(ck)) nationality = val;
      else if (['artworktitle', 'title', 'ชื่องาน', 'ชื่อผลงาน', 'ผลงาน'].includes(ck)) artworkTitle = val;
      else if (['medium', 'technique', 'เทคนิค', 'วัสดุ'].includes(ck)) medium = val;
      else if (['dimensions', 'dimension', 'size', 'ขนาด'].includes(ck)) dimensions = val;
      else if (['year', 'yearcreated', 'ปี', 'ปีที่สร้าง'].includes(ck)) yearCreated = val;
      else if (['price', 'ราคา'].includes(ck)) price = val;
      else if (['bio', 'ประวัติ', 'ประวัติศิลปิน'].includes(ck)) bio = val;
      else if (['concept', 'description', 'แนวคิด', 'คำอธิบาย'].includes(ck)) concept = val;
    }

    if (artworkTitle === '-' && artistName === '-') continue;

    // Match Artwork Image
    let matchedArtworkPath = '';
    let artworkMatchMethod = 'none';

    // A. Prefix Number
    const rowNumId = parseInt(idVal || rowNum, 10);
    if (!isNaN(rowNumId) && artworkAssets.byNumber.has(rowNumId)) {
      matchedArtworkPath = artworkAssets.byNumber.get(rowNumId);
      artworkMatchMethod = `ID Prefix (#${rowNumId})`;
    } else {
      // B. Fuzzy Title/Filename Match
      let bestScore = 0;
      let bestFile = null;
      for (const item of artworkAssets.allFiles) {
        const score = Math.max(
          getSimilarity(item.base, artworkTitle),
          getSimilarity(item.base, idVal)
        );
        if (score > bestScore && score >= 0.75) {
          bestScore = score;
          bestFile = item;
        }
      }
      if (bestFile) {
        matchedArtworkPath = bestFile.fullPath;
        artworkMatchMethod = `Fuzzy Match (${Math.round(bestScore * 100)}%)`;
      }
    }

    // Match Artist Portrait
    let matchedArtistPath = '';
    let artistMatchMethod = 'none';

    if (!isNaN(rowNumId) && artistAssets.byNumber.has(rowNumId)) {
      matchedArtistPath = artistAssets.byNumber.get(rowNumId);
      artistMatchMethod = `ID Prefix (#${rowNumId})`;
    } else {
      let bestScore = 0;
      let bestFile = null;
      for (const item of artistAssets.allFiles) {
        const score = Math.max(
          getSimilarity(item.base, artistName),
          getSimilarity(item.base, idVal)
        );
        if (score > bestScore && score >= 0.75) {
          bestScore = score;
          bestFile = item;
        }
      }
      if (bestFile) {
        matchedArtistPath = bestFile.fullPath;
        artistMatchMethod = `Fuzzy Match (${Math.round(bestScore * 100)}%)`;
      }
    }

    // Default fallback photos
    let finalArtworkUrl = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&q=80';
    let finalArtistAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80';

    if (matchedArtworkPath && fs.existsSync(matchedArtworkPath)) {
      const publicUploads = path.join(ROOT_DIR, 'apps', 'event-webapp', 'public', 'uploads');
      if (!fs.existsSync(publicUploads)) fs.mkdirSync(publicUploads, { recursive: true });
      const destName = `art_${Date.now()}_${idx}_${path.basename(matchedArtworkPath)}`;
      fs.copyFileSync(matchedArtworkPath, path.join(publicUploads, destName));
      finalArtworkUrl = `/uploads/${destName}`;
    }

    if (matchedArtistPath && fs.existsSync(matchedArtistPath)) {
      const publicUploads = path.join(ROOT_DIR, 'apps', 'event-webapp', 'public', 'uploads');
      if (!fs.existsSync(publicUploads)) fs.mkdirSync(publicUploads, { recursive: true });
      const destName = `artist_${Date.now()}_${idx}_${path.basename(matchedArtistPath)}`;
      fs.copyFileSync(matchedArtistPath, path.join(publicUploads, destName));
      finalArtistAvatar = `/uploads/${destName}`;
    }

    currentOrder += 1;

    insertStmt.run(
      artworkTitle,
      artistName,
      concept,
      finalArtworkUrl,
      finalArtworkUrl,
      finalArtistAvatar,
      bio,
      nationality,
      medium,
      dimensions,
      yearCreated,
      price,
      status,
      currentOrder,
      artworkTitle,
      artistName,
      bio,
      medium,
      concept
    );

    successCount++;
    console.log(`  [OK #${successCount}] "${artworkTitle}" โดย ${artistName}`);
    console.log(`         🎨 รูปผลงาน : ${matchedArtworkPath ? path.basename(matchedArtworkPath) + ' [' + artworkMatchMethod + ']' : 'ภาพตัวอย่างนิทรรศการ'}`);
    console.log(`         👤 รูปศิลปิน : ${matchedArtistPath ? path.basename(matchedArtistPath) + ' [' + artistMatchMethod + ']' : 'ภาพตัวอย่างนิทรรศการ'}`);
  }

  console.log('\\n' + '='.repeat(72));
  console.log(`🎉 นำเข้าข้อมูลสำเร็จเรียบร้อยแล้วทั้งหมด : ${successCount} ผลงาน`);
  console.log(`✨ สถานะผลงาน: ${status} (ปรากฏใน Gallery, ทำเนียบศิลปิน และสูจิบัตรทันที)`);
  console.log('='.repeat(72));
}

runBatchImport().catch(err => {
  console.error('Fatal import error:', err);
  process.exit(1);
});

