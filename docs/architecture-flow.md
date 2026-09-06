# ผังการเชื่อมต่อระบบ (System Architecture & Integration Flow)
## Multi-Tenant Virtual Exhibition System (Zero-Budget Architecture)

เอกสารนี้แสดงผังการเชื่อมต่อสถาปัตยกรรมระบบ การไหลของข้อมูล (Data Flow) ความสัมพันธ์ของฐานข้อมูล และกลไกความปลอดภัยของ Webhook ระหว่าง **Event Webapps** และ **Master Portal**

---

## 1. ผังโครงสร้างระบบและการแยกบัญชี (Account Isolation Architecture)

แต่ละงานนิทรรศการ (Event) จะแยกบัญชี **Cloudflare + Cloudinary** โดยสิ้นเชิงเพื่อไม่ให้ติดโควตา Free Tier โดยมี Master Portal เป็นศูนย์รวมกลาง

```mermaid
graph TB
    subgraph Event1 ["Event Instance A (user+ev01@gmail.com)"]
        BrowserA1["Browser: ศิลปิน (Artist)"]
        BrowserA2["Browser: ภัณฑารักษ์ (Curator)"]
        CloudinaryA[("Cloudinary Storage A<br/>Free Tier: 25GB/mo")]
        WorkerA["Cloudflare Pages & Functions A<br/>Free Tier: 100k req/day"]
        D1A[("Cloudflare D1 Local DB A<br/>Free Tier: 5M reads/mo")]
    end

    subgraph Event2 ["Event Instance B (user+ev02@gmail.com)"]
        WorkerB["Cloudflare Pages & Functions B"]
        CloudinaryB[("Cloudinary Storage B")]
        D1B[("Cloudflare D1 Local DB B")]
    end

    subgraph Master ["Master Portal (user+master@gmail.com)"]
        MasterAPI["Pages Functions: /api/sync<br/>(Bearer Auth Guard)"]
        MasterD1[("Cloudflare Master D1<br/>master_artworks & registered_events")]
        GlobalUI["Global Exhibition Showcase<br/>(Search & Filters)"]
    end

    subgraph Visitor ["ผู้ชมทั่วไป (Global Visitors)"]
        UserBrowser["Browser: ผู้เข้าชมนิทรรศการ"]
    end

    %% Data Flow Connections
    BrowserA1 -->|"1. Direct Unsigned Upload (0ms Worker CPU)"| CloudinaryA
    BrowserA1 -->|"2. Save Metadata (status: pending)"| WorkerA
    WorkerA -->|"Write"| D1A

    BrowserA2 -->|"3. Curator Reviews & Clicks Approve"| WorkerA
    WorkerA -->|"4. Update status = 'approved'"| D1A
    WorkerA -->|"5. POST /api/sync<br/>Authorization: Bearer TOKEN"| MasterAPI

    MasterAPI -->|"6. Verify Token & UPSERT"| MasterD1
    MasterD1 -->|"Read Artworks"| GlobalUI

    UserBrowser -->|"7. เข้าชมคลังผลงานรวม"| GlobalUI
    GlobalUI -.->|"8. คลิก 'ชมนิทรรศการเต็มรูปแบบ'<br/>(Redirect to event_page_url)"| WorkerA
```

---

## 2. ลำดับขั้นตอนการทำงานแบบละเอียด (End-to-End Sequence Diagram)

```mermaid
sequenceDiagram
    autonumber
    actor Artist as ศิลปิน (Artist)
    participant Browser as Browser Client
    participant Cloudinary as Cloudinary API
    participant EventWorker as Event Pages Function
    participant EventD1 as Event D1 Database
    actor Curator as ภัณฑารักษ์ (Curator)
    participant MasterWorker as Master /api/sync
    participant MasterD1 as Master D1 Database
    actor Visitor as ผู้ชมทั่วไป (Visitor)

    %% Step 1: Artist Submission
    rect rgb(20, 30, 50)
    Note over Artist, EventD1: ขั้นตอนที่ 1: การส่งผลงานของศิลปิน
    Artist->>Browser: เลือกไฟล์รูปภาพ & กรอกข้อมูลผลงาน
    Browser->>Cloudinary: POST /image/upload (Direct Unsigned Preset)
    Cloudinary-->>Browser: ส่งกลับ public_id, image_url, thumbnail_url
    Browser->>EventWorker: POST /api/submissions (แนบ URLs + Metadata)
    EventWorker->>EventD1: INSERT INTO submissions (status = 'pending')
    EventD1-->>EventWorker: สำเร็จ (ID = 42)
    EventWorker-->>Browser: 201 Created (รหัสผลงาน #42)
    Browser-->>Artist: แสดงกล่องยืนยันการส่งผลงาน
    end

    %% Step 2: Curation & Webhook Trigger
    rect rgb(30, 40, 20)
    Note over Curator, MasterD1: ขั้นตอนที่ 2: ตรวจรับผลงาน & Push Webhook
    Curator->>Browser: ตรวจสอบผลงานใน Admin Dashboard
    Curator->>Browser: กดปุ่ม "อนุมัติ & Push Webhook"
    Browser->>EventWorker: POST /api/submissions/42/approve (x-admin-key)
    EventWorker->>EventD1: UPDATE submissions SET status = 'approved' WHERE id = 42
    
    EventWorker->>MasterWorker: POST /api/sync<br/>Header: Authorization: Bearer SECRET_TOKEN<br/>Payload: {event_id, global_id, title, artist, image_url, event_page_url}
    
    MasterWorker->>MasterD1: ตรวจสอบ Token กับตาราง registered_events
    alt Token ถูกต้อง
        MasterWorker->>MasterD1: UPSERT INTO master_artworks
        MasterD1-->>MasterWorker: บันทึกสำเร็จ
        MasterWorker-->>EventWorker: 200 OK (Sync Successful)
    else Token ไม่ถูกต้อง
        MasterWorker-->>EventWorker: 401 / 403 (Unauthorized / Forbidden)
    end
    EventWorker-->>Browser: แจ้งสถานะการอนุมัติและผลลัพธ์ Webhook
    end

    %% Step 3: Global Discovery & Deep Link
    rect rgb(40, 20, 40)
    Note over Visitor, EventWorker: ขั้นตอนที่ 3: การรับชมและการเชื่อมโยงกลับ (Deep Linking)
    Visitor->>MasterWorker: เข้าชม Master Portal (GET /api/artworks)
    MasterWorker->>MasterD1: ดึงผลงานรวมทุก Event
    MasterWorker-->>Visitor: แสดงการ์ดผลงานใน Global Gallery
    Visitor->>Browser: คลิกปุ่ม "ชมนิทรรศการเต็มรูปแบบ"
    Browser->>EventWorker: Redirect ไปยัง event_page_url (เช่น /artwork.html?id=42)
    EventWorker-->>Visitor: เปิดหน้าชมผลงานความละเอียดสูงในเว็บเฉพาะของงานนั้น
    end
```

---

## 3. ผังความสัมพันธ์ข้อมูล (Entity Relationship Diagram)

```mermaid
erDiagram
    %% Master Portal Database
    REGISTERED_EVENTS ||--o{ MASTER_ARTWORKS : "hosts / publishes"
    
    REGISTERED_EVENTS {
        text event_id PK "รหัสประจำงาน เช่น printmaking-2026"
        text event_title "ชื่อนิทรรศการเต็ม"
        text portal_url "URL หน้าเว็บหลักของงาน"
        text secret_token "โทเค็นยืนยันตัวตนใน Bearer Auth"
        text status "สถานะ: active, archived"
        datetime created_at "เวลาลงทะเบียน"
    }

    MASTER_ARTWORKS {
        text global_id PK "รหัสผลงานสากล e.g. printmaking-2026-0042"
        text event_id FK "อ้างอิงไปยัง registered_events"
        text title "ชื่อผลงาน"
        text artist_name "ชื่อศิลปิน"
        text image_url "URL ภาพความละเอียดสูง (Cloudinary)"
        text thumbnail_url "URL ภาพตัวอย่างขนาดย่อ"
        text event_page_url "Deep link กลับไปยัง Event Webapp"
        datetime published_at "เวลาที่ซิงค์เผยแพร่"
    }

    %% Event Local Database (Isolated per Tenant)
    EVENT_SUBMISSIONS {
        integer id PK "Auto Increment"
        text title "ชื่อผลงาน"
        text artist_name "ชื่อศิลปิน"
        text description "แนวคิด / เทคนิค"
        text cloudinary_public_id "Public ID บน Cloudinary"
        text image_url "URL ภาพ f_auto,q_auto,w_2000,c_limit"
        text thumbnail_url "URL ภาพ c_thumb,w_600"
        text status "สถานะ: pending, approved, rejected"
        datetime created_at "เวลาที่ศิลปินส่งผลงาน"
    }
```

---

## 4. แผนผังความปลอดภัยและการตรวจสอบสิทธิ์ Webhook (Security Flowchart)

```mermaid
flowchart TD
    Req["Request: POST /api/sync"] --> CheckHeader{"มี Authorization Header หรือไม่?"}
    
    CheckHeader -- ไม่พบ หรือ รูปแบบผิด --> Resp401["ส่งกลับ 401 Unauthorized<br/>(Missing Bearer Token)"]
    
    CheckHeader -- มีรูปแบบ Bearer Token --> QueryEvent{"ค้นหา event_id ในตาราง registered_events"}
    
    QueryEvent -- ไม่พบ Event ID --> CheckGlobal{"Token ตรงกับ GLOBAL_SYNC_SECRET หรือไม่?"}
    CheckGlobal -- ไม่ตรง --> Resp403["ส่งกลับ 403 Forbidden<br/>(Unregistered Event)"]
    CheckGlobal -- ตรง --> AutoReg["Auto Register Event ใหม่"] --> DoUpsert
    
    QueryEvent -- พบ Event ID --> CompareToken{"Token ตรงกับ secret_token ใน DB หรือไม่?"}
    
    CompareToken -- ไม่ตรง --> Resp403
    CompareToken -- ตรงกัน --> DoUpsert["ดำเนินการคำสั่ง SQL UPSERT<br/>INSERT ... ON CONFLICT(global_id) DO UPDATE"]
    
    DoUpsert --> Resp200["ส่งกลับ 200 OK<br/>พร้อม JSON ผลงานที่อัปเดตเรียบร้อย"]
```

---

## 5. จุดเด่นของการออกแบบ Zero-Budget
1. **0 CPU Overhead บน Worker ตอนอัปโหลด:** อาศัย Direct Unsigned Upload ของ Cloudinary จาก Browser โดยตรง
2. **ไม่ติดเพดาน Free Tier (Bandwidth / Quota):** แยก 1 งาน = 1 บัญชี Cloudflare (100,000 req/วัน) + 1 บัญชี Cloudinary (25GB/เดือน)
3. **โครงสร้างทนต่อข้อผิดพลาด (Idempotent Webhook):** ใช้คำสั่ง `ON CONFLICT(global_id) DO UPDATE` ทำให้หากส่ง Webhook ซ้ำจะไม่เกิดข้อมูลเบิ้ลหรือ Error
4. **ความปลอดภัยสูง:** ทุก Event เชื่อมต่อผ่าน Bearer Token ที่ถูกตรวจสอบกับ Master D1 เสมอ
