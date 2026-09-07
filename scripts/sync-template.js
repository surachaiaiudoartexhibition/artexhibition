#!/usr/bin/env node
/**
 * Event Template Sync & Propagation Engine
 * Propagates structural updates from templates/event-template to ALL existing events,
 * while strictly preserving each event's unique credentials (Email, D1, Cloudinary, Tokens).
 */

const fs = require('node:fs');
const path = require('node:path');

const ROOT_DIR = path.join(__dirname, '..');
const TEMPLATE_DIR = path.join(ROOT_DIR, 'templates', 'event-template');
const EVENTS_DIR = path.join(ROOT_DIR, 'events');

function copyAndReplace(src, dest, replacements, preserveFiles = []) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    let targetName = entry.name;
    if (targetName.endsWith('.template')) {
      targetName = targetName.replace(/\.template$/, '');
    }

    if (preserveFiles.includes(targetName)) {
      continue; // Skip files marked for preservation
    }

    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, targetName);

    if (entry.isDirectory()) {
      copyAndReplace(srcPath, destPath, replacements, preserveFiles);
    } else {
      let content = fs.readFileSync(srcPath, 'utf8');
      for (const [key, val] of Object.entries(replacements)) {
        const pattern = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
        content = content.replace(pattern, val || '');
      }
      fs.writeFileSync(destPath, content, 'utf8');
    }
  }
}

async function syncAllEvents() {
  console.log("===============================================================");
  console.log(" 🔄 Propagating Template Updates to All Event Instances");
  console.log("===============================================================\n");

  if (!fs.existsSync(EVENTS_DIR)) {
    console.log("ยังไม่มีโฟลเดอร์ events/ ในระบบ");
    return;
  }

  const eventDirs = fs.readdirSync(EVENTS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  if (eventDirs.length === 0) {
    console.log("ยังไม่มี Event ใดๆ ในโฟลเดอร์ events/ ให้ทำการซิงค์");
    return;
  }

  console.log(`พบทั้งหมด ${eventDirs.length} นิทรรศการที่ต้องอัปเดตโครงสร้าง:`);
  eventDirs.forEach((name, idx) => console.log(`  ${idx + 1}. ${name}`));
  console.log("");

  let updatedCount = 0;

  for (const dirName of eventDirs) {
    const eventPath = path.join(EVENTS_DIR, dirName);
    const manifestPath = path.join(eventPath, 'event-manifest.json');

    if (!fs.existsSync(manifestPath)) {
      console.warn(`⚠️ ข้าม ${dirName}: ไม่พบไฟล์ event-manifest.json`);
      continue;
    }

    try {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

      const replacements = {
        EVENT_ID: manifest.eventId,
        EVENT_TITLE: manifest.eventTitle,
        ADMIN_EMAIL: manifest.adminEmail,
        CLOUDINARY_CLOUD_NAME: manifest.accountIsolation?.cloudinary?.cloudName || '',
        CLOUDINARY_UPLOAD_PRESET: manifest.accountIsolation?.cloudinary?.uploadPreset || '',
        D1_DATABASE_NAME: manifest.accountIsolation?.cloudflare?.d1DatabaseName || `d1-${manifest.eventId}`,
        D1_DATABASE_ID: manifest.accountIsolation?.cloudflare?.d1DatabaseId || '',
        SHARED_SECRET_TOKEN: manifest.security?.sharedSecretToken || '',
        MASTER_PORTAL_URL: manifest.integration?.masterPortalUrl || 'https://artexhibition.pages.dev',
        ADMIN_KEY: manifest.security?.adminKey || 'admin123',
        EVENT_PAGE_BASE_URL: manifest.integration?.eventPageBaseUrl || `https://${manifest.eventId}.pages.dev`
      };

      // Files that should NEVER be overwritten by template
      const preserveFiles = ['event-manifest.json'];

      // Propagate template code to event directory
      copyAndReplace(TEMPLATE_DIR, eventPath, replacements, preserveFiles);

      console.log(`✅ อัปเดตโครงสร้าง [${dirName}] เรียบร้อย (คงค่า Email, D1 และ Cloudinary เดิมไว้)`);
      updatedCount++;
    } catch (err) {
      console.error(`❌ เกิดข้อผิดพลาดในการอัปเดต ${dirName}:`, err.message);
    }
  }

  console.log("\n===============================================================");
  console.log(` ✨ อัปเดตโครงสร้างสำเร็จทั้งหมด ${updatedCount}/${eventDirs.length} Events!`);
  console.log("===============================================================\n");
}

syncAllEvents().catch(err => {
  console.error("Sync error:", err);
  process.exit(1);
});
