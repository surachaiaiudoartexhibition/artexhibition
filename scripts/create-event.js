#!/usr/bin/env node
/**
 * Event Webapp Template Generator (Multi-Tenant Zero-Budget)
 * Creates a fully configured, isolated event webapp with dedicated:
 *  - Email (sub-addressed)
 *  - Cloudflare D1 Database
 *  - Cloudinary Storage
 *  - Secret Webhook Token
 */

const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline/promises');
const crypto = require('node:crypto');

const ROOT_DIR = path.join(__dirname, '..');
const TEMPLATE_DIR = path.join(ROOT_DIR, 'templates', 'event-template');
const EVENTS_DIR = path.join(ROOT_DIR, 'events');

// Parse CLI Arguments: --key=value
function parseArgs() {
  const args = {};
  for (const arg of process.argv.slice(2)) {
    if (arg.startsWith('--')) {
      const eqIndex = arg.indexOf('=');
      if (eqIndex !== -1) {
        const key = arg.slice(2, eqIndex);
        const val = arg.slice(eqIndex + 1);
        args[key] = val;
      } else {
        args[arg.slice(2)] = true;
      }
    }
  }
  return args;
}

function generateSecureToken(prefix = 'sec') {
  return `${prefix}_${crypto.randomBytes(16).toString('hex')}`;
}

async function promptUser(query, defaultValue = '') {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const promptText = defaultValue ? `${query} [${defaultValue}]: ` : `${query}: `;
  const answer = await rl.question(promptText);
  rl.close();
  return answer.trim() || defaultValue;
}

function copyAndReplace(src, dest, replacements) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    let targetName = entry.name;
    if (targetName.endsWith('.template')) {
      targetName = targetName.replace(/\.template$/, '');
    }
    const destPath = path.join(dest, targetName);

    if (entry.isDirectory()) {
      copyAndReplace(srcPath, destPath, replacements);
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

async function main() {
  console.log("===============================================================");
  console.log(" 🎨 Multi-Tenant Event Webapp Generator (Zero-Budget)");
  console.log("===============================================================\n");

  const cliArgs = parseArgs();
  const isInteractive = Object.keys(cliArgs).length === 0;

  // 1. Gather Configuration
  let eventId = cliArgs.id;
  let eventTitle = cliArgs.title;
  let adminEmail = cliArgs.email;
  let cloudName = cliArgs.cloud;
  let uploadPreset = cliArgs.preset;
  let d1Name = cliArgs.db;
  let d1Id = cliArgs.dbid;
  let masterPortalUrl = cliArgs.master || 'https://master-portal.pages.dev';
  let adminKey = cliArgs.adminkey;
  let secretToken = cliArgs.secret;

  if (isInteractive) {
    console.log("กรุณากรอกข้อมูลสำหรับ Event ใหม่ (กด Enter เพื่อใช้ค่าเริ่มต้น):\n");
    eventId = await promptUser("1. Event ID (รหัสประจำงาน เช่น photo-2026)", "photo-2026");
    eventTitle = await promptUser("2. ชื่อนิทรรศการ (Event Title)", "Biennale Photography 2026");
    adminEmail = await promptUser("3. Email ประจำงาน (Sub-addressing สำหรับแยกบัญชี)", `artorg+${eventId}@gmail.com`);
    cloudName = await promptUser("4. Cloudinary Cloud Name (บัญชีของงานนี้)", `${eventId}-media`);
    uploadPreset = await promptUser("5. Cloudinary Upload Preset (Unsigned)", `${eventId}_preset`);
    d1Name = await promptUser("6. Cloudflare D1 Database Name", `d1-${eventId}`);
    d1Id = await promptUser("7. Cloudflare D1 Database ID (ปล่อยว่างไว้ก่อนได้ถ้ายังไม่ได้สร้าง)", `d1-id-placeholder-${eventId}`);
    masterPortalUrl = await promptUser("8. URL เว็บท่าหลัก (Master Portal URL)", "http://localhost:8788");
    adminKey = await promptUser("9. Curator Admin Password (รหัสสำหรับตรวจรับงาน)", "admin123");
  } else {
    // Defaults for CLI mode
    eventId = eventId || `event-${Date.now()}`;
    eventTitle = eventTitle || `Virtual Exhibition ${eventId}`;
    adminEmail = adminEmail || `admin+${eventId}@gmail.com`;
    cloudName = cloudName || `${eventId}-cloud`;
    uploadPreset = uploadPreset || `${eventId}_preset`;
    d1Name = d1Name || `d1-${eventId}`;
    d1Id = d1Id || `placeholder-${eventId}`;
    adminKey = adminKey || 'admin123';
  }

  // Auto-generate Secret Token if not supplied
  if (!secretToken) {
    secretToken = generateSecureToken(`sec_${eventId.replace(/[^a-zA-Z0-9]/g, '')}`);
  }

  const targetDir = path.join(EVENTS_DIR, eventId);
  if (fs.existsSync(targetDir)) {
    console.warn(`\n⚠️ โฟลเดอร์ ${targetDir} มีอยู่แล้ว! กำลังเขียนทับไฟล์...`);
  } else {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const replacements = {
    EVENT_ID: eventId,
    EVENT_TITLE: eventTitle,
    ADMIN_EMAIL: adminEmail,
    CLOUDINARY_CLOUD_NAME: cloudName,
    CLOUDINARY_UPLOAD_PRESET: uploadPreset,
    D1_DATABASE_NAME: d1Name,
    D1_DATABASE_ID: d1Id,
    SHARED_SECRET_TOKEN: secretToken,
    MASTER_PORTAL_URL: masterPortalUrl,
    ADMIN_KEY: adminKey,
    EVENT_PAGE_BASE_URL: `https://${eventId}.pages.dev`,
    EVENT_THEME: 'heritage'
  };

  // 2. Clone from template
  console.log(`\n⏳ กำลังคัดลอก Template ไปยัง: ${targetDir}...`);
  copyAndReplace(TEMPLATE_DIR, targetDir, replacements);

  // 3. Create event-manifest.json
  const manifest = {
    eventId,
    eventTitle,
    eventTheme: 'heritage',
    adminEmail,
    createdAt: new Date().toISOString(),
    accountIsolation: {
      cloudflare: {
        accountEmail: adminEmail,
        d1DatabaseName: d1Name,
        d1DatabaseId: d1Id,
        pagesProject: eventId
      },
      cloudinary: {
        accountEmail: adminEmail,
        cloudName,
        uploadPreset
      }
    },
    security: {
      sharedSecretToken: secretToken,
      adminKey
    },
    integration: {
      masterPortalUrl,
      eventPageBaseUrl: `https://${eventId}.pages.dev`
    }
  };

  fs.writeFileSync(
    path.join(targetDir, 'event-manifest.json'),
    JSON.stringify(manifest, null, 2),
    'utf8'
  );

  // 4. Create Windows convenience batch scripts inside event folder
  const deployBatContent = `@echo off
echo =======================================================
echo  Deploying ${eventTitle} (${eventId})
echo  Cloudflare Account: ${adminEmail}
echo =======================================================
echo.
npx wrangler pages deploy public --project-name=${eventId}
pause
`;
  fs.writeFileSync(path.join(targetDir, 'deploy.bat'), deployBatContent, 'utf8');

  const initD1BatContent = `@echo off
echo =======================================================
echo  Initializing D1 Database for ${eventId}
echo =======================================================
echo.
echo 1. Creating D1 Database on Cloudflare (Run once):
echo    npx wrangler d1 create ${d1Name}
echo.
echo 2. Executing Schema remotely:
npx wrangler d1 execute ${d1Name} --file=schema.sql --remote
pause
`;
  fs.writeFileSync(path.join(targetDir, 'init-d1.bat'), initD1BatContent, 'utf8');

  // 5. Try registering event in local master portal sqlite if exists
  const masterDbPath = path.join(ROOT_DIR, 'scripts', 'master-local.sqlite');
  let autoRegistered = false;
  if (fs.existsSync(masterDbPath)) {
    try {
      const { DatabaseSync } = require('node:sqlite');
      const masterDb = new DatabaseSync(masterDbPath);
      masterDb.prepare(`
        INSERT INTO registered_events (event_id, event_title, portal_url, secret_token, status)
        VALUES (?, ?, ?, ?, 'active')
        ON CONFLICT(event_id) DO UPDATE SET
          event_title = excluded.event_title,
          portal_url = excluded.portal_url,
          secret_token = excluded.secret_token;
      `).run(eventId, eventTitle, `https://${eventId}.pages.dev`, secretToken);
      autoRegistered = true;
    } catch (dbErr) {
      // Ignored
    }
  }

  console.log("\n===============================================================");
  console.log(" ✨ สร้าง Event Webapp สำเร็จเรียบร้อย!");
  console.log("===============================================================");
  console.log(`📁 โฟลเดอร์ที่สร้าง: ${targetDir}`);
  console.log(`📧 Dedicated Email:    ${adminEmail}`);
  console.log(`☁️  Cloudinary Cloud:   ${cloudName} (Preset: ${uploadPreset})`);
  console.log(`🗄️  Cloudflare D1:       ${d1Name} (ID: ${d1Id})`);
  console.log(`🔑 Shared Secret Token: ${secretToken}`);
  console.log(`🛡️  Curator Admin Key:   ${adminKey}`);
  if (autoRegistered) {
    console.log(`✅ ลงทะเบียนเข้าสู่ Local Master Portal Database เรียบร้อยแล้ว!`);
  }
  console.log("---------------------------------------------------------------");
  console.log("📌 คำสั่งสำหรับลงทะเบียนบน Master Portal API (หากต้องการลงทะเบียนผ่าน HTTP):");
  console.log(`   POST ${masterPortalUrl}/api/events`);
  console.log(`   Header: x-admin-key: master_admin_secret_999`);
  console.log(`   Body: {`);
  console.log(`     "event_id": "${eventId}",`);
  console.log(`     "event_title": "${eventTitle}",`);
  console.log(`     "portal_url": "https://${eventId}.pages.dev",`);
  console.log(`     "secret_token": "${secretToken}"`);
  console.log(`   }`);
  console.log("===============================================================\n");
}

main().catch(err => {
  console.error("Generator error:", err);
  process.exit(1);
});
