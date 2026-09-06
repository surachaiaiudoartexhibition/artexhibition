# Multi-Tenant Virtual Exhibition System (Zero-Budget Architecture)

ระบบจัดแสดงนิทรรศการศิลปะออนไลน์แบบแยกจัดเป็นรอบๆ (Event Multi-Tenant) พร้อมระบบ "เว็บท่า" (Master Portal) รวมศูนย์ผลงาน ภายใต้สถาปัตยกรรม **งบประมาณ 0 บาทตลอดชีพ (Zero-Budget)** โดยใช้ Cloudflare Pages, Cloudflare D1, และ Cloudinary (Free Tier) อย่างเต็มประสิทธิภาพ

---

## 1. Zero-Budget Architectural Design

```
+-------------------------------------------------------------+
|                 EVENT WEBAPP (Account A, B, C...)           |
|                                                             |
|  [Browser: Artist]                                          |
|         │                                                   |
|         ├─ Direct Unsigned Upload (0ms Worker CPU) ──────> [Cloudinary Event Storage]
|         │                                                    (Free Tier 25GB/mo)
|         │                                                   |
|         └─ Save Metadata ────────────────────────────────> [Cloudflare D1 (Local DB)]
|                                                              (Free Tier 5M reads/mo)
|                                                             |
|  [Browser: Curator]                                         |
|         │                                                   |
|         └─ Click "Approve" ──> Event Pages Function         |
|                                     │                       |
|                                     └─ POST Webhook ───────┐|
+------------------------------------------------------------┼+
                                                             │ (Bearer Token Auth)
+------------------------------------------------------------┼+
|                 MASTER PORTAL (Central Account)            │|
|                                                            ▼|
|  [Ingestion Endpoint: /api/sync] <─────────────────────────┘|
|         │ (Validate Bearer Token & UPSERT)                  |
|         ▼                                                   |
|  [Master D1 Database (master_artworks & registered_events)] |
|         │                                                   |
|  [Global Showcase & Directory]                              |
|         └─ "ชมนิทรรศการเต็มรูปแบบ" ──> Redirects to Event App
+-------------------------------------------------------------+
```

### กลยุทธ์ประหยัดโควตา 0 บาท (Free-Tier Optimization)
1. **Account Isolation ด้วย Email Sub-addressing:**
   - แต่ละ Event ใช้แยก **1 Cloudflare Account + 1 Cloudinary Account** สมัครผ่านอีเมลเดียวโดยใช้ Sub-addressing เช่น:
     - `yourname+master@gmail.com` (Master Portal)
     - `yourname+event2026@gmail.com` (Event 1)
     - `yourname+event2027@gmail.com` (Event 2)
   - การแยกบัญชีทำให้ไม่ติดเพดานขีดจำกัด Bandwidth/Storage/Database limits ของ Free Tier
2. **Direct Browser-to-Cloudinary Upload:**
   - การส่งไฟล์ภาพขนาดใหญ่ (Hi-res artworks) ทำจาก Browser ตรงไปยัง Cloudinary API ผ่าน Unsigned Preset
   - **Cloudflare Worker ไม่ต้องรับไฟล์ภาพ** &rarr; ประหยัดเวลา CPU Execution เป็น 0 ms ต่อการอัปโหลด
3. **On-the-fly Image Transformations:**
   - ปรับขนาดและบีบอัดภาพอัตโนมัติบน URL Cloudinary:
     - หน้าแสดงผลขนาดใหญ่: `f_auto,q_auto,w_2000,c_limit`
     - รูปตัวอย่าง (Thumbnail): `c_thumb,w_600`

---

## 2. Directory Structure

```
d:/project-ai/port/
├── package.json                    # Monorepo configuration and dev scripts
├── schema_event.sql                # Event Local D1 database schema
├── schema_master.sql               # Master Portal D1 database schema
├── README.md                       # Architectural and deployment manual
├── apps/
│   ├── event-webapp/               # Event Instance (Cloudflare Pages + Functions)
│   │   ├── wrangler.toml           # D1 binding and environment variables
│   │   ├── package.json
│   │   ├── public/                 # Static web client (Tailwind CSS)
│   │   │   ├── index.html          # Event landing page & highlight works
│   │   │   ├── submit.html         # Artist submission form (Direct upload)
│   │   │   ├── gallery.html        # Local virtual exhibition gallery
│   │   │   ├── artwork.html        # Individual artwork detail view
│   │   │   ├── admin.html          # Curator moderation & webhook dispatch
│   │   │   └── js/
│   │   │       ├── cloudinary-upload.js  # Direct unsigned upload engine
│   │   │       └── api.js                # Event client API helper
│   │   └── functions/
│   │       └── api/
│   │           ├── config.js       # Exposes public Cloudinary/Event metadata
│   │           └── submissions/
│   │               ├── index.js    # GET approved submissions, POST new submission
│   │               └── [id]/
│   │                   ├── index.js    # GET single submission
│   │                   ├── approve.js  # POST approve & trigger webhook to master
│   │                   └── reject.js   # POST reject submission
│   │
│   └── master-portal/              # Central Portal (Cloudflare Pages + Functions)
│       ├── wrangler.toml           # Master D1 binding and configuration
│       ├── package.json
│       ├── public/                 # Portal web client (Tailwind CSS)
│       │   ├── index.html          # Global exhibition showcase & cross-event filter
│       │   ├── events.html         # Directory of all participating exhibitions
│       │   ├── admin.html          # Event registration & secret token generator
│       │   └── js/
│       │       └── portal.js       # Master portal client API helper
│       └── functions/
│           └── api/
│               ├── sync.js         # POST Ingestion Webhook with Bearer Auth & UPSERT
│               ├── artworks.js     # GET Global artworks with search & filter
│               └── events.js       # GET/POST Event registry management
└── scripts/
    ├── dev-server.js               # Zero-dependency local emulation server (Node.js)
    └── test-sync-flow.js           # Automated end-to-end integration test runner
```

---

## 3. Database Schemas (Cloudflare D1)

### 3.1 Event Local Database (`schema_event.sql`)
```sql
CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    artist_name TEXT NOT NULL,
    description TEXT,
    cloudinary_public_id TEXT,
    image_url TEXT NOT NULL,
    thumbnail_url TEXT,
    status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at DESC);
```

### 3.2 Master Portal Database (`schema_master.sql`)
```sql
CREATE TABLE IF NOT EXISTS registered_events (
    event_id TEXT PRIMARY KEY,
    event_title TEXT NOT NULL,
    portal_url TEXT NOT NULL,
    secret_token TEXT NOT NULL,
    status TEXT DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS master_artworks (
    global_id TEXT PRIMARY KEY, -- e.g. 'printmaking-2026-0042'
    event_id TEXT NOT NULL,
    title TEXT NOT NULL,
    artist_name TEXT NOT NULL,
    image_url TEXT NOT NULL,
    thumbnail_url TEXT,
    event_page_url TEXT NOT NULL,
    published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES registered_events(event_id)
);

CREATE INDEX IF NOT EXISTS idx_artworks_event ON master_artworks(event_id);
CREATE INDEX IF NOT EXISTS idx_artworks_published ON master_artworks(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_artworks_artist ON master_artworks(artist_name);
```

---

## 4. Webhook Ingestion API Specification

- **Endpoint:** `POST /api/sync` (บน Master Portal)
- **Header:** `Authorization: Bearer <SHARED_SECRET_TOKEN>`
- **Content-Type:** `application/json`
- **Request Payload:**
  ```json
  {
    "event_id": "printmaking-2026",
    "global_id": "printmaking-2026-0042",
    "title": "ชื่อผลงาน",
    "artist": "ชื่อศิลปิน",
    "image_url": "https://res.cloudinary.com/event-account/image/upload/f_auto,q_auto,w_2000,c_limit/v1/.../work.jpg",
    "thumbnail_url": "https://res.cloudinary.com/event-account/image/upload/c_thumb,w_600/v1/.../work.jpg",
    "event_page_url": "https://event-slug.pages.dev/artworks/42"
  }
  ```
- **Response Format (200 OK):**
  ```json
  {
    "success": true,
    "message": "Artwork printmaking-2026-0042 synchronized and upserted successfully to Master Portal.",
    "artwork": { ... }
  }
  ```
- **Security Validation:**
  - หากไม่มี Header Authorization หรือไม่มีคำนำหน้า `Bearer` &rarr; ส่งกลับ `401 Unauthorized`
  - หาก Token ไม่ตรงกับ `secret_token` ในตาราง `registered_events` ของ `event_id` นั้น &rarr; ส่งกลับ `403 Forbidden`
  - ทำคำสั่ง `UPSERT` (`ON CONFLICT(global_id) DO UPDATE ...`) เพื่อให้การส่งซ้ำไม่เกิด Error (Idempotent)

---

## 5. Deployment & Production Setup Guide

### 5.1 Cloudinary Setup (Event Account)
1. สมัครบัญชีฟรีที่ [cloudinary.com](https://cloudinary.com) ด้วยอีเมลของงานนั้น
2. ไปที่ **Settings** &rarr; **Upload** &rarr; **Upload presets**
3. คลิก **Add upload preset**:
   - **Signing Mode:** เลือก `Unsigned`
   - **Preset name:** ตั้งชื่อ เช่น `virtual_exhibition_preset`
   - **Folder:** กำหนดโฟลเดอร์ เช่น `submissions-2026`
4. บันทึกและนำ **Cloud name** และ **Upload preset name** ไปใส่ใน Environment Variables

### 5.2 Cloudflare D1 Setup
สำหรับทั้งสองบัญชี (Master และ Event):
```bash
# 1. Login wrangler
npx wrangler login

# 2. สร้างฐานข้อมูล D1
npx wrangler d1 create event-db    # บนบัญชี Event
npx wrangler d1 create master-db   # บนบัญชี Master

# 3. นำ database_id ที่ได้ไปใส่ใน wrangler.toml ของแต่ละโปรเจกต์
# 4. นำ schema SQL เข้าสู่ D1
npx wrangler d1 execute event-db --file=../../schema_event.sql --remote
npx wrangler d1 execute master-db --file=../../schema_master.sql --remote
```

### 5.3 Deploying with Cloudflare Pages
#### บน Master Portal:
```bash
cd apps/master-portal
npx wrangler pages deploy public
```
กำหนด Environment Variables บน Cloudflare Dashboard หรือ `wrangler.toml`:
- `MASTER_ADMIN_KEY`: รหัสผ่านสำหรับจัดการอีเวนต์
- `GLOBAL_SYNC_SECRET`: ค่าเริ่มต้น secret token

#### บน Event Webapp:
```bash
cd apps/event-webapp
npx wrangler pages deploy public
```
กำหนด Environment Variables:
- `EVENT_ID`: รหัสประจำงาน เช่น `printmaking-2026`
- `EVENT_TITLE`: ชื่อนิทรรศการ
- `MASTER_PORTAL_URL`: URL ของเว็บท่าหลัก เช่น `https://master-portal.pages.dev`
- `SHARED_SECRET_TOKEN`: Token ตรงกับที่ลงทะเบียนไว้ใน Master Portal
- `CLOUDINARY_CLOUD_NAME`: Cloud Name ของบัญชี Cloudinary ของงานนั้น
- `CLOUDINARY_UPLOAD_PRESET`: Unsigned upload preset
- `ADMIN_KEY`: รหัสผ่านสำหรับภัณฑารักษ์ตรวจรับงาน

---

## 6. Local Development & Testing

ระบบมาพร้อมกับ **Zero-Dependency Local Server** และ **Automated Test Suite** ที่ใช้ Node.js v24 (Native SQLite + HTTP):

### รันการทดสอบระบบแบบอัตโนมัติ (End-to-End Suite):
```bash
npm run test:sync
```
*จะทำการทดสอบ SQL Schema, การกรอกผลงาน, การดักจับ Token ผิด (401/403), การ Approve, การซิงค์ Webhook, การทำ UPSERT Idempotence, และการค้นหาข้าม Event*

### รันเซิร์ฟเวอร์จำลองทั้งสองระบบในเครื่องทันที:
```bash
npm run dev:local
```
- **Event Webapp:** [http://localhost:8787](http://localhost:8787)
  - นิทรรศการ: [http://localhost:8787/gallery.html](http://localhost:8787/gallery.html)
  - แบบฟอร์มส่งผลงาน: [http://localhost:8787/submit.html](http://localhost:8787/submit.html)
  - หน้าตรวจรับงาน (Admin): [http://localhost:8787/admin.html](http://localhost:8787/admin.html) *(รหัสผ่าน: `admin123`)*
- **Master Portal:** [http://localhost:8788](http://localhost:8788)
  - คลังผลงานรวม: [http://localhost:8788](http://localhost:8788)
  - ทำเนียบนิทรรศการ: [http://localhost:8788/events.html](http://localhost:8788/events.html)
  - จัดการลงทะเบียน Event: [http://localhost:8788/admin.html](http://localhost:8788/admin.html) *(รหัสผ่าน: `master_admin_secret_999`)*

---

## 7. การสร้างและเพิ่ม Event ใหม่ตามต้องการ (Event Template Generator)

เมื่อมีงานนิทรรศการใหม่เพิ่มขึ้น สามารถสร้างโครงสร้างเว็บ Event ใหม่ที่แยกบัญชีและฐานข้อมูลได้อย่างอิสระผ่านระบบ Template อัตโนมัติ:

### วิธีที่ 1: ผ่าน CLI หรือ Batch File (Interactive Prompt)
ดับเบิลคลิกไฟล์ `create-event.bat` หรือรันคำสั่ง:
```bash
npm run create-event
```
ระบบจะถามข้อมูลสำหรับ Event ใหม่:
1. **Event ID:** เช่น `photo-2026`
2. **Event Title:** เช่น `International Photography Biennial 2026`
3. **Dedicated Email:** เช่น `artorg+photo2026@gmail.com`
4. **Cloudinary Cloud Name:** ชื่อบัญชี Cloudinary ของงานนั้น
5. **Cloudinary Upload Preset:** Unsigned preset ของงานนั้น
6. **Cloudflare D1 Name:** ชื่อฐานข้อมูลเฉพาะของงานนั้น

หรือระบุผ่าน CLI Flags โดยตรง:
```bash
node scripts/create-event.js --id=sculpture-2026 --title="Virtual Sculpture 2026" --email=artorg+sculpture@gmail.com --cloud=sculpture-media --preset=sculpture_preset --db=d1-sculpture
```

สิ่งที่ระบบจะสร้างให้อัตโนมัติในโฟลเดอร์ `events/<event-id>/`:
- โครงสร้างเว็บ Event ทั้งหมด (`public/`, `functions/`, `schema.sql`)
- ไฟล์ `wrangler.toml` ที่เติมค่า Email, D1 และ Cloudinary พร้อมใช้
- สุ่มสร้าง `SHARED_SECRET_TOKEN` ที่ปลอดภัย
- บันทึกข้อมูลแยกบัญชีลงใน `event-manifest.json`
- สร้างไฟล์ `deploy.bat` และ `init-d1.bat` สำหรับสั่ง Deploy ขึ้น Cloudflare ได้ในคลิกเดียว
- ทำการเชื่อมโยงลงทะเบียนเข้าสู่ Master Portal ให้อัตโนมัติ

### วิธีที่ 2: ผ่าน Master Portal Admin Web UI
1. เข้าไปที่ [http://localhost:8788/admin.html](http://localhost:8788/admin.html)
2. กรอกข้อมูลในส่วน **Account Isolation Settings**:
   - อีเมลเฉพาะ (Email Sub-addressing)
   - ชื่อฐานข้อมูล Cloudflare D1
   - Cloud Name และ Upload Preset ของ Cloudinary
3. กดปุ่ม **"แสดงตัวอย่างไฟล์ wrangler.toml สำหรับ Event นี้"** เพื่อคัดลอกไฟล์ Config ไปใช้งานได้ทันที
