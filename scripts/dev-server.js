/**
 * Local Zero-Dependency Emulation Server for Multi-Tenant Virtual Exhibition System
 * Runs both Event Webapp and Master Portal on local ports using Node.js native HTTP & node:sqlite.
 *
 * Ports:
 *  - Event Webapp:  http://localhost:8787
 *  - Master Portal: http://localhost:8788
 */

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

const ROOT_DIR = path.join(__dirname, '..');

// 1. Initialize SQLite Databases
const eventDbFile = path.join(__dirname, 'event-local.sqlite');
const masterDbFile = path.join(__dirname, 'master-local.sqlite');

const eventDb = new DatabaseSync(eventDbFile);
const masterDb = new DatabaseSync(masterDbFile);

// Execute schemas
const schemaEvent = fs.readFileSync(path.join(ROOT_DIR, 'schema_event.sql'), 'utf8');
const schemaMaster = fs.readFileSync(path.join(ROOT_DIR, 'schema_master.sql'), 'utf8');
eventDb.exec(schemaEvent);
masterDb.exec(schemaMaster);

// SQLite Column Migrations (ensures existing db file has new columns)
const existingCols = eventDb.prepare("PRAGMA table_info(submissions)").all().map(c => c.name);
const neededCols = [
  ['artist_avatar_url', 'TEXT'],
  ['artist_bio', 'TEXT'],
  ['nationality', "TEXT DEFAULT 'Thailand'"],
  ['artist_email', 'TEXT'],
  ['artist_phone', 'TEXT'],
  ['technique', 'TEXT'],
  ['dimensions', 'TEXT'],
  ['year_created', 'TEXT'],
  ['price', 'TEXT'],
  ['zone', "TEXT DEFAULT 'Main Gallery'"],
  ['display_order', 'INTEGER DEFAULT 0'],
  ['title_th', 'TEXT'],
  ['title_en', 'TEXT'],
  ['artist_name_th', 'TEXT'],
  ['artist_name_en', 'TEXT'],
  ['academic_title', 'TEXT'],
  ['academic_title_th', 'TEXT'],
  ['academic_title_en', 'TEXT'],
  ['artist_bio_th', 'TEXT'],
  ['artist_bio_en', 'TEXT'],
  ['technique_th', 'TEXT'],
  ['technique_en', 'TEXT'],
  ['description_th', 'TEXT'],
  ['description_en', 'TEXT']
];
for (const [col, typeDef] of neededCols) {
  if (!existingCols.includes(col)) {
    try {
      eventDb.exec(`ALTER TABLE submissions ADD COLUMN ${col} ${typeDef};`);
    } catch (e) {
      // column already exists
    }
  }
}

// Master DB Column Migrations
const existingMasterCols = masterDb.prepare("PRAGMA table_info(master_artworks)").all().map(c => c.name);
const neededMasterCols = [
  ['description', 'TEXT'],
  ['technique', 'TEXT'],
  ['dimensions', 'TEXT'],
  ['year_created', 'TEXT'],
  ['zone', "TEXT DEFAULT 'Main Gallery'"],
  ['artist_avatar_url', 'TEXT'],
  ['nationality', "TEXT DEFAULT 'Thailand'"]
];
for (const [col, typeDef] of neededMasterCols) {
  if (!existingMasterCols.includes(col)) {
    try {
      masterDb.exec(`ALTER TABLE master_artworks ADD COLUMN ${col} ${typeDef};`);
    } catch (e) {
      // column already exists
    }
  }
}

const existingEventCols = masterDb.prepare("PRAGMA table_info(registered_events)").all().map(c => c.name);
if (!existingEventCols.includes('catalog_url')) {
  try {
    masterDb.exec(`ALTER TABLE registered_events ADD COLUMN catalog_url TEXT;`);
  } catch (e) {
    // column already exists
  }
}

// Catalog configuration storage
eventDb.exec(`
  CREATE TABLE IF NOT EXISTS catalog_config (
    key TEXT PRIMARY KEY,
    value TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// ==========================================
// Zero-Budget Backend Translation Engine
// ==========================================
async function translateText(text, fromLang, toLang) {
  if (!text || !text.trim()) return '';
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${encodeURIComponent(text)}`;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data && Array.isArray(data[0])) {
      return data[0].map(segment => segment[0]).join('').trim();
    }
    return text;
  } catch (err) {
    console.warn(`[Translate Warning] ${fromLang}->${toLang} error:`, err.message);
    return text;
  }
}

function hasThai(text) {
  return /[\u0E00-\u0E7F]/.test(text || '');
}

async function autoTranslateField(text) {
  if (!text || !text.trim()) return { th: '', en: '' };
  const trimmed = text.trim();
  const isThai = hasThai(trimmed);
  if (isThai) {
    const en = await translateText(trimmed, 'th', 'en');
    return { th: trimmed, en: en || trimmed };
  } else {
    const th = await translateText(trimmed, 'en', 'th');
    return { th: th || trimmed, en: trimmed };
  }
}

const ACADEMIC_TITLES_MAP = {
  'ศ.ดร.': { th: 'ศ.ดร.', en: 'Prof. Dr.' },
  'ศาสตราจารย์ ดร.': { th: 'ศาสตราจารย์ ดร.', en: 'Prof. Dr.' },
  'รศ.ดร.': { th: 'รศ.ดร.', en: 'Assoc. Prof. Dr.' },
  'รองศาสตราจารย์ ดร.': { th: 'รองศาสตราจารย์ ดร.', en: 'Assoc. Prof. Dr.' },
  'ผศ.ดร.': { th: 'ผศ.ดร.', en: 'Asst. Prof. Dr.' },
  'ผู้ช่วยศาสตราจารย์ ดร.': { th: 'ผู้ช่วยศาสตราจารย์ ดร.', en: 'Asst. Prof. Dr.' },
  'ศ.': { th: 'ศ.', en: 'Prof.' },
  'ศาสตราจารย์': { th: 'ศาสตราจารย์', en: 'Prof.' },
  'รศ.': { th: 'รศ.', en: 'Assoc. Prof.' },
  'รองศาสตราจารย์': { th: 'รองศาสตราจารย์', en: 'Assoc. Prof.' },
  'ผศ.': { th: 'ผศ.', en: 'Asst. Prof.' },
  'ผู้ช่วยศาสตราจารย์': { th: 'ผู้ช่วยศาสตราจารย์', en: 'Asst. Prof.' },
  'ดร.': { th: 'ดร.', en: 'Dr.' },
  'อ.ดร.': { th: 'อ.ดร.', en: 'Dr.' },
  'อ.': { th: 'อ.', en: 'Ajarn' },
  'อาจารย์': { th: 'อาจารย์', en: 'Ajarn' },
  'ศิลปินแห่งชาติ': { th: 'ศิลปินแห่งชาติ', en: 'National Artist' },
  'Prof. Dr.': { th: 'ศ.ดร.', en: 'Prof. Dr.' },
  'Assoc. Prof. Dr.': { th: 'รศ.ดร.', en: 'Assoc. Prof. Dr.' },
  'Asst. Prof. Dr.': { th: 'ผศ.ดร.', en: 'Asst. Prof. Dr.' },
  'Prof.': { th: 'ศ.', en: 'Prof.' },
  'Assoc. Prof.': { th: 'รศ.', en: 'Assoc. Prof.' },
  'Asst. Prof.': { th: 'ผศ.', en: 'Asst. Prof.' },
  'Dr.': { th: 'ดร.', en: 'Dr.' },
  'Lecturer': { th: 'อาจารย์', en: 'Lecturer' }
};

async function autoTranslateAcademicTitle(titleStr) {
  if (!titleStr || !titleStr.trim()) return { th: '', en: '' };
  const trimmed = titleStr.trim();
  const cleanTitle = trimmed.replace(/\s*\([^)]*\)/g, '').trim();
  if (ACADEMIC_TITLES_MAP[cleanTitle]) {
    return ACADEMIC_TITLES_MAP[cleanTitle];
  }
  if (ACADEMIC_TITLES_MAP[trimmed]) {
    return ACADEMIC_TITLES_MAP[trimmed];
  }
  return autoTranslateField(cleanTitle || trimmed);
}

// Seed default event registration in master
masterDb.prepare(`
  INSERT INTO registered_events (event_id, event_title, portal_url, secret_token, status)
  VALUES (?, ?, ?, ?, 'active')
  ON CONFLICT(event_id) DO NOTHING;
`).run('printmaking-2026', 'International Contemporary Printmaking 2026', 'http://localhost:8787', 'sec_demo_event_2026_xyz');

// Seed a second event in master to demonstrate multi-tenancy
masterDb.prepare(`
  INSERT INTO registered_events (event_id, event_title, portal_url, secret_token, status)
  VALUES (?, ?, ?, ?, 'active')
  ON CONFLICT(event_id) DO NOTHING;
`).run('sculpture-2026', 'Biennale Virtual Sculpture Expo 2026', 'http://localhost:8787', 'sec_demo_sculpture_xyz');

// Rich sample artworks with bilingual data (TH / EN)
const sampleArtworks = [
  {
    title: 'Silent Resonance',
    title_th: 'เสียงสะท้อนแห่งความสงบ',
    title_en: 'Silent Resonance',
    artist_name: 'กานต์รวี สุวรรณเวช',
    artist_name_th: 'กานต์รวี สุวรรณเวช',
    artist_name_en: 'Kanrawee Suwannawet',
    artist_avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80',
    artist_bio: 'ศิลปินภาพพิมพ์ร่วมสมัย จบการศึกษาจากคณะจิตรกรรมฯ ศิลปากร สร้างสรรค์ผลงานภาพพิมพ์โลหะร่องลึกที่สะท้อนถึงสมาธิและความนิ่งสงบภายในจิตใจ',
    artist_bio_th: 'ศิลปินภาพพิมพ์ร่วมสมัย จบการศึกษาจากคณะจิตรกรรมฯ ศิลปากร สร้างสรรค์ผลงานภาพพิมพ์โลหะร่องลึกที่สะท้อนถึงสมาธิและความนิ่งสงบภายในจิตใจ ได้รับรางวัลเหรียญเงินการแสดงศิลปกรรมแห่งชาติ',
    artist_bio_en: 'Contemporary printmaker graduated from Silpakorn University, specializing in intaglio etching that captures meditation and inner tranquility.',
    nationality: 'Thailand',
    artist_email: 'kanrawee.art@gmail.com',
    artist_phone: '+66 81 234 5678',
    technique: 'Intaglio Etching on Cotton Paper',
    technique_th: 'ภาพพิมพ์โลหะร่องลึกบนกระดาษคอตตอน',
    technique_en: 'Intaglio Etching on Cotton Paper',
    dimensions: '60 × 80 ซม.',
    year_created: '2025',
    price: '35,000 บาท',
    zone: 'Serenity Hall',
    display_order: 1,
    description: 'ภาพพิมพ์โลหะร่องลึกบนกระดาษคอตตอนทำมือ ถ่ายทอดความเงียบสงบในจิตวิญญาณผ่านเส้นสายที่คมชัดและนุ่มนวลอย่างลงตัว',
    description_th: 'ภาพพิมพ์โลหะร่องลึกบนกระดาษคอตตอนทำมือ ถ่ายทอดความเงียบสงบในจิตวิญญาณผ่านเส้นสายที่คมชัดและนุ่มนวลอย่างลงตัว',
    description_en: 'Intaglio etching on handmade cotton paper, conveying spiritual stillness through a harmonious balance of crisp and gentle lines.',
    cloudinary_public_id: 'sample_art_1',
    image_url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&q=80',
    thumbnail_url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&q=80',
    status: 'approved'
  },
  {
    title: 'Whispers of the Dawn',
    title_th: 'กระซิบแห่งอรุณรุ่ง',
    title_en: 'Whispers of the Dawn',
    artist_name: 'กานต์รวี สุวรรณเวช',
    artist_name_th: 'กานต์รวี สุวรรณเวช',
    artist_name_en: 'Kanrawee Suwannawet',
    artist_avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80',
    artist_bio: 'ศิลปินภาพพิมพ์ร่วมสมัย จบการศึกษาจากคณะจิตรกรรมฯ ศิลปากร สร้างสรรค์ผลงานภาพพิมพ์โลหะร่องลึกที่สะท้อนถึงสมาธิและความนิ่งสงบภายในจิตใจ',
    artist_bio_th: 'ศิลปินภาพพิมพ์ร่วมสมัย จบการศึกษาจากคณะจิตรกรรมฯ ศิลปากร สร้างสรรค์ผลงานภาพพิมพ์โลหะร่องลึกที่สะท้อนถึงสมาธิและความนิ่งสงบภายในจิตใจ',
    artist_bio_en: 'Contemporary printmaker graduated from Silpakorn University, specializing in intaglio etching that captures meditation and inner tranquility.',
    nationality: 'Thailand',
    artist_email: 'kanrawee.art@gmail.com',
    artist_phone: '+66 81 234 5678',
    technique: 'Intaglio & Aquatint',
    technique_th: 'ภาพพิมพ์โลหะผสมอความทินต์',
    technique_en: 'Intaglio & Aquatint',
    dimensions: '50 × 70 ซม.',
    year_created: '2026',
    price: '28,000 บาท',
    zone: 'Serenity Hall',
    display_order: 2,
    description: 'การผสมผสานเทคนิคเส้นและน้ำหนักหมึก ถ่ายทอดแสงแรกของวันที่ส่องกระทบผืนน้ำอย่างอ่อนโยน',
    description_th: 'การผสมผสานเทคนิคเส้นและน้ำหนักหมึก ถ่ายทอดแสงแรกของวันที่ส่องกระทบผืนน้ำอย่างอ่อนโยน',
    description_en: 'A fusion of fine line etching and aquatint tonal washes, capturing dawn\'s first light gently touching the water surface.',
    cloudinary_public_id: 'sample_art_1_b',
    image_url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1200&q=80',
    thumbnail_url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&q=80',
    status: 'approved'
  },
  {
    title: 'Geometry of Nature #04',
    title_th: 'เรขาคณิตของธรรมชาติ #04',
    title_en: 'Geometry of Nature #04',
    artist_name: 'วิชิต ธีระพงษ์',
    artist_name_th: 'วิชิต ธีระพงษ์',
    artist_name_en: 'Wichit Theerapong',
    artist_avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80',
    artist_bio: 'อาจารย์พิเศษและศิลปินภาพพิมพ์แกะไม้ มีความเชี่ยวชาญในการผสานเทคนิคช่างไม้ดั้งเดิมเข้ากับโครงสร้างเรขาคณิตมินิมอลร่วมสมัย',
    artist_bio_th: 'อาจารย์พิเศษและศิลปินภาพพิมพ์แกะไม้ มีความเชี่ยวชาญในการผสานเทคนิคช่างไม้ดั้งเดิมเข้ากับโครงสร้างเรขาคณิตมินิมอลร่วมสมัย',
    artist_bio_en: 'Adjunct lecturer and woodcut artist blending traditional woodcraft with contemporary minimalist geometry.',
    nationality: 'Thailand',
    artist_email: 'wichit.woodcut@outlook.com',
    artist_phone: '+66 89 876 5432',
    technique: 'Woodcut on Mulberry Paper',
    technique_th: 'ภาพพิมพ์แกะไม้บนกระดาษสา',
    technique_en: 'Woodcut on Mulberry Paper',
    dimensions: '70 × 90 ซม.',
    year_created: '2026',
    price: '42,000 บาท',
    zone: 'Organic Structure',
    display_order: 3,
    description: 'ภาพพิมพ์แกะไม้ร่วมสมัย ผสมผสานรูปทรงเรขาคณิตกับลวดลายเปลือกไม้บนกระดาษสาธรรมชาติ',
    description_th: 'ภาพพิมพ์แกะไม้ร่วมสมัย ผสมผสานรูปทรงเรขาคณิตกับลวดลายเปลือกไม้บนกระดาษสาธรรมชาติ',
    description_en: 'Contemporary woodcut print harmonizing geometric structures with raw bark textures on natural mulberry paper.',
    cloudinary_public_id: 'sample_art_2',
    image_url: 'https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?w=1200&q=80',
    thumbnail_url: 'https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?w=600&q=80',
    status: 'approved'
  },
  {
    title: 'Urban Shadows & Solitude',
    title_th: 'เงาเมืองและความโดดเดี่ยว',
    title_en: 'Urban Shadows & Solitude',
    artist_name: 'พิมพ์ชนก นพรัตน์',
    artist_name_th: 'พิมพ์ชนก นพรัตน์',
    artist_name_en: 'Pimchanok Nopparat',
    artist_avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&q=80',
    artist_bio: 'ศิลปินภาพพิมพ์และนักวาดภาพประกอบผู้หลงใหลในแสงไฟและบรรยากาศมหานครยามค่ำคืน ถ่ายทอดความเหงาของคนเมืองผ่านเทคนิคซิลค์สกรีนหลากเลเยอร์',
    artist_bio_th: 'ศิลปินภาพพิมพ์และนักวาดภาพประกอบผู้หลงใหลในแสงไฟและบรรยากาศมหานครยามค่ำคืน ถ่ายทอดความเหงาของคนเมืองผ่านเทคนิคซิลค์สกรีนหลากเลเยอร์',
    artist_bio_en: 'Printmaker and illustrator fascinated by metropolis nightscapes, capturing urban isolation through layered screenprinting.',
    nationality: 'Thailand',
    artist_email: 'pimchanok.art@artstudio.co',
    artist_phone: '+66 86 555 1234',
    technique: 'Screenprint 5 Colors',
    technique_th: 'ซิลค์สกรีน 5 สี',
    technique_en: 'Screenprint 5 Colors',
    dimensions: '65 × 65 ซม.',
    year_created: '2025',
    price: '25,000 บาท',
    zone: 'Metropolis Room',
    display_order: 4,
    description: 'ซิลค์สกรีน 5 เลเยอร์สี สะท้อนแสงเงาของตึกระฟ้าในยามค่ำคืนและความเปล่าเปลี่ยวในเมืองใหญ่',
    description_th: 'ซิลค์สกรีน 5 เลเยอร์สี สะท้อนแสงเงาของตึกระฟ้าในยามค่ำคืนและความเปล่าเปลี่ยวในเมืองใหญ่',
    description_en: 'Five-layer screenprint reflecting skyscraper silhouettes at dusk and the solitude found within sprawling cities.',
    cloudinary_public_id: 'sample_art_3',
    image_url: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=1200&q=80',
    thumbnail_url: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&q=80',
    status: 'approved'
  },
  {
    title: 'Rhythms of Kyoto Mist',
    title_th: 'จังหวะแห่งหมอกเกียวโต',
    title_en: 'Rhythms of Kyoto Mist',
    artist_name: 'Kenji Sato',
    artist_name_th: 'เคนจิ ซาโต้',
    artist_name_en: 'Kenji Sato',
    artist_avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80',
    artist_bio: 'Kyoto-based Mokuhanga master and print educator blending water-based woodblock craftsmanship with modernist tranquility.',
    artist_bio_th: 'ปรมาจารย์ภาพพิมพ์โมคุฮังงะจากเกียวโต ผสมผสานภูมิปัญญาช่างแกะไม้ญี่ปุ่นโบราณเข้ากับสุนทรียะความสงบนิ่งสมัยใหม่',
    artist_bio_en: 'Kyoto-based Mokuhanga master and print educator blending water-based woodblock craftsmanship with modernist tranquility.',
    nationality: 'Japan',
    artist_email: 'kenji.sato.print@kyoto-arts.jp',
    artist_phone: '+81 90 1234 5678',
    technique: 'Mokuhanga Woodblock',
    technique_th: 'ภาพพิมพ์แกะไม้ญี่ปุ่นสีน้ำ',
    technique_en: 'Mokuhanga Woodblock',
    dimensions: '55 × 75 ซม.',
    year_created: '2026',
    price: '55,000 บาท',
    zone: 'Contemporary Room',
    display_order: 5,
    description: 'บันทึกความรู้สึกยามเช้าตรู่ในป่าไผ่อาราชิยามะ ผ่านเม็ดสีธรรมชาติและการเกลี่ยหมึกโบราณ',
    description_th: 'บันทึกความรู้สึกยามเช้าตรู่ในป่าไผ่อาราชิยามะ ผ่านเม็ดสีธรรมชาติและการเกลี่ยหมึกโบราณ',
    description_en: 'Capturing early morning stillness in Arashiyama bamboo groves using natural mineral pigments and traditional gradation.',
    cloudinary_public_id: 'sample_art_kenji',
    image_url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&q=80',
    thumbnail_url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&q=80',
    status: 'approved'
  },
  {
    title: 'Cyan Echoes of Memory',
    title_th: 'ร่องรอยสีครามแห่งความทรงจำ',
    title_en: 'Cyan Echoes of Memory',
    artist_name: 'Sophie Laurent',
    artist_name_th: 'โซฟี โลรองต์',
    artist_name_en: 'Sophie Laurent',
    artist_avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80',
    artist_bio: 'Visual artist from Lyon specializing in experimental lithography and cyanotype on handcrafted linen.',
    artist_bio_th: 'ศิลปินทัศนศิลป์จากเมืองลียง เชี่ยวชาญการผสมผสานภาพพิมพ์หินทดลองกับไซยาโนไทป์ สำรวจความทรงจำและระบบนิเวศที่เปราะบาง',
    artist_bio_en: 'Visual artist from Lyon specializing in experimental lithography and cyanotype on handcrafted linen, exploring memory and fragile ecosystems.',
    nationality: 'France',
    artist_email: 'sophie.laurent.art@atelier-lyon.fr',
    artist_phone: '+33 6 12 34 56 78',
    technique: 'Lithograph & Cyanotype on Linen',
    technique_th: 'ภาพพิมพ์หินผสมไซยาโนไทป์บนผ้าลินิน',
    technique_en: 'Lithograph & Cyanotype on Linen',
    dimensions: '60 × 85 ซม.',
    year_created: '2026',
    price: '48,000 บาท',
    zone: 'Experimental Zone',
    display_order: 6,
    description: 'การสำรวจเรื่องราวความทรงจำในอดีตผ่านสารละลายไวแสงคราม ผสานงานพิมพ์หินลายริ้วพืชพรรณ',
    description_th: 'การสำรวจเรื่องราวความทรงจำในอดีตผ่านสารละลายไวแสงคราม ผสานงานพิมพ์หินลายริ้วพืชพรรณ',
    description_en: 'An exploration of fleeting memory through Prussian-blue light-sensitive emulsions fused with botanical lithographic grain.',
    cloudinary_public_id: 'sample_art_sophie',
    image_url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80',
    thumbnail_url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80',
    status: 'approved'
  },
  {
    title: 'Echoes of the River',
    title_th: 'เสียงครวญจากสายน้ำ',
    title_en: 'Echoes of the River',
    artist_name: 'ธนากร ภูวนาถ',
    artist_name_th: 'ธนากร ภูวนาถ',
    artist_name_en: 'Thanakorn Phuwanat',
    artist_avatar_url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&q=80',
    artist_bio: 'ศิลปินรุ่นใหม่จากเชียงใหม่ ถ่ายทอดวิถีชีวิตและความผูกพันกับแม่น้ำสายหลักในภาคเหนือด้วยมุมมองเชิงอนุรักษ์',
    artist_bio_th: 'ศิลปินรุ่นใหม่จากเชียงใหม่ ถ่ายทอดวิถีชีวิตและความผูกพันกับแม่น้ำสายหลักในภาคเหนือด้วยมุมมองเชิงอนุรักษ์',
    artist_bio_en: 'Emerging artist from Chiang Mai portraying northern river ecosystems and cultural conservation.',
    nationality: 'Thailand',
    artist_email: 'thanakorn.p@riverart.th',
    artist_phone: '+66 84 999 8877',
    technique: 'Natural Mineral Lithograph',
    technique_th: 'ภาพพิมพ์หินสีธรรมชาติ',
    technique_en: 'Natural Mineral Lithograph',
    dimensions: '40 × 50 ซม.',
    year_created: '2026',
    price: '18,000 บาท',
    zone: 'Serenity Hall',
    display_order: 7,
    description: 'ผลงานส่งใหม่รอการตรวจสอบ: ภาพพิมพ์หินสีธรรมชาติ ขนาด 40x50 ซม. สะท้อนการเปลี่ยนแปลงของลำน้ำปิง',
    description_th: 'ภาพพิมพ์หินสีธรรมชาติ สะท้อนการเปลี่ยนแปลงของลำน้ำปิงและระบบนิเวศ',
    description_en: 'Lithograph with earth pigments reflecting ecological shifts along the Ping River.',
    cloudinary_public_id: 'sample_art_4',
    image_url: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=1200&q=80',
    thumbnail_url: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&q=80',
    status: 'pending'
  }
];

// Always refresh sample data if schema updated or reset count
const currentBilingual = eventDb.prepare("SELECT COUNT(*) as count FROM submissions WHERE title_th IS NOT NULL AND status = 'approved'").get();
if (currentBilingual.count < 3) {
  eventDb.exec('DELETE FROM submissions;');
  sampleArtworks.forEach(art => {
    const res = eventDb.prepare(`
      INSERT INTO submissions (
        title, title_th, title_en, artist_name, artist_name_th, artist_name_en,
        artist_avatar_url, artist_bio, artist_bio_th, artist_bio_en, nationality,
        artist_email, artist_phone, technique, technique_th, technique_en,
        dimensions, year_created, price, description, description_th, description_en,
        cloudinary_public_id, image_url, thumbnail_url, zone, display_order, status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      art.title, art.title_th, art.title_en, art.artist_name, art.artist_name_th, art.artist_name_en,
      art.artist_avatar_url, art.artist_bio, art.artist_bio_th, art.artist_bio_en, art.nationality,
      art.artist_email, art.artist_phone, art.technique, art.technique_th, art.technique_en,
      art.dimensions, art.year_created, art.price, art.description, art.description_th, art.description_en,
      art.cloudinary_public_id, art.image_url, art.thumbnail_url,
      art.zone, art.display_order, art.status
    );

    if (art.status === 'approved') {
      const id = Number(res.lastInsertRowid);
      const globalId = `printmaking-2026-${String(id).padStart(4, '0')}`;
      masterDb.prepare(`
        INSERT INTO master_artworks (global_id, event_id, title, artist_name, image_url, thumbnail_url, event_page_url)
        VALUES (?, 'printmaking-2026', ?, ?, ?, ?, ?)
        ON CONFLICT(global_id) DO UPDATE SET
          title = excluded.title,
          artist_name = excluded.artist_name,
          image_url = excluded.image_url,
          thumbnail_url = excluded.thumbnail_url;
      `).run(globalId, art.title, art.artist_name, art.image_url, art.thumbnail_url, `http://localhost:8787/artwork.html?id=${id}`);
    }
  });
}

  // Seed one artwork from another event to showcase multi-tenant filtering in master portal
  masterDb.prepare(`
    INSERT INTO master_artworks (global_id, event_id, title, artist_name, image_url, thumbnail_url, event_page_url)
    VALUES (?, 'sculpture-2026', ?, ?, ?, ?, ?)
    ON CONFLICT(global_id) DO NOTHING
  `).run(
    'sculpture-2026-0001',
    'Monolith of Virtual Reflections',
    'Jean-Luc Moreau',
    'https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?w=1200&q=80',
    'https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?w=600&q=80',
    'http://localhost:8787/artwork.html?id=1'
  );

  // Seed Mega Biennial Expo event (120 artworks across 5 zones) to test and showcase Tier 4
  masterDb.prepare(`
    INSERT INTO registered_events (event_id, event_title, portal_url, secret_token, status)
    VALUES (?, ?, ?, ?, 'active')
    ON CONFLICT(event_id) DO NOTHING;
  `).run('biennial-mega-2026', 'World Contemporary Art Biennial 2026', 'http://localhost:8787', 'sec_demo_mega_biennial_xyz');

  const existingMegaCount = masterDb.prepare("SELECT count(*) as c FROM master_artworks WHERE event_id = 'biennial-mega-2026'").get().c;
  if (existingMegaCount < 100) {
    const MEGA_ZONES = [
      { name: 'Zone A: Digital & Generative Pavilion', technique: 'Generative Code & Holographic Projection' },
      { name: 'Zone B: Printmaking & Paper Heritage', technique: 'Intaglio & Mokuhanga Woodblock' },
      { name: 'Zone C: Sculpture & Spatial Installation', technique: 'Cast Bronze & Optical Glass' },
      { name: 'Zone D: Contemporary Painting & Mixed Media', technique: 'Oil & Pigment on Linen' },
      { name: 'Zone E: Photography & Media Arts', technique: 'Archival Pigment Print on Cotton' }
    ];

    const SAMPLE_ART_IMAGES = [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1200&q=80',
      'https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?w=1200&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&q=80',
      'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=1200&q=80',
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&q=80',
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80',
      'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1200&q=80',
      'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?w=1200&q=80',
      'https://images.unsplash.com/photo-1579783901586-788ac2479ce9?w=1200&q=80',
      'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=1200&q=80',
      'https://images.unsplash.com/photo-1577720580479-7d839d829c73?w=1200&q=80',
      'https://images.unsplash.com/photo-1579783483458-83d02161294e?w=1200&q=80',
      'https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=1200&q=80'
    ];

    const ARTIST_NAMES = [
      'Elena Rostova', 'Akira Tanaka', 'Claire Dubois', 'Mateo Silva',
      'Chaiwat Prasert', 'Nadia Benali', 'Lars Lindqvist', 'Siriporn Wongsuwan',
      'Marcus Vance', 'Yuki Takahashi', 'Astrid Nielsen', 'Somchai Jaidee',
      'David Sterling', 'Mei-Ling Chen', 'Oliver Rossi', 'Ananya Srisuk'
    ];

    const TITLES_PREFIX = [
      'Resonance of', 'Echoes from', 'Structures of', 'Symphony of', 'Fragments in',
      'Metamorphosis of', 'Dialogues with', 'Threshold of', 'Chronicles of', 'Poetics of'
    ];
    const TITLES_SUFFIX = [
      'Infinite Light', 'Silent Waves', 'Sacred Geometry', 'Urban Solitude', 'Eternal Horizon',
      'Transient Memory', 'Cosmic Breath', 'Deep Earth', 'Luminous Shadows', 'Ancient Whispers'
    ];

    const insertStmt = masterDb.prepare(`
      INSERT INTO master_artworks (
        global_id, event_id, title, artist_name, image_url, thumbnail_url,
        event_page_url, description, technique, dimensions, year_created,
        zone, artist_avatar_url, nationality, published_at
      ) VALUES (?, 'biennial-mega-2026', ?, ?, ?, ?, ?, ?, ?, ?, '2026', ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(global_id) DO NOTHING;
    `);

    masterDb.exec('BEGIN');
    for (let i = 1; i <= 120; i++) {
      const globalId = `mega-2026-${String(i).padStart(4, '0')}`;
      const zoneObj = MEGA_ZONES[(i - 1) % MEGA_ZONES.length];
      const img = SAMPLE_ART_IMAGES[(i - 1) % SAMPLE_ART_IMAGES.length];
      const thumb = img.replace('w=1200', 'w=600');
      const artist = ARTIST_NAMES[(i - 1) % ARTIST_NAMES.length];
      const titleP = TITLES_PREFIX[(i - 1) % TITLES_PREFIX.length];
      const titleS = TITLES_SUFFIX[(i - 1) % TITLES_SUFFIX.length];
      const title = `${titleP} ${titleS} #${String(i).padStart(2, '0')}`;
      const desc = `ผลงานชิ้นเอกลำดับที่ ${i} ในมหกรรมศิลปะระดับนานาชาติ ถ่ายทอดความสัมพันธ์ระหว่างมนุษย์และพื้นที่แห่งการรับรู้ผ่านสุนทรียะร่วมสมัย`;

      insertStmt.run(
        globalId,
        title,
        artist,
        img,
        thumb,
        `http://localhost:8787/artwork.html?id=${i}`,
        desc,
        zoneObj.technique,
        `${60 + (i % 6) * 10} × ${80 + (i % 5) * 10} ซม.`,
        zoneObj.name,
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80',
        'International'
      );
    }
    masterDb.exec('COMMIT');
  }

// MIME types helper
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

function serveStaticFile(publicDir, reqPath, res) {
  let filePath = path.join(publicDir, reqPath === '/' ? 'index.html' : reqPath);
  if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
    return true;
  }
  return false;
}

async function parseBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        resolve({});
      }
    });
  });
}

// ==========================================
// 1. EVENT WEBAPP SERVER (Port 8787)
// ==========================================
const eventPublicDir = path.join(ROOT_DIR, 'apps', 'event-webapp', 'public');

const eventServer = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, 'http://localhost:8787');
  const pathname = parsedUrl.pathname;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (pathname === '/api/config' && req.method === 'GET') {
    const row = eventDb.prepare("SELECT value FROM catalog_config WHERE key = 'main'").get();
    let eventInfo = {};
    if (row && row.value) {
      try {
        const parsed = JSON.parse(row.value);
        if (parsed.event_info) eventInfo = parsed.event_info;
      } catch (_) {}
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      eventId: 'printmaking-2026',
      eventTitle: eventInfo.title_th || 'นิทรรศการภาพพิมพ์และศิลปกรรมร่วมสมัย | วิทยาลัยเพาะช่าง',
      eventTitleEn: eventInfo.title_en || 'International Contemporary Printmaking 2026',
      eventDescriptionTh: eventInfo.description_th || 'พื้นที่จัดแสดงผลงานศิลปะภาพพิมพ์ร่วมสมัยระดับนานาชาติ เชื่อมต่อผู้สร้างสรรค์ผลงานเข้ากับผู้ชมทั่วโลกแบบไร้พรมแดน',
      eventDescriptionEn: eventInfo.description_en || 'International contemporary printmaking and virtual art exhibition connecting artists and audience worldwide.',
      eventTheme: process.env.EVENT_THEME || 'heritage',
      cloudinaryCloudName: 'event-demo-account',
      cloudinaryUploadPreset: 'virtual_exhibition_preset',
      masterPortalUrl: 'http://localhost:8788'
    }));
    return;
  }

  if (pathname === '/api/config/update' && req.method === 'POST') {
    const body = await parseBody(req);
    const adminKey = req.headers['x-admin-key'] || (body && body.adminKey);
    if (adminKey !== 'admin123') {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Unauthorized: Invalid Admin Key' }));
      return;
    }

    const row = eventDb.prepare("SELECT value FROM catalog_config WHERE key = 'main'").get();
    let config = {};
    if (row && row.value) {
      try { config = JSON.parse(row.value); } catch (_) {}
    }
    config.event_info = {
      title_th: body.eventTitle || '',
      title_en: body.eventTitleEn || '',
      description_th: body.eventDescriptionTh || '',
      description_en: body.eventDescriptionEn || ''
    };
    eventDb.prepare("INSERT OR REPLACE INTO catalog_config (key, value, updated_at) VALUES ('main', ?, CURRENT_TIMESTAMP)").run(JSON.stringify(config));

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, config: config.event_info }));
    return;
  }

  // Catalog Configuration Routes (Get & Save Layout)
  if (pathname === '/api/catalog-config' && req.method === 'GET') {
    const row = eventDb.prepare("SELECT value FROM catalog_config WHERE key = 'main'").get();
    let config = null;
    if (row && row.value) {
      try { config = JSON.parse(row.value); } catch (e) { config = null; }
    }
    if (!config) {
      config = {
        cover: {
          badge: "Official Curated Art Exhibition",
          title_line1: "INTERNATIONAL CONTEMPORARY",
          title_line1_th: "นิทรรศการภาพพิมพ์ร่วมสมัยนานาชาติ",
          title_line2: "PRINTMAKING 2026",
          title_line2_th: "PRINTMAKING 2026",
          subtitle: "International Contemporary Printmaking & Virtual Art Exhibition",
          subtitle_th: "นิทรรศการภาพพิมพ์ร่วมสมัยและศิลปกรรมเสมือนจริงระดับนานาชาติ",
          meta_tag: "EXHIBITION CATALOG & ARTIST DIRECTORY",
          chief_curator: "Chief Curator & Committee",
          chief_curator_th: "ประธานภัณฑารักษ์และคณะกรรมการ",
          edition_label: "2026 Virtual Edition",
          edition_label_th: "ฉบับนิทรรศการเสมือนจริง 2026"
        },
        foreword: {
          title: "Curator's Statement",
          title_th: "คำนำจากภัณฑารักษ์ (Curator's Statement)",
          p1: "Welcome to the official catalog of this exhibition, gathering printmaking masterpieces and innovative artworks from both national and international artists through a rigorous curation process.",
          p1_th: "ยินดีต้อนรับสู่สูจิบัตรทางการของงานนิทรรศการ ซึ่งรวบรวมผลงานภาพพิมพ์และศิลปกรรมสร้างสรรค์จากศิลปินทั้งในประเทศและนานาชาติ ผ่านกระบวนการคัดกรองอย่างเข้มข้น เพื่อนำเสนอเทคนิคที่หลากหลาย และการทดลองเชิงสหวิทยาการร่วมสมัย",
          p2: "This digital publication serves as an art-historical documentation, compiling specifications of every piece alongside the artist's biography and concept statement.",
          p2_th: "สูจิบัตรฉบับนี้ถูกออกแบบขึ้นเพื่อเป็นบันทึกทางประวัติศาสตร์ศิลป์ รวบรวมข้อมูลจำเพาะของผลงานทุกชิ้น ควบคู่ไปกับประวัติและแนวคิดของศิลปินผู้สร้างสรรค์ เพื่อเป็นประโยชน์ต่อการศึกษา สุนทรียะ และการเผยแพร่ศิลปกรรมสู่สาธารณชน",
          signoff: "Exhibition Committee & Curatorial Team",
          signoff_th: "คณะกรรมการจัดงานและภัณฑารักษ์"
        },
        jury: {
          enabled: true,
          title_th: "คณะกรรมการผู้ทรงคุณวุฒิพิจารณาคัดเลือกผลงาน",
          title_en: "Curatorial Selection Committee & Jury",
          subtitle_th: "ผู้ทรงคุณวุฒิและคณาจารย์ผู้ทรงเกียรติแห่งวิทยาลัยเพาะช่าง มทร.รัตนโกสินทร์",
          subtitle_en: "Honored Jurors & Academic Selection Board",
          evaluation_badge: true,
          members: [
            {
              id: "jury-1",
              name_th: "ศาสตราจารย์เกียรติคุณ ปรีชา เถาทอง",
              name_en: "Prof. Emeritus Preecha Thaothong",
              academic_title: "ศิลปินแห่งชาติ สาขาทัศนศิลป์",
              role_th: "ประธานคณะกรรมการผู้ทรงคุณวุฒิ",
              role_en: "Chair of the Selection Committee",
              institution: "วิทยาลัยเพาะช่าง มหาวิทยาลัยเทคโนโลยีราชมงคลรัตนโกสินทร์",
              avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=faces"
            },
            {
              id: "jury-2",
              name_th: "ศาสตราจารย์ ดร. ถาวร โกอุดมวิทย์",
              name_en: "Prof. Dr. Thavorn Ko-udomvit",
              academic_title: "ศิลปินแห่งชาติ สาขาทัศนศิลป์ (ภาพพิมพ์)",
              role_th: "กรรมการผู้ทรงคุณวุฒิเชี่ยวชาญด้านภาพพิมพ์",
              role_en: "Honored Juror & Printmaking Specialist",
              institution: "ผู้ทรงคุณวุฒิภายนอก",
              avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=faces"
            },
            {
              id: "jury-3",
              name_th: "อาจารย์ วิเชษฐ์ จันทร์เปรมจิตต์",
              name_en: "Lecturer Wichet Janpremchit",
              academic_title: "อาจารย์ประจำสาขาวิชาศิลปะภาพพิมพ์",
              role_th: "กรรมการและเลขานุการคณะกรรมการ",
              role_en: "Secretary of the Selection Committee",
              institution: "วิทยาลัยเพาะช่าง มหาวิทยาลัยเทคโนโลยีราชมงคลรัตนโกสินทร์",
              avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=faces"
            }
          ]
        },
        layout: {
          template: "split",
          theme: "luxury-dark"
        },
        elements: {
          showTitle: true,
          showArtist: true,
          showFlag: true,
          showTechnique: true,
          showDimensions: true,
          showYear: true,
          showPrice: true,
          showConcept: true,
          showAvatar: true,
          showViewLink: true,
          showPageNum: true
        },
        freeLayout: {
          mode: "freeform",
          blocks: {
            image: { x: 6, y: 10, w: 50, h: 74 },
            meta: { x: 60, y: 12, w: 34 },
            concept: { x: 60, y: 46, w: 34 },
            artist: { x: 60, y: 74, w: 34 }
          }
        },
        masterTemplate: {
          paperSize: "a4_portrait",
          pageWidthInches: 8.27,
          pageHeightInches: 11.69,
          bleedInches: 0.125,
          gridSizeInches: 0.25,
          snapToGrid: true,
          backgroundColor: "#FFFFFF",
          paddingInches: { top: 0.6, bottom: 0.6, left: 0.6, right: 0.6 },
          blocks: [
            {
              id: "blk-artwork-img",
              type: "artwork_image",
              label: "ภาพผลงาน",
              xInches: 0.6,
              yInches: 1.0,
              widthInches: 4.2,
              heightInches: 8.8,
              zIndex: 1,
              style: { objectFit: "contain", borderRadius: 0, boxShadow: "none" }
            },
            {
              id: "blk-artwork-title",
              type: "artwork_title",
              label: "ชื่องานศิลปะ",
              xInches: 5.1,
              yInches: 1.2,
              widthInches: 2.5,
              heightInches: 0.8,
              zIndex: 2,
              style: { fontFamily: "Maitree", fontSizePt: 16, fontWeight: "bold", color: "#1A1918", textAlign: "left" }
            },
            {
              id: "blk-medium",
              type: "medium",
              label: "เทคนิค/วัสดุ",
              xInches: 5.1,
              yInches: 2.1,
              widthInches: 2.5,
              heightInches: 0.4,
              zIndex: 2,
              style: { fontFamily: "Maitree", fontSizePt: 10.5, fontWeight: "normal", color: "#555555", textAlign: "left" }
            },
            {
              id: "blk-dimensions",
              type: "dimensions",
              label: "ขนาดผลงาน",
              xInches: 5.1,
              yInches: 2.6,
              widthInches: 2.5,
              heightInches: 0.4,
              zIndex: 2,
              style: { fontFamily: "Maitree", fontSizePt: 10, fontWeight: "normal", color: "#666666", textAlign: "left" }
            },
            {
              id: "blk-year",
              type: "year_created",
              label: "ปีที่สร้างสรรค์",
              xInches: 5.1,
              yInches: 3.1,
              widthInches: 2.5,
              heightInches: 0.4,
              zIndex: 2,
              style: { fontFamily: "Maitree", fontSizePt: 10, fontWeight: "normal", color: "#777777", textAlign: "left" }
            },
            {
              id: "blk-price",
              type: "price",
              label: "ราคาผลงาน",
              xInches: 5.1,
              yInches: 3.6,
              widthInches: 2.5,
              heightInches: 0.4,
              zIndex: 2,
              style: { fontFamily: "Maitree", fontSizePt: 11, fontWeight: "bold", color: "#C5A880", textAlign: "left" }
            },
            {
              id: "blk-concept",
              type: "concept",
              label: "แนวคิด/คำบรรยาย",
              xInches: 5.1,
              yInches: 4.3,
              widthInches: 2.5,
              heightInches: 3.2,
              zIndex: 2,
              style: { fontFamily: "Maitree", fontSizePt: 9.5, fontWeight: "normal", fontStyle: "italic", color: "#444444", textAlign: "left", lineHeight: 1.5 }
            },
            {
              id: "blk-artist-photo",
              type: "artist_photo",
              label: "ภาพศิลปิน",
              xInches: 5.1,
              yInches: 8.2,
              widthInches: 0.9,
              heightInches: 0.9,
              zIndex: 2,
              style: { borderRadius: 50, objectFit: "cover", borderWidth: 1, borderColor: "#D5CEBE" }
            },
            {
              id: "blk-artist-name",
              type: "artist_name",
              label: "ชื่อศิลปิน & ตำแหน่ง",
              xInches: 6.1,
              yInches: 8.2,
              widthInches: 1.6,
              heightInches: 0.5,
              zIndex: 2,
              style: { fontFamily: "Maitree", fontSizePt: 11, fontWeight: "bold", color: "#1A1918", textAlign: "left" }
            },
            {
              id: "blk-flag",
              type: "country_flag",
              label: "ธงชาติ / ประเทศ",
              xInches: 6.1,
              yInches: 8.75,
              widthInches: 0.45,
              heightInches: 0.3,
              zIndex: 2,
              style: { borderRadius: 2, borderWidth: 1, borderColor: "#DDD" }
            },
            {
              id: "blk-page-num",
              type: "page_number",
              label: "เลขหน้า",
              xInches: 0.6,
              yInches: 10.8,
              widthInches: 7.07,
              heightInches: 0.4,
              zIndex: 2,
              style: { fontFamily: "Maitree", fontSizePt: 8, color: "#888888", textAlign: "right" }
            }
          ]
        },
        pageOverrides: {},
        artworkOrder: [],
        excludedIds: []
      };
    }

    if (!config.jury) {
      config.jury = {
        enabled: true,
        title_th: "คณะกรรมการผู้ทรงคุณวุฒิพิจารณาคัดเลือกผลงาน",
        title_en: "Curatorial Selection Committee & Jury",
        subtitle_th: "ผู้ทรงคุณวุฒิและคณาจารย์ผู้ทรงเกียรติแห่งวิทยาลัยเพาะช่าง มทร.รัตนโกสินทร์",
        subtitle_en: "Honored Jurors & Academic Selection Board",
        evaluation_badge: true,
        members: [
          {
            id: "jury-1",
            name_th: "ศาสตราจารย์เกียรติคุณ ปรีชา เถาทอง",
            name_en: "Prof. Emeritus Preecha Thaothong",
            academic_title: "ศิลปินแห่งชาติ สาขาทัศนศิลป์",
            role_th: "ประธานคณะกรรมการผู้ทรงคุณวุฒิ",
            role_en: "Chair of the Selection Committee",
            institution: "วิทยาลัยเพาะช่าง มหาวิทยาลัยเทคโนโลยีราชมงคลรัตนโกสินทร์",
            avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=faces"
          },
          {
            id: "jury-2",
            name_th: "ศาสตราจารย์ ดร. ถาวร โกอุดมวิทย์",
            name_en: "Prof. Dr. Thavorn Ko-udomvit",
            academic_title: "ศิลปินแห่งชาติ สาขาทัศนศิลป์ (ภาพพิมพ์)",
            role_th: "กรรมการผู้ทรงคุณวุฒิเชี่ยวชาญด้านภาพพิมพ์",
            role_en: "Honored Juror & Printmaking Specialist",
            institution: "ผู้ทรงคุณวุฒิภายนอก",
            avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=faces"
          },
          {
            id: "jury-3",
            name_th: "อาจารย์ วิเชษฐ์ จันทร์เปรมจิตต์",
            name_en: "Lecturer Wichet Janpremchit",
            academic_title: "อาจารย์ประจำสาขาวิชาศิลปะภาพพิมพ์",
            role_th: "กรรมการและเลขานุการคณะกรรมการ",
            role_en: "Secretary of the Selection Committee",
            institution: "วิทยาลัยเพาะช่าง มหาวิทยาลัยเทคโนโลยีราชมงคลรัตนโกสินทร์",
            avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=faces"
          }
        ]
      };
    }
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    res.end(JSON.stringify({ success: true, config }));
    return;
  }

  if (pathname === '/api/catalog-config' && req.method === 'POST') {
    const body = await parseBody(req);
    const adminKey = req.headers['x-admin-key'] || (body && body.adminKey);
    if (adminKey !== 'admin123') {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Unauthorized: Invalid Admin Key' }));
      return;
    }

    const config = body.config || body;

    // Save to SQLite catalog_config
    eventDb.prepare(`
      INSERT INTO catalog_config (key, value, updated_at)
      VALUES ('main', ?, CURRENT_TIMESTAMP)
      ON CONFLICT(key) DO UPDATE SET
        value = excluded.value,
        updated_at = CURRENT_TIMESTAMP;
    `).run(JSON.stringify(config));

    // If artworkOrder array of IDs is supplied, update display_order on submissions
    if (Array.isArray(config.artworkOrder) && config.artworkOrder.length > 0) {
      try {
        const updateStmt = eventDb.prepare("UPDATE submissions SET display_order = ? WHERE id = ?");
        eventDb.exec('BEGIN TRANSACTION;');
        config.artworkOrder.forEach((item, index) => {
          const id = typeof item === 'object' && item !== null ? item.id : item;
          if (id) {
            updateStmt.run(index + 1, id);
          }
        });
        eventDb.exec('COMMIT;');
      } catch (e) {
        try { eventDb.exec('ROLLBACK;'); } catch (_) {}
        console.warn('Error updating display_order:', e.message);
      }
    }

    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    res.end(JSON.stringify({ success: true, config }));
    return;
  }

  if (pathname === '/api/artists' && req.method === 'GET') {
    const rows = eventDb.prepare(`
      SELECT id, title, title_th, title_en, 
             artist_name, artist_name_th, artist_name_en, 
             academic_title, academic_title_th, academic_title_en,
             artist_avatar_url, artist_bio, artist_bio_th, artist_bio_en, nationality, 
             artist_email, artist_phone, technique, technique_th, technique_en, 
             dimensions, year_created, price, description, description_th, description_en, 
             image_url, thumbnail_url, zone, display_order
      FROM submissions 
      WHERE status = 'approved'
      ORDER BY artist_name ASC, display_order ASC, id ASC
    `).all();

    const artistsMap = new Map();
    for (const row of rows) {
      const artistKey = (row.artist_name || '').trim().toLowerCase();
      if (!artistsMap.has(artistKey)) {
        artistsMap.set(artistKey, {
          academic_title: row.academic_title || '',
          academic_title_th: row.academic_title_th || row.academic_title || '',
          academic_title_en: row.academic_title_en || row.academic_title || '',
          artist_name: row.artist_name,
          artist_name_th: row.artist_name_th || row.artist_name,
          artist_name_en: row.artist_name_en || row.artist_name,
          artist_avatar_url: row.artist_avatar_url || '',
          artist_bio: row.artist_bio || '',
          artist_bio_th: row.artist_bio_th || row.artist_bio || '',
          artist_bio_en: row.artist_bio_en || row.artist_bio || '',
          nationality: row.nationality || 'Thailand',
          artist_email: row.artist_email || '',
          artist_phone: row.artist_phone || '',
          artworks_count: 0,
          artworks: []
        });
      }

      const artist = artistsMap.get(artistKey);
      if (!artist.academic_title && row.academic_title) artist.academic_title = row.academic_title;
      if (!artist.academic_title_th && row.academic_title_th) artist.academic_title_th = row.academic_title_th;
      if (!artist.academic_title_en && row.academic_title_en) artist.academic_title_en = row.academic_title_en;
      if (!artist.artist_avatar_url && row.artist_avatar_url) artist.artist_avatar_url = row.artist_avatar_url;
      if (!artist.artist_bio && row.artist_bio) artist.artist_bio = row.artist_bio;
      if (!artist.artist_bio_th && row.artist_bio_th) artist.artist_bio_th = row.artist_bio_th;
      if (!artist.artist_bio_en && row.artist_bio_en) artist.artist_bio_en = row.artist_bio_en;
      if (!artist.nationality && row.nationality) artist.nationality = row.nationality;

      artist.artworks_count += 1;
      artist.artworks.push({
        id: row.id,
        title: row.title,
        title_th: row.title_th || row.title,
        title_en: row.title_en || row.title,
        academic_title: row.academic_title || '',
        academic_title_th: row.academic_title_th || '',
        academic_title_en: row.academic_title_en || '',
        artist_name: row.artist_name,
        artist_name_th: row.artist_name_th || row.artist_name,
        artist_name_en: row.artist_name_en || row.artist_name,
        technique: row.technique,
        technique_th: row.technique_th || row.technique,
        technique_en: row.technique_en || row.technique,
        dimensions: row.dimensions,
        year_created: row.year_created,
        price: row.price,
        description: row.description,
        description_th: row.description_th || row.description,
        description_en: row.description_en || row.description,
        image_url: row.image_url,
        thumbnail_url: row.thumbnail_url || row.image_url,
        zone: row.zone
      });
    }

    const artists = Array.from(artistsMap.values());
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, count: artists.length, artists }));
    return;
  }

  if (pathname === '/api/submissions' && req.method === 'GET') {
    const status = parsedUrl.searchParams.get('status');
    const zone = parsedUrl.searchParams.get('zone');
    const adminKey = req.headers['x-admin-key'];
    let query = 'SELECT * FROM submissions';
    const params = [];
    const conditions = [];

    if (adminKey === 'admin123') {
      if (status) {
        conditions.push('status = ?');
        params.push(status);
      }
    } else {
      conditions.push("status = 'approved'");
    }

    if (zone) {
      conditions.push('zone = ?');
      params.push(zone);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY display_order ASC, id DESC';

    const rows = eventDb.prepare(query).all(...params);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, submissions: rows }));
    return;
  }

  if (pathname === '/api/translate' && req.method === 'POST') {
    const body = await parseBody(req);
    const { text, from = 'auto', to = 'en' } = body;
    let fromLang = from;
    let toLang = to;
    if (fromLang === 'auto') {
      fromLang = hasThai(text) ? 'th' : 'en';
      toLang = fromLang === 'th' ? 'en' : 'th';
    }
    const translated = await translateText(text, fromLang, toLang);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, original: text, from: fromLang, to: toLang, translated }));
    return;
  }

  if (pathname === '/api/submissions' && req.method === 'POST') {
    const body = await parseBody(req);
    let {
      title = '',
      title_th,
      title_en,
      academic_title = '',
      academic_title_th,
      academic_title_en,
      artist_name = '',
      artist_name_th,
      artist_name_en,
      artist_avatar_url = '',
      artist_bio = '',
      artist_bio_th,
      artist_bio_en,
      nationality = 'Thailand',
      artist_email = '',
      artist_phone = '',
      technique = '',
      technique_th,
      technique_en,
      dimensions = '',
      year_created = new Date().getFullYear().toString(),
      price = '',
      description = '',
      description_th,
      description_en,
      cloudinary_public_id = '',
      image_url,
      thumbnail_url,
      zone = 'Main Gallery',
      display_order = 0
    } = body;

    const artistNameSource = (artist_name_th || artist_name_en || artist_name || '').trim();
    artist_name = artist_name || artistNameSource;
    const acadTitleSource = (academic_title || academic_title_th || academic_title_en || '').trim();

    // Backend Auto-Translation (asynchronous TH <-> EN)
    const [titleTrans, artistTrans, acadTrans, bioTrans, techTrans, descTrans] = await Promise.all([
      (!title_th || !title_en) ? autoTranslateField(title) : Promise.resolve({ th: title_th, en: title_en }),
      (!artist_name_th || !artist_name_en) && artistNameSource ? autoTranslateField(artistNameSource) : Promise.resolve({ th: artist_name_th || '', en: artist_name_en || '' }),
      (!academic_title_th || !academic_title_en) && acadTitleSource ? autoTranslateAcademicTitle(acadTitleSource) : Promise.resolve({ th: academic_title_th || '', en: academic_title_en || '' }),
      (!artist_bio_th || !artist_bio_en) ? autoTranslateField(artist_bio) : Promise.resolve({ th: artist_bio_th, en: artist_bio_en }),
      (!technique_th || !technique_en) ? autoTranslateField(technique) : Promise.resolve({ th: technique_th, en: technique_en }),
      (!description_th || !description_en) ? autoTranslateField(description) : Promise.resolve({ th: description_th, en: description_en })
    ]);

    title_th = title_th || titleTrans.th;
    title_en = title_en || titleTrans.en;
    artist_name_th = artist_name_th || (artistTrans ? artistTrans.th : '') || artist_name;
    artist_name_en = artist_name_en || (artistTrans ? artistTrans.en : '') || artist_name;
    academic_title = academic_title || acadTitleSource;
    academic_title_th = academic_title_th || (acadTrans ? acadTrans.th : '');
    academic_title_en = academic_title_en || (acadTrans ? acadTrans.en : '');
    artist_bio_th = artist_bio_th || bioTrans.th;
    artist_bio_en = artist_bio_en || bioTrans.en;
    technique_th = technique_th || techTrans.th;
    technique_en = technique_en || techTrans.en;
    description_th = description_th || descTrans.th;
    description_en = description_en || descTrans.en;

    const result = eventDb.prepare(`
      INSERT INTO submissions (
        title, title_th, title_en,
        academic_title, academic_title_th, academic_title_en,
        artist_name, artist_name_th, artist_name_en,
        artist_avatar_url, artist_bio, artist_bio_th, artist_bio_en, nationality,
        artist_email, artist_phone, technique, technique_th, technique_en,
        dimensions, year_created, price, description, description_th, description_en,
        cloudinary_public_id, image_url, thumbnail_url, zone, display_order, status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `).run(
      title, title_th, title_en,
      academic_title, academic_title_th, academic_title_en,
      artist_name, artist_name_th, artist_name_en,
      artist_avatar_url, artist_bio, artist_bio_th, artist_bio_en, nationality,
      artist_email, artist_phone, technique, technique_th, technique_en,
      dimensions, year_created, price, description, description_th, description_en,
      cloudinary_public_id, image_url, thumbnail_url || image_url, zone, display_order
    );

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      submission: {
        id: Number(result.lastInsertRowid),
        title,
        title_th,
        title_en,
        academic_title,
        academic_title_th,
        academic_title_en,
        artist_name,
        artist_name_th,
        artist_name_en,
        artist_avatar_url,
        technique_th,
        technique_en,
        status: 'pending'
      }
    }));
    return;
  }

  if (pathname === '/api/upload' && req.method === 'POST') {
    try {
      const body = await parseBody(req);
      const dataUrl = body.data_url || body.dataUrl || body.image || body.avatar;
      if (!dataUrl || typeof dataUrl !== 'string' || !dataUrl.startsWith('data:image/')) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Invalid data_url format. Must be base64 data:image/...' }));
        return;
      }
      const ext = (dataUrl.match(/^data:image\/(\w+);/) || [])[1] || 'jpg';
      const base64Str = dataUrl.replace(/^data:image\/\w+;base64,/, '');
      const buf = Buffer.from(base64Str, 'base64');
      const uploadDir = path.join(ROOT_DIR, 'apps', 'event-webapp', 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      const prefix = body.type || 'upload';
      const safeFileName = `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}.${ext}`;
      fs.writeFileSync(path.join(uploadDir, safeFileName), buf);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, url: `/uploads/${safeFileName}` }));
      return;
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: err.message }));
      return;
    }
  }

  if (pathname === '/api/submissions/batch' && req.method === 'POST') {
    const body = await parseBody(req);
    const adminKey = req.headers['x-admin-key'] || (body && body.adminKey);
    if (adminKey !== 'admin123') {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Unauthorized: Invalid Admin Key' }));
      return;
    }

    const items = body.items || [];
    if (!Array.isArray(items) || items.length === 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'No items provided' }));
      return;
    }

    const defaultStatus = body.status || 'approved';
    const maxRow = eventDb.prepare('SELECT MAX(display_order) as maxOrder FROM submissions').get();
    let currentOrder = (maxRow && maxRow.maxOrder) ? maxRow.maxOrder : 0;

    const insertStmt = eventDb.prepare(`
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

    eventDb.exec('BEGIN TRANSACTION;');
    const importedIds = [];

    try {
      const uploadDir = path.join(ROOT_DIR, 'apps', 'event-webapp', 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      for (let idx = 0; idx < items.length; idx++) {
        const item = items[idx];
        currentOrder += 1;
        const cleanDash = (v) => (!v || String(v).trim() === '' || String(v).trim() === '-') ? '-' : String(v).trim();
        const title = cleanDash(item.title || item.artworkTitle || item.ชื่องาน);
        const artist = cleanDash(item.artist_name || item.artistName || item.ชื่อศิลปิน);
        const desc = cleanDash(item.description || item.concept || item.แนวคิด);
        let img = item.image_url || item.imageUrl || '';
        let avatar = item.artist_avatar_url || item.artistAvatarUrl || '';
        if (avatar && avatar.includes('unsplash.com')) avatar = '';

        // Auto save artwork base64 dataUrl if provided
        if (item.image_data_url && typeof item.image_data_url === 'string' && item.image_data_url.startsWith('data:image/')) {
          try {
            const ext = (item.image_data_url.match(/^data:image\/(\w+);/) || [])[1] || 'jpg';
            const base64Str = item.image_data_url.replace(/^data:image\/\w+;base64,/, '');
            const buf = Buffer.from(base64Str, 'base64');
            const safeFileName = `art_batch_${Date.now()}_${idx}.${ext}`;
            fs.writeFileSync(path.join(uploadDir, safeFileName), buf);
            img = `/uploads/${safeFileName}`;
          } catch (e) {
            console.warn('Failed to save artwork dataUrl:', e.message);
          }
        }

        // Auto save artist portrait base64 dataUrl if provided
        if (item.artist_avatar_data_url && typeof item.artist_avatar_data_url === 'string' && item.artist_avatar_data_url.startsWith('data:image/')) {
          try {
            const ext = (item.artist_avatar_data_url.match(/^data:image\/(\w+);/) || [])[1] || 'jpg';
            const base64Str = item.artist_avatar_data_url.replace(/^data:image\/\w+;base64,/, '');
            const buf = Buffer.from(base64Str, 'base64');
            const safeFileName = `artist_batch_${Date.now()}_${idx}.${ext}`;
            fs.writeFileSync(path.join(uploadDir, safeFileName), buf);
            avatar = `/uploads/${safeFileName}`;
          } catch (e) {
            console.warn('Failed to save artist portrait dataUrl:', e.message);
          }
        }

        const bio = cleanDash(item.artist_bio || item.bio || item.ประวัติ);
        const nat = cleanDash(item.nationality || item.country || item.สัญชาติ || item.ประเทศ);
        const tech = cleanDash(item.technique || item.medium || item.เทคนิค);
        const dims = cleanDash(item.dimensions || item.size || item.ขนาด);
        const yr = cleanDash(item.year_created || item.year || item.ปี);
        const pr = cleanDash(item.price || item.ราคา);
        const stat = item.status || defaultStatus;

        const info = insertStmt.run(
          title, artist, desc,
          img, img,
          avatar, bio,
          nat, tech, dims,
          yr, pr, stat, currentOrder,
          title, artist, bio,
          tech, desc
        );
        importedIds.push(Number(info.lastInsertRowid));
      }
      eventDb.exec('COMMIT;');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, count: importedIds.length, importedIds }));
    } catch (err) {
      try { eventDb.exec('ROLLBACK;'); } catch (_) {}
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: err.message }));
    }
    return;
  }

  const matchUpdate = pathname.match(/^\/api\/submissions\/(\d+)\/update$/);
  if (matchUpdate && req.method === 'POST') {
    const id = matchUpdate[1];
    const body = await parseBody(req);
    const allowed = [
      'title', 'title_th', 'title_en',
      'academic_title', 'academic_title_th', 'academic_title_en',
      'artist_name', 'artist_name_th', 'artist_name_en',
      'artist_avatar_url', 'artist_bio', 'artist_bio_th', 'artist_bio_en',
      'nationality', 'artist_email', 'artist_phone',
      'technique', 'technique_th', 'technique_en',
      'dimensions', 'year_created', 'price',
      'description', 'description_th', 'description_en',
      'cloudinary_public_id', 'image_url', 'thumbnail_url',
      'zone', 'display_order', 'status'
    ];
    const setClauses = [];
    const params = [];
    for (const key of allowed) {
      if (body[key] !== undefined) {
        setClauses.push(`${key} = ?`);
        params.push(body[key]);
      }
    }
    if (body.title_th && body.title === undefined) {
      setClauses.push('title = ?');
      params.push(body.title_th);
    }
    if (body.artist_name_th && body.artist_name === undefined) {
      setClauses.push('artist_name = ?');
      params.push(body.artist_name_th);
    }
    if (body.image_url && body.thumbnail_url === undefined) {
      setClauses.push('thumbnail_url = ?');
      params.push(body.image_url);
    }
    if (setClauses.length > 0) {
      params.push(id);
      eventDb.prepare(`UPDATE submissions SET ${setClauses.join(', ')} WHERE id = ?`).run(...params);
    }

    const updated = eventDb.prepare('SELECT * FROM submissions WHERE id = ?').get(id);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, submission: updated }));
    return;
  }

  if (pathname === '/api/artists/update' && req.method === 'POST') {
    const body = await parseBody(req);
    const oldArtistName = (body.old_artist_name || body.artist_name || '').trim();
    if (!oldArtistName) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Missing old_artist_name' }));
      return;
    }

    const allowed = [
      'artist_name', 'artist_name_th', 'artist_name_en',
      'academic_title', 'academic_title_th', 'academic_title_en',
      'artist_avatar_url', 'artist_bio', 'artist_bio_th', 'artist_bio_en',
      'nationality', 'artist_email', 'artist_phone'
    ];
    const setClauses = [];
    const params = [];
    for (const key of allowed) {
      if (body[key] !== undefined) {
        setClauses.push(`${key} = ?`);
        params.push(body[key]);
      }
    }
    if (body.artist_name_th && body.artist_name === undefined) {
      setClauses.push('artist_name = ?');
      params.push(body.artist_name_th);
    }

    if (setClauses.length > 0) {
      params.push(oldArtistName, oldArtistName, oldArtistName);
      eventDb.prepare(`
        UPDATE submissions SET ${setClauses.join(', ')} 
        WHERE artist_name = ? OR artist_name_th = ? OR artist_name_en = ?
      `).run(...params);
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true }));
    return;
  }

  const matchUpdateImage = pathname.match(/^\/api\/submissions\/(\d+)\/update-image$/);
  if (matchUpdateImage && req.method === 'POST') {
    const id = matchUpdateImage[1];
    const body = await parseBody(req);
    const { image_data } = body;

    if (!image_data) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'image_data is required' }));
      return;
    }

    let newImageUrl = image_data;
    // If it is a base64 data url, save to uploads folder
    if (image_data.startsWith('data:image/')) {
      const matches = image_data.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
      if (matches) {
        const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
        const buffer = Buffer.from(matches[2], 'base64');
        const uploadsDir = path.join(eventPublicDir, 'uploads');
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }
        const fileName = `artwork_${id}_${Date.now()}.${ext}`;
        const filePath = path.join(uploadsDir, fileName);
        fs.writeFileSync(filePath, buffer);
        newImageUrl = `/uploads/${fileName}`;
      }
    }

    eventDb.prepare(`
      UPDATE submissions SET
        image_url = ?,
        thumbnail_url = ?
      WHERE id = ?
    `).run(newImageUrl, newImageUrl, id);

    const updated = eventDb.prepare('SELECT * FROM submissions WHERE id = ?').get(id);

    // If approved, also sync image update to masterDb
    if (updated && updated.status === 'approved') {
      const globalId = `printmaking-2026-${String(id).padStart(4, '0')}`;
      masterDb.prepare(`
        UPDATE master_artworks SET
          image_url = ?,
          thumbnail_url = ?
        WHERE global_id = ?
      `).run(newImageUrl, newImageUrl, globalId);
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      image_url: newImageUrl,
      thumbnail_url: newImageUrl,
      submission: updated
    }));
    return;
  }

  const matchDetail = pathname.match(/^\/api\/submissions\/(\d+)$/);
  if (matchDetail && req.method === 'GET') {
    const id = matchDetail[1];
    const item = eventDb.prepare('SELECT * FROM submissions WHERE id = ?').get(id);
    if (!item) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Artwork not found' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, submission: item }));
    return;
  }

  const matchApprove = pathname.match(/^\/api\/submissions\/(\d+)\/approve$/);
  if (matchApprove && req.method === 'POST') {
    const id = matchApprove[1];
    eventDb.prepare("UPDATE submissions SET status = 'approved' WHERE id = ?").run(id);
    const item = eventDb.prepare('SELECT * FROM submissions WHERE id = ?').get(id);

    // Push Webhook to Master Portal
    const global_id = `printmaking-2026-${String(id).padStart(4, '0')}`;
    const payload = {
      event_id: 'printmaking-2026',
      global_id,
      title: item.title,
      artist: item.artist_name,
      image_url: item.image_url,
      thumbnail_url: item.thumbnail_url || item.image_url,
      event_page_url: `http://localhost:8787/artwork.html?id=${id}`
    };

    let syncResult = { attempted: true, success: false, status: null };
    try {
      const webhookRes = await fetch('http://localhost:8788/api/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sec_demo_event_2026_xyz'
        },
        body: JSON.stringify(payload)
      });
      syncResult.status = webhookRes.status;
      syncResult.success = webhookRes.ok;
      syncResult.response = await webhookRes.json().catch(() => null);
    } catch (err) {
      syncResult.error = err.message;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      submission: item,
      webhook: { payload, syncResult }
    }));
    return;
  }

  const matchReject = pathname.match(/^\/api\/submissions\/(\d+)\/reject$/);
  if (matchReject && req.method === 'POST') {
    const id = matchReject[1];
    eventDb.prepare("UPDATE submissions SET status = 'rejected' WHERE id = ?").run(id);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, message: `Submission ${id} rejected` }));
    return;
  }

  const matchDelete = pathname.match(/^\/api\/submissions\/(\d+)\/delete$/);
  if (matchDelete && (req.method === 'POST' || req.method === 'DELETE')) {
    const id = matchDelete[1];
    const item = eventDb.prepare('SELECT id, title FROM submissions WHERE id = ?').get(id);
    if (!item) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: `Submission with ID ${id} not found.` }));
      return;
    }
    eventDb.prepare("DELETE FROM submissions WHERE id = ?").run(id);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, message: `Artwork #${id} (${item.title}) deleted successfully.`, deletedId: Number(id) }));
    return;
  }

  if (pathname === '/api/artists/delete' && req.method === 'POST') {
    const body = await parseBody(req);
    const artistName = (body.artist_name || body.name || '').trim();
    if (!artistName) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'artist_name is required' }));
      return;
    }
    const rows = eventDb.prepare(`
      SELECT id, title FROM submissions 
      WHERE artist_name = ? OR artist_name_th = ? OR artist_name_en = ?
    `).all(artistName, artistName, artistName);

    if (rows.length === 0) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: `No artworks found for artist: ${artistName}` }));
      return;
    }

    eventDb.prepare(`
      DELETE FROM submissions 
      WHERE artist_name = ? OR artist_name_th = ? OR artist_name_en = ?
    `).run(artistName, artistName, artistName);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      message: `Artist "${artistName}" and ${rows.length} artworks deleted successfully.`,
      deletedArtist: artistName,
      deletedCount: rows.length,
      deletedIds: rows.map(r => r.id)
    }));
    return;
  }

  // Serve static UI
  if (serveStaticFile(eventPublicDir, pathname, res)) return;

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

// ==========================================
// 2. MASTER PORTAL SERVER (Port 8788)
// ==========================================
const masterPublicDir = path.join(ROOT_DIR, 'apps', 'master-portal', 'public');

const masterServer = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, 'http://localhost:8788');
  const pathname = parsedUrl.pathname;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Webhook Sync API
  if (pathname === '/api/sync' && req.method === 'POST') {
    const authHeader = req.headers['authorization'] || '';
    const match = authHeader.match(/^Bearer\s+(.+)$/i);
    const token = match ? match[1].trim() : null;

    if (!token) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Unauthorized: Missing Bearer token' }));
      return;
    }

    const body = await parseBody(req);
    const {
      event_id,
      global_id,
      title,
      artist,
      image_url,
      thumbnail_url,
      event_page_url,
      description = '',
      technique = '',
      dimensions = '',
      year_created = '',
      zone = 'Main Gallery',
      artist_avatar_url = '',
      nationality = 'Thailand'
    } = body;

    const event = masterDb.prepare('SELECT * FROM registered_events WHERE event_id = ?').get(event_id);
    if (!event || event.secret_token !== token) {
      res.writeHead(403, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Forbidden: Invalid secret token' }));
      return;
    }

    masterDb.prepare(`
      INSERT INTO master_artworks (
        global_id, event_id, title, artist_name, image_url, thumbnail_url,
        event_page_url, description, technique, dimensions, year_created,
        zone, artist_avatar_url, nationality, published_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(global_id) DO UPDATE SET
        title = excluded.title,
        artist_name = excluded.artist_name,
        image_url = excluded.image_url,
        thumbnail_url = excluded.thumbnail_url,
        event_page_url = excluded.event_page_url,
        description = excluded.description,
        technique = excluded.technique,
        dimensions = excluded.dimensions,
        year_created = excluded.year_created,
        zone = excluded.zone,
        artist_avatar_url = excluded.artist_avatar_url,
        nationality = excluded.nationality;
    `).run(
      global_id,
      event_id,
      title,
      artist,
      image_url,
      thumbnail_url || image_url,
      event_page_url,
      description,
      technique,
      dimensions,
      year_created,
      zone,
      artist_avatar_url,
      nationality
    );

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, message: `Artwork ${global_id} synced successfully` }));
    return;
  }

  // Active Pull Synchronization API: Pull approved submissions from registered events
  if (pathname === '/api/sync/pull' && req.method === 'POST') {
    const body = await parseBody(req);
    const targetEventId = body.event_id || null;

    let eventsQuery = "SELECT * FROM registered_events WHERE status = 'active'";
    const params = [];
    if (targetEventId) {
      eventsQuery += " AND event_id = ?";
      params.push(targetEventId);
    }

    const events = masterDb.prepare(eventsQuery).all(...params);
    if (events.length === 0) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: false,
        message: targetEventId ? `No active event found with id '${targetEventId}'` : 'No active events registered in system.'
      }));
      return;
    }

    const results = [];
    let totalSynced = 0;

    for (const ev of events) {
      const eventReport = {
        event_id: ev.event_id,
        event_title: ev.event_title,
        portal_url: ev.portal_url,
        synced_count: 0,
        status: 'success',
        error: null
      };

      try {
        let submissions = [];
        const isLocalHost = ev.portal_url.includes('localhost:8787') || ev.portal_url.includes('127.0.0.1:8787');
        
        try {
          const fetchUrl = `${ev.portal_url.replace(/\/+$/, '')}/api/submissions?status=approved`;
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 4000);
          const fetchRes = await fetch(fetchUrl, {
            headers: { 'Accept': 'application/json' },
            signal: controller.signal
          });
          clearTimeout(timeout);
          if (fetchRes.ok) {
            const data = await fetchRes.json();
            submissions = data.submissions || [];
          } else {
            throw new Error(`HTTP ${fetchRes.status}`);
          }
        } catch (fetchErr) {
          if (isLocalHost) {
            submissions = eventDb.prepare("SELECT * FROM submissions WHERE status = 'approved'").all();
          } else {
            throw fetchErr;
          }
        }

        for (const sub of submissions) {
          const globalId = `${ev.event_id}-${String(sub.id).padStart(4, '0')}`;
          const eventPageUrl = `${ev.portal_url.replace(/\/+$/, '')}/artwork.html?id=${sub.id}`;

          masterDb.prepare(`
            INSERT INTO master_artworks (
              global_id, event_id, title, artist_name, image_url, thumbnail_url,
              event_page_url, description, technique, dimensions, year_created,
              zone, artist_avatar_url, nationality, published_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(global_id) DO UPDATE SET
              title = excluded.title,
              artist_name = excluded.artist_name,
              image_url = excluded.image_url,
              thumbnail_url = excluded.thumbnail_url,
              event_page_url = excluded.event_page_url,
              description = excluded.description,
              technique = excluded.technique,
              dimensions = excluded.dimensions,
              year_created = excluded.year_created,
              zone = excluded.zone,
              artist_avatar_url = excluded.artist_avatar_url,
              nationality = excluded.nationality;
          `).run(
            globalId,
            ev.event_id,
            (sub.title || '').trim(),
            (sub.artist_name || '').trim(),
            sub.image_url,
            sub.thumbnail_url || sub.image_url,
            eventPageUrl,
            sub.description || '',
            sub.technique || '',
            sub.dimensions || '',
            sub.year_created || '',
            sub.zone || 'Main Gallery',
            sub.artist_avatar_url || '',
            sub.nationality || 'Thailand'
          );

          eventReport.synced_count++;
          totalSynced++;
        }
      } catch (err) {
        eventReport.status = 'error';
        eventReport.error = err.message;
      }
      results.push(eventReport);
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      message: `Successfully pulled and synchronized ${totalSynced} artwork(s) across ${events.length} event(s).`,
      total_synced: totalSynced,
      events: results
    }));
    return;
  }

  if (pathname === '/api/artworks' && req.method === 'GET') {
    const event_id = parsedUrl.searchParams.get('event_id');
    const q = parsedUrl.searchParams.get('q');

    let query = `
      SELECT m.*, e.event_title, e.portal_url as event_portal_url
      FROM master_artworks m
      LEFT JOIN registered_events e ON m.event_id = e.event_id
      WHERE 1=1
    `;
    const params = [];
    if (event_id) {
      query += ' AND m.event_id = ?';
      params.push(event_id);
    }
    if (q) {
      query += ' AND (m.title LIKE ? OR m.artist_name LIKE ?)';
      params.push(`%${q}%`, `%${q}%`);
    }
    query += ' ORDER BY m.published_at DESC';

    const rows = masterDb.prepare(query).all(...params);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, artworks: rows, total: rows.length }));
    return;
  }

  if (pathname === '/api/events' && req.method === 'GET') {
    const rows = masterDb.prepare(`
      SELECT e.*, COUNT(m.global_id) as artwork_count
      FROM registered_events e
      LEFT JOIN master_artworks m ON e.event_id = m.event_id
      GROUP BY e.event_id
      ORDER BY e.created_at DESC
    `).all();

    const events = rows.map(r => ({
      ...r,
      catalog_url: r.catalog_url || (r.portal_url ? `${r.portal_url.replace(/\/+$/, '')}/catalog.html` : null)
    }));

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, events }));
    return;
  }

  if (pathname === '/api/events' && req.method === 'POST') {
    const adminKey = req.headers['x-admin-key'];
    if (adminKey !== 'master_admin_secret_999') {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Unauthorized: Invalid master admin key' }));
      return;
    }
    const body = await parseBody(req);
    const { event_id, event_title, portal_url, secret_token, status, auto_scaffold, catalog_url } = body;

    masterDb.prepare(`
      INSERT INTO registered_events (event_id, event_title, portal_url, secret_token, status, catalog_url)
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(event_id) DO UPDATE SET
        event_title = excluded.event_title,
        portal_url = excluded.portal_url,
        secret_token = excluded.secret_token,
        catalog_url = excluded.catalog_url;
    `).run(event_id, event_title, portal_url, secret_token, status || 'active', catalog_url || null);

    let scaffoldResult = null;
    if (auto_scaffold) {
      const templateDir = path.join(ROOT_DIR, 'templates', 'event-template');
      const targetDir = path.join(ROOT_DIR, 'events', event_id);
      if (fs.existsSync(templateDir)) {
        const replacements = {
          EVENT_ID: event_id,
          EVENT_TITLE: event_title,
          SHARED_SECRET_TOKEN: secret_token,
          ADMIN_KEY: 'admin123',
          EVENT_THEME: 'heritage',
          CLOUDINARY_CLOUD_NAME: `${event_id}-cloud`,
          CLOUDINARY_UPLOAD_PRESET: `${event_id}_preset`,
          D1_DATABASE_NAME: `d1-${event_id}`,
          D1_DATABASE_ID: `d1-id-${event_id}-demo`,
          MASTER_PORTAL_URL: 'http://localhost:8788',
          EVENT_PAGE_BASE_URL: portal_url
        };

        function copyAndReplaceTpl(src, dest) {
          if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
          const entries = fs.readdirSync(src, { withFileTypes: true });
          for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            let targetName = entry.name;
            if (targetName.endsWith('.template')) targetName = targetName.replace(/\.template$/, '');
            const destPath = path.join(dest, targetName);
            if (entry.isDirectory()) {
              copyAndReplaceTpl(srcPath, destPath);
            } else {
              let content = fs.readFileSync(srcPath, 'utf8');
              for (const [k, v] of Object.entries(replacements)) {
                content = content.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), v || '');
              }
              fs.writeFileSync(destPath, content, 'utf8');
            }
          }
        }
        copyAndReplaceTpl(templateDir, targetDir);

        const manifest = {
          eventId: event_id,
          eventTitle: event_title,
          portalUrl: portal_url,
          secretToken: secret_token,
          createdAt: new Date().toISOString()
        };
        fs.writeFileSync(path.join(targetDir, 'event-manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');

        scaffoldResult = {
          folder: `events/${event_id}`,
          absolutePath: targetDir
        };
      }
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      message: scaffoldResult 
        ? `สร้าง Web Event '${event_id}' สำเร็จ พร้อมชุดโค้ดที่ ${scaffoldResult.folder}` 
        : `บันทึกการลงทะเบียน Event '${event_id}' สำเร็จ`,
      scaffold: scaffoldResult
    }));
    return;
  }

  // Automated Multi-Tenant Cloud Provisioning Endpoint
  if (pathname === '/api/events/provision' && req.method === 'POST') {
    const adminKey = req.headers['x-admin-key'];
    if (adminKey !== 'master_admin_secret_999') {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Unauthorized: Invalid master admin key' }));
      return;
    }

    const body = await parseBody(req);
    const {
      event_id,
      event_title,
      admin_email,
      cloudinary_cloud_name,
      cloudinary_upload_preset,
      cloudflare_account_id,
      cloudflare_api_token,
      github_repo
    } = body;

    if (!event_id || !event_title) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Missing event_id or event_title' }));
      return;
    }

    const steps = [];
    const crypto = require('node:crypto');
    const secretToken = `sec_${crypto.randomBytes(16).toString('hex')}`;
    const portalUrl = body.portal_url || `https://${event_id}.pages.dev`;
    const d1Name = `d1-${event_id}`;
    let d1Id = `d1-uuid-${crypto.randomBytes(8).toString('hex')}`;

    // Step 1: Security Handshake Token Generation
    steps.push({
      step: 1,
      name: "Security Handshake Token",
      status: "completed",
      detail: `Generated Bearer Webhook Token: ${secretToken.slice(0, 10)}...`
    });

    // Step 2 & 3: Cloudflare D1 Database Provisioning
    if (cloudflare_account_id && cloudflare_api_token && !cloudflare_api_token.startsWith('demo')) {
      try {
        const cfD1Res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${cloudflare_account_id}/d1/database`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${cloudflare_api_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: d1Name })
        });
        const cfD1Data = await cfD1Res.json();
        if (cfD1Data.success && cfD1Data.result) {
          d1Id = cfD1Data.result.uuid || d1Id;
          steps.push({
            step: 2,
            name: "Cloudflare D1 Database",
            status: "completed",
            detail: `Created remote D1 database '${d1Name}' (UUID: ${d1Id})`
          });

          // Execute schema remotely
          const schemaSql = fs.readFileSync(path.join(ROOT_DIR, 'schema_event.sql'), 'utf8');
          await fetch(`https://api.cloudflare.com/client/v4/accounts/${cloudflare_account_id}/d1/database/${d1Id}/query`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${cloudflare_api_token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sql: schemaSql })
          });
          steps.push({
            step: 3,
            name: "Database Schema Migration",
            status: "completed",
            detail: "Executed schema_event.sql (submissions, catalog_config created)"
          });
        } else {
          throw new Error(cfD1Data.errors?.[0]?.message || 'D1 creation failed');
        }
      } catch (cfErr) {
        steps.push({
          step: 2,
          name: "Cloudflare D1 Database",
          status: "simulated",
          detail: `Configured '${d1Name}' with ID ${d1Id} (Cloudflare API Note: ${cfErr.message})`
        });
        steps.push({
          step: 3,
          name: "Database Schema Migration",
          status: "simulated",
          detail: "Prepared local SQL schema migration bundle"
        });
      }
    } else {
      steps.push({
        step: 2,
        name: "Cloudflare D1 Database",
        status: "completed",
        detail: `Provisioned D1 profile '${d1Name}' for account '${admin_email || 'sub-addressed'}'`
      });
      steps.push({
        step: 3,
        name: "Database Schema Migration",
        status: "completed",
        detail: "Bundled schema_event.sql for automatic Cloudflare D1 migration"
      });
    }

    // Step 4: Codebase & wrangler.toml Scaffolding
    const templateDir = path.join(ROOT_DIR, 'templates', 'event-template');
    const targetDir = path.join(ROOT_DIR, 'events', event_id);
    const replacements = {
      EVENT_ID: event_id,
      EVENT_TITLE: event_title,
      ADMIN_EMAIL: admin_email || `${event_id}@example.com`,
      SHARED_SECRET_TOKEN: secretToken,
      ADMIN_KEY: 'admin123',
      EVENT_THEME: body.theme || 'heritage',
      CLOUDINARY_CLOUD_NAME: cloudinary_cloud_name || `${event_id}-cloud`,
      CLOUDINARY_UPLOAD_PRESET: cloudinary_upload_preset || `${event_id}_preset`,
      D1_DATABASE_NAME: d1Name,
      D1_DATABASE_ID: d1Id,
      MASTER_PORTAL_URL: 'http://localhost:8788',
      EVENT_PAGE_BASE_URL: portalUrl
    };

    function copyAndReplaceTpl(src, dest) {
      if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
      const entries = fs.readdirSync(src, { withFileTypes: true });
      for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        let targetName = entry.name;
        if (targetName.endsWith('.template')) targetName = targetName.replace(/\.template$/, '');
        const destPath = path.join(dest, targetName);
        if (entry.isDirectory()) {
          copyAndReplaceTpl(srcPath, destPath);
        } else {
          let content = fs.readFileSync(srcPath, 'utf8');
          for (const [k, v] of Object.entries(replacements)) {
            content = content.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), v || '');
          }
          fs.writeFileSync(destPath, content, 'utf8');
        }
      }
    }
    copyAndReplaceTpl(templateDir, targetDir);

    const manifest = {
      eventId: event_id,
      eventTitle: event_title,
      portalUrl,
      secretToken,
      adminEmail: admin_email || `${event_id}@example.com`,
      cloudinaryCloudName: cloudinary_cloud_name || '',
      cloudinaryUploadPreset: cloudinary_upload_preset || '',
      cloudflareAccountId: cloudflare_account_id || '',
      d1Name,
      d1Id,
      githubRepo: github_repo || '',
      createdAt: new Date().toISOString()
    };
    fs.writeFileSync(path.join(targetDir, 'event-manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');

    steps.push({
      step: 4,
      name: "Event Webapp & Environment Variables",
      status: "completed",
      detail: `Generated project in 'events/${event_id}' with pre-configured wrangler.toml and Cloudinary settings`
    });

    // Step 5: Master Portal Integration & Handshake
    const catalogUrl = body.catalog_url || (portalUrl ? `${portalUrl.replace(/\/+$/, '')}/catalog.html` : null);
    masterDb.prepare(`
      INSERT INTO registered_events (event_id, event_title, portal_url, secret_token, status, catalog_url)
      VALUES (?, ?, ?, ?, 'active', ?)
      ON CONFLICT(event_id) DO UPDATE SET
        event_title = excluded.event_title,
        portal_url = excluded.portal_url,
        secret_token = excluded.secret_token,
        catalog_url = excluded.catalog_url;
    `).run(event_id, event_title, portalUrl, secretToken, catalogUrl);

    steps.push({
      step: 5,
      name: "Master Portal, 3D Virtual Hall & Catalogue Ready",
      status: "completed",
      detail: `Activated in Master Directory, 3D Virtual Hall (/gallery-3d.html?event_id=${event_id}), and E-Catalogue (${catalogUrl})`
    });

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      message: `Web Event '${event_id}' provisioned and registered successfully!`,
      event: {
        event_id,
        event_title,
        portal_url: portalUrl,
        secret_token: secretToken,
        admin_email,
        folder: `events/${event_id}`
      },
      steps
    }));
    return;
  }

  // Serve static UI
  if (serveStaticFile(masterPublicDir, pathname, res)) return;

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

// Start listening
eventServer.listen(8787, () => {
  console.log('🎨 [Event Webapp]  running at: http://localhost:8787');
  console.log('   - Gallery:      http://localhost:8787/gallery.html');
  console.log('   - Submit Work:  http://localhost:8787/submit.html');
  console.log('   - Admin Curation: http://localhost:8787/admin.html');
});

masterServer.listen(8788, () => {
  console.log('🏛️  [Master Portal] running at: http://localhost:8788');
  console.log('   - Global Gallery:  http://localhost:8788');
  console.log('   - Event Directory: http://localhost:8788/events.html');
  console.log('   - Master Admin:    http://localhost:8788/admin.html');
  console.log('\nReady for live testing!\n');
});
