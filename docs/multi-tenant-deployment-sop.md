# แผนปฏิบัติการและคู่มือการดูแลระบบ (Standard Operating Procedure: SOP)
## Single-Codebase Multi-Tenant Architecture (Zero-Budget Cloudflare + Cloudinary)

> **เป้าหมาย:** บำรุงรักษาโค้ดระบบนิทรรศการศิลปะออนไลน์จากจุดเดียว (Single Source of Truth) เมื่อมีการปรับปรุงดีไซน์หรือฟังก์ชัน ทุกเว็บในทุกบัญชีจะอัปเดตเองอัตโนมัติ 100% ภายใต้งบประมาณ 0 บาทตลอดชีพ

---

## 1. ภาพรวมสถาปัตยกรรม (Architecture Blueprint)

```
                       [ GitHub Repository: virtual-exhibition-system ]
                                              │
                      ┌───────────────────────┼───────────────────────┐
                      │                       │                       │
              (Root: apps/master-portal)  (Root: apps/event-webapp)  (Root: apps/event-webapp)
                      ▼                       ▼                       ▼
            [ Master Portal ]           [ Event 1 App ]         [ Event 2 App ]
            Account: master@gmail       Account: ev01@gmail     Account: ev02@gmail
            D1: master-db               D1: event-db-01         D1: event-db-02
            URL: portal.pages.dev       URL: ev01.pages.dev     URL: ev02.pages.dev
```

### หลักการสำคัญ
1. **โค้ดมีชุดเดียว (Single Codebase):**
   - โฟลเดอร์ [`apps/event-webapp`](file:///d:/project-ai/port/apps/event-webapp) คือแกนหลักของเว็บ Event ทุกงาน
   - โฟลเดอร์ [`apps/master-portal`](file:///d:/project-ai/port/apps/master-portal) คือแกนหลักของเว็บท่ารวมศูนย์
2. **แยกบัญชีฟรี 100% (Account Isolation):**
   - แต่ละ Event ใช้ Cloudflare Free Tier (100,000 req/วัน) + Cloudinary Free Tier (25GB/เดือน) แยกกันคนละบัญชี ไม่แชร์โควตากัน
3. **กำหนดความต่างด้วย Environment Variables:**
   - โค้ด HTML, CSS, JavaScript และ Pages Functions เหมือนกันทุกงาน
   - แต่ละงานจะดึงค่าประจำตัว (`EVENT_ID`, `CLOUDINARY_CLOUD_NAME`, `D1 Database`) มาจาก Environment Variables บน Cloudflare Pages Dashboard

---

## 2. ขั้นตอนที่ 1: เตรียม Git Repository (ทำครั้งเดียว)

1. เปิด Terminal ในโฟลเดอร์โปรเจกต์ `d:\project-ai\port\`
2. เริ่มต้น Git และ Commit โค้ด:
   ```bash
   git init
   git add .
   git commit -m "feat: initial multi-tenant virtual exhibition system"
   ```
3. สร้าง Repository ใหม่บน [GitHub.com](https://github.com) (ตั้งเป็น Private หรือ Public ก็ได้)
4. เชื่อมต่อและ Push โค้ดขึ้น GitHub:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<YOUR_USER>/<REPO_NAME>.git
   git push -u origin main
   ```

---

## 3. ขั้นตอนที่ 2: ติดตั้ง Master Portal (เว็บท่ากลาง)

ทำในบัญชีหลัก เช่น `yourname+master@gmail.com`

### 3.1 สร้าง Master D1 Database
1. ไปที่ Cloudflare Dashboard &rarr; **Workers & Pages** &rarr; **D1 SQL Database**
2. คลิก **Create Database** ตั้งชื่อว่า `master-db`
3. ไปที่แท็บ **Console** แล้วคัดลอก SQL จากไฟล์ [`schema_master.sql`](file:///d:/project-ai/port/schema_master.sql) ไป Execute

### 3.2 เชื่อมต่อ Cloudflare Pages
1. ไปที่ **Workers & Pages** &rarr; **Create application** &rarr; **Pages** &rarr; **Connect to Git**
2. เลือก GitHub Repository ของคุณ
3. ตั้งค่า Build Settings:
   - **Project name:** `master-portal`
   - **Production branch:** `main`
   - **Framework preset:** `None`
   - **Root directory (advanced):** `apps/master-portal`
   - **Build output directory:** `public`
4. ผูก D1 Database (สำคัญมาก):
   - ไปที่แท็บ **Settings** &rarr; **Functions** &rarr; **D1 Database Bindings**
   - คลิก **Add binding**:
     - **Variable name:** `DB`
     - **D1 database:** เลือก `master-db`
5. กำหนด Environment Variables:
   - `MASTER_ADMIN_KEY`: รหัสผ่านสำหรับแอดมิน (เช่น `master_secret_2026`)
6. กด **Save and Deploy**

---

## 4. ขั้นตอนที่ 3: วิธีเพิ่ม Event ใหม่ใน 5 นาที (ไม่ต้องสร้างโฟลเดอร์ใหม่)

เมื่อมีนิทรรศการใหม่ (เช่น งานที่ 1: Printmaking 2026, งานที่ 2: Sculpture 2026) ให้ทำตามขั้นตอนนี้:

### ขั้นตอนที่ 4.1: สมัครบัญชีฟรีประจำงาน
1. **Cloudinary:** สมัครฟรีที่ [cloudinary.com](https://cloudinary.com) ด้วยอีเมล `yourname+ev01@gmail.com`
   - ไปที่ **Settings** &rarr; **Upload** &rarr; **Upload presets** &rarr; คลิก **Add upload preset**
   - ตั้ง Signing Mode เป็น **Unsigned** และตั้งชื่อ preset เช่น `event_preset`
   - จดค่า **Cloud Name** และ **Upload Preset Name** ไว้
2. **Cloudflare:** สมัครฟรีที่ [dash.cloudflare.com](https://dash.cloudflare.com) ด้วยอีเมล `yourname+ev01@gmail.com`

### ขั้นตอนที่ 4.2: สร้าง Local D1 ประจำงาน
ใน Cloudflare Dashboard ของบัญชีงานนั้น:
1. ไปที่ **D1 SQL Database** &rarr; คลิก **Create Database** ตั้งชื่อ `event-db`
2. ไปที่ **Console** คัดลอกคำสั่งจาก [`schema_event.sql`](file:///d:/project-ai/port/schema_event.sql) ไป Execute

### ขั้นตอนที่ 4.3: สร้างเว็บ Event บน Cloudflare Pages (ชี้มาที่ GitHub เดิม)
1. ไปที่ **Workers & Pages** &rarr; **Pages** &rarr; **Connect to Git**
2. เลือก GitHub Repository เดียวกันกับ Master Portal!
3. กำหนดค่า Build Settings:
   - **Project name:** ตั้งชื่อตาม Slug ของงาน เช่น `printmaking-2026`
   - **Root directory:** `apps/event-webapp`
   - **Build output directory:** `public`
4. ผูก D1 Binding:
   - **Settings** &rarr; **Functions** &rarr; **D1 Database Bindings**
   - **Variable name:** `DB`
   - **D1 database:** เลือก `event-db`
5. กำหนด Environment Variables ประจำงานนี้:
   | Variable Name | ตัวอย่างค่าที่ใส่ | คำอธิบาย |
   | :--- | :--- | :--- |
   | `EVENT_ID` | `printmaking-2026` | รหัสอ้างอิงงาน |
   | `EVENT_TITLE` | `International Contemporary Printmaking 2026` | ชื่อนิทรรศการที่จะแสดงบนเว็บ |
   | `MASTER_PORTAL_URL` | `https://master-portal.pages.dev` | URL ของเว็บท่ากลาง |
   | `SHARED_SECRET_TOKEN` | `sec_event_printmaking_99182a` | รหัสสุ่มสำหรับส่ง Webhook |
   | `CLOUDINARY_CLOUD_NAME`| `ev-printmaking-cloud` | Cloud Name ของงานนี้ |
   | `CLOUDINARY_UPLOAD_PRESET` | `event_preset` | Unsigned Preset ของงานนี้ |
   | `ADMIN_KEY` | `admin123` | รหัสผ่านสำหรับภัณฑารักษ์ตรวจรับงาน |
6. กด **Deploy** &rarr; เว็บไซต์ของงานนั้นจะออนไลน์ทันทีที่ `https://printmaking-2026.pages.dev`

### ขั้นตอนที่ 4.4: นำ Token ไปบันทึกใน Master Portal
เปิด Master Portal Admin (`https://master-portal.pages.dev/admin.html`) แล้วกรอก:
- `event_id`: `printmaking-2026`
- `portal_url`: `https://printmaking-2026.pages.dev`
- `secret_token`: `sec_event_printmaking_99182a`
- กด **บันทึกการลงทะเบียน** &rarr; เสร็จสิ้น! พร้อมรับ Webhook ทันที

---

## 5. ขั้นตอนที่ 4: การแก้ไขโค้ดครั้งเดียว เพื่อให้ทุกเว็บอัปเดตพร้อมกัน (Magic Workflow)

เมื่อคุณต้องการ:
- เปลี่ยนดีไซน์หน้าเว็บ ปรับโทนสี หรือแก้ข้อความ
- เพิ่มฟีเจอร์ใหม่ในหน้าจัดแสดง `gallery.html`
- ปรับฟอร์มส่งผลงาน `submit.html`
- ปรับแก้ระบบความปลอดภัยใน API `functions/`

### สิ่งที่คุณต้องทำ:
1. เปิดไฟล์ในโฟลเดอร์ [`apps/event-webapp/`](file:///d:/project-ai/port/apps/event-webapp/) ในเครื่องของคุณ
2. แก้ไขโค้ดตามที่ต้องการ และทดสอบให้เรียบร้อย
3. สั่ง Commit และ Push ขึ้น GitHub:
   ```bash
   git add apps/event-webapp/
   git commit -m "update: improve gallery layout and animations"
   git push origin main
   ```
4. **สิ่งที่จะเกิดขึ้นอัตโนมัติ (Zero Effort):**
   - GitHub จะส่ง Webhook ไปยัง Cloudflare ทุกบัญชี
   - Cloudflare Pages ของ **Event 1, Event 2, Event 3... จนถึง Event 50** จะเริ่ม Build โค้ดเวอร์ชันล่าสุดพร้อมกัน
   - ภายใน 1 นาที **ทุกเว็บนิทรรศการจะกลายเป็นดีไซน์ใหม่ล่าสุดทันที** โดยที่ไม่มีข้อมูลผลงานหรือบัญชีเดิมสูญหายแม้แต่นิดเดียว!

---

## 6. สรุป Checklist สำหรับผู้ดูแลระบบ

| ลำดับ | สิ่งที่ต้องทำ | ความถี่ | ใช้เวลา |
| :---: | :--- | :---: | :---: |
| 1 | สร้าง Git Repository และ Push โค้ดหลัก | ทำครั้งเดียว | 2 นาที |
| 2 | สร้าง Master Portal ในบัญชีหลัก | ทำครั้งเดียว | 5 นาที |
| 3 | เพิ่ม Event ใหม่ (สมัคร Cloudflare+Cloudinary, เชื่อม Git, ใส่ตัวแปร) | ทำเมื่อมีงานใหม่ | 5 นาที / งาน |
| 4 | ปรับแต่งโค้ดส่วนกลางให้ทุกเว็บอัปเดตพร้อมกัน (`git push`) | เมื่อต้องการอัปเกรด | **30 วินาที** |
