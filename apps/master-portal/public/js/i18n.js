/**
 * Poh-Chang Master Portal & Multi-Tenant Exhibition Platform
 * Client-Side Bilingual Localization Engine (TH / EN)
 */

const I18N_DICTIONARY = {
  th: {
    // Navigation
    nav_home: "หน้าหลัก",
    nav_events: "นิทรรศการทั้งหมด",
    nav_3d_gallery: "ห้องจัดแสดง 3D",
    nav_admin: "จัดการระบบ",
    nav_brand_title: "วิทยาลัยเพาะช่าง",
    nav_brand_sub: "หอศิลป์และนิทรรศการดิจิทัลเสมือนจริง",
    nav_back_to_portal: "← กลับสู่หน้าหลักพอร์ทัล",
    nav_event_webapp: "เข้าสู่เว็บเฉพาะนิทรรศการ →",
    nav_events_badge: "ปฏิทินศิลป์",

    // Hero Section
    hero_badge: "POH-CHANG VIRTUAL ART PORTAL",
    hero_title_1: "ศูนย์กลางนิทรรศการและ",
    hero_title_2: "หอศิลปกรรมดิจิทัลเสมือนจริง",
    hero_desc: "สัมผัสประสบการณ์สุนทรียะแห่งผลงานศิลปกรรมร่วมสมัยจากคณาจารย์ ศิษย์เก่า และศิลปินนานาชาติ ผ่านเทคโนโลยีเว็บ 3 มิติและระบบสูจิบัตรดิจิทัลมาตรฐานสากล",
    hero_stat_events: "นิทรรศการจัดแสดง",
    hero_stat_artworks: "ผลงานศิลปกรรม",
    hero_stat_artists: "ศิลปินร่วมแสดง",
    hero_stat_countries: "ประเทศที่เข้าร่วม",
    btn_explore_events: "สำรวจนิทรรศการ",
    btn_enter_gallery: "ชมแกลเลอรี 3 มิติ (3D Gallery)",

    // Highlights / Events Directory
    highlights_badge: "CURATED EXHIBITIONS",
    highlights_title: "นิทรรศการเด่นและกิจกรรมศิลป์",
    highlights_desc: "เลือกชมนิทรรศการศิลปกรรมเสมือนจริงที่กำลังจัดแสดงในปัจจุบันและคลังนิทรรศการย้อนหลัง",
    filter_all: "ทั้งหมด",
    filter_active: "กำลังจัดแสดง",
    filter_upcoming: "เร็วๆ นี้",
    filter_archived: "จดหมายเหตุ",
    view_all_events: "ดูนิทรรศการทั้งหมด →",
    btn_view_details: "ดูรายละเอียดและผลงาน",
    btn_enter_virtual: "เข้าสู่ห้องนิทรรศการ",
    event_status_ongoing: "กำลังจัดแสดง",
    event_status_upcoming: "เร็วๆ นี้",
    event_status_ended: "สิ้นสุดแล้ว",
    event_artworks_count_suffix: "ผลงาน",
    event_artists_count_suffix: "ศิลปิน",

    // Single Event Embedded Showcase (when ?event_id=... is selected)
    event_view_badge: "EXHIBITION SHOWCASE",
    event_back_btn: "← กลับหน้ารวมนิทรรศการ",
    event_hall_badge: "🏛️ หอศิลป์เสมือนจริง",
    event_btn_direct_webapp: "เปิดเว็บงานฉบับเต็ม",
    event_btn_3d_walk: "เดินชมนิทรรศการ 3D",
    event_artworks_title: "ผลงานศิลปกรรมในนิทรรศการ",
    event_artworks_desc: "คลิกผลงานเพื่อดูข้อมูลจำเพาะ ภาพความละเอียดสูง และบทสัมภาษณ์แนวคิดของศิลปิน",
    search_artworks_ph: "ค้นหาชื่อผลงาน, ศิลปิน, เทคนิค...",
    filter_all_artworks: "ผลงานทั้งหมด",
    filter_paintings: "จิตรกรรม",
    filter_prints: "ภาพพิมพ์",
    filter_sculpture: "ประติมากรรม",
    filter_multimedia: "สื่อผสม/ดิจิทัล",
    empty_artworks_title: "ไม่พบผลงานศิลปกรรมตามเงื่อนไข",
    empty_artworks_desc: "กรุณาลองเปลี่ยนคำค้นหา หรือล้างตัวกรอง",
    btn_reset_filters: "ล้างตัวกรอง",

    // Artwork Card & Badges
    badge_curated: "ผลงานคัดสรร",
    lbl_artist: "ศิลปิน",
    lbl_technique: "เทคนิค",
    lbl_dimensions: "ขนาด",
    lbl_year: "ปีที่สร้างสรรค์",
    lbl_price: "ราคาจัดจำหน่าย",
    btn_inspect: "ดูรายละเอียดผลงาน",
    btn_quick_view: "เปิดดู",

    // Artwork Detail Modal
    modal_artwork_badge: "POH-CHANG CURATED ARTWORK",
    modal_title_artist: "ประวัติและแนวคิดศิลปิน",
    modal_btn_catalog: "เปิดในสูจิบัตรดิจิทัล",
    modal_btn_share: "แชร์ผลงาน",
    modal_btn_close: "ปิดหน้าต่าง",
    modal_hi_res_hint: "คลิกที่ภาพเพื่อดูแบบเต็มจอ",
    modal_share_success: "คัดลอกลิงก์ผลงานแล้ว!",
    modal_concept_title: "แนวคิดผลงาน (Curatorial Concept)",
    modal_specs_title: "ข้อมูลจำเพาะของผลงาน",
    modal_open_webapp_detail: "เปิดหน้ารายละเอียดในเว็บเฉพาะนิทรรศการ →",

    // 3D Virtual Gallery HUD & Drawer
    gallery3d_loading: "กำลังโหลดหอศิลป์เสมือนจริง...",
    gallery3d_title: "หอศิลป์เสมือนจริงเพาะช่าง",
    gallery3d_instructions_title: "วิธีควบคุมการเดินชม",
    gallery3d_controls_wasd: "ปุ่ม W, A, S, D หรือ ปุ่มลูกศร เพื่อเดิน",
    gallery3d_controls_mouse: "คลิกและลากเมาส์ เพื่อหมุนมุมมองรอบทิศทาง",
    gallery3d_controls_interact: "คลิกที่ผลงาน เพื่อเข้าสู่โหมดพินิจพิเคราะห์",
    gallery3d_btn_start: "คลิกเพื่อเข้าสู่หอศิลป์",
    gallery3d_hud_directory: "สารบัญผลงาน",
    gallery3d_hud_view_portal: "กลับหน้าพอร์ทัล",
    gallery3d_hud_help: "ความช่วยเหลือ",
    gallery3d_drawer_title: "สารบัญผลงานในหอศิลป์",
    gallery3d_drawer_search_ph: "ค้นหาผลงานในห้องจัดแสดง...",
    gallery3d_teleport: "นำทางไปที่ผลงาน",
    gallery3d_inspect_badge: "3D ARTWORK INSPECTION",
    gallery3d_inspect_exit: "ออกจากโหมดพินิจ [ESC]",

    // Events Page
    events_page_badge: "ALL EXHIBITIONS",
    events_page_title: "ทำเนียบนิทรรศการทั้งหมด",
    events_page_desc: "สืบค้นนิทรรศการศิลปกรรมร่วมสมัย โครงการวิชาการ และมหกรรมศิลปะนานาชาติ",
    events_search_ph: "ค้นหานิทรรศการ, ปี พ.ศ., ภัณฑารักษ์...",

    // Admin Page
    admin_badge: "PORTAL MANAGEMENT",
    admin_title: "ระบบบริหารจัดการพอร์ทัลนิทรรศการ",
    admin_desc: "ควบคุม จัดการ และเชื่อมโยงนิทรรศการศิลปกรรมเสมือนจริงทั้งหมดในระบบ",
    admin_tab_events: "นิทรรศการทั้งหมด",
    admin_tab_create: "เพิ่มนิทรรศการใหม่",
    admin_tab_system: "สถานะระบบ",
    admin_th_cover: "ภาพหน้าปก",
    admin_th_title: "ชื่องานนิทรรศการ",
    admin_th_slug: "รหัส / Slug",
    admin_th_dates: "ระยะเวลาจัดแสดง",
    admin_th_artworks: "จำนวนผลงาน",
    admin_th_status: "สถานะ",
    admin_th_actions: "การจัดการ",
    admin_btn_add: "+ เพิ่มนิทรรศการ",
    admin_btn_edit: "แก้ไข",
    admin_btn_delete: "ลบ",
    admin_btn_open_portal: "ดูในพอร์ทัล",
    admin_btn_open_event: "ดูเว็บงาน",
    admin_form_title_th: "ชื่องานภาษาไทย",
    admin_form_title_en: "ชื่องานภาษาอังกฤษ",
    admin_form_slug: "URL Slug",
    admin_form_desc_th: "คำบรรยายภาษาไทย",
    admin_form_desc_en: "คำบรรยายภาษาอังกฤษ",
    admin_form_cover_url: "URL ภาพหน้าปก",
    admin_form_start_date: "วันเริ่มต้น",
    admin_form_end_date: "วันสิ้นสุด",
    admin_form_curator_th: "ภัณฑารักษ์ (ไทย)",
    admin_form_curator_en: "ภัณฑารักษ์ (อังกฤษ)",
    admin_form_save: "บันทึกข้อมูล",
    admin_form_cancel: "ยกเลิก",

    // Common Helpers
    price_on_request: "ไม่ได้ระบุราคา",
    not_for_sale: "ไม่ได้จำหน่าย",
    free_exhibit: "เข้าชมฟรี",
    dimensions_na: "ไม่ระบุ",
    loading_data: "กำลังโหลดข้อมูล...",
    btn_close: "ปิด",
    btn_back: "ย้อนกลับ",
    footer_text: "© 2026 วิทยาลัยเพาะช่าง มหาวิทยาลัยเทคโนโลยีราชมงคลรัตนโกสินทร์ สงวนลิขสิทธิ์",
    footer_sub: "พระราชทานกำเนิดโดย พระบาทสมเด็จพระมงกุฎเกล้าเจ้าอยู่หัว รัชกาลที่ ๖ พ.ศ. ๒๔๕๖"
  },

  en: {
    // Navigation
    nav_home: "Home",
    nav_events: "All Exhibitions",
    nav_3d_gallery: "3D Virtual Gallery",
    nav_admin: "Management",
    nav_brand_title: "Poh-Chang Academy of Arts",
    nav_brand_sub: "Digital & Virtual Art Museum Portal",
    nav_back_to_portal: "← Back to Master Portal",
    nav_event_webapp: "Go to Dedicated Event Site →",
    nav_events_badge: "Art Calendar",

    // Hero Section
    hero_badge: "POH-CHANG VIRTUAL ART PORTAL",
    hero_title_1: "Hub of Exhibitions &",
    hero_title_2: "Virtual Fine Art Museum",
    hero_desc: "Experience the pinnacle of contemporary fine art from master faculty, distinguished alumni, and international artists through 3D spatial web environments and digital catalog standards.",
    hero_stat_events: "Curated Exhibitions",
    hero_stat_artworks: "Fine Artworks",
    hero_stat_artists: "Participating Artists",
    hero_stat_countries: "Global Nations",
    btn_explore_events: "Explore Exhibitions",
    btn_enter_gallery: "Enter 3D Gallery",

    // Highlights / Events Directory
    highlights_badge: "CURATED EXHIBITIONS",
    highlights_title: "Featured Exhibitions & Programs",
    highlights_desc: "Discover current active virtual showcases and permanent digital archive collections.",
    filter_all: "All",
    filter_active: "Active",
    filter_upcoming: "Upcoming",
    filter_archived: "Archived",
    view_all_events: "View All Exhibitions →",
    btn_view_details: "View Details & Works",
    btn_enter_virtual: "Enter Exhibition",
    event_status_ongoing: "Currently Showing",
    event_status_upcoming: "Coming Soon",
    event_status_ended: "Archived",
    event_artworks_count_suffix: "Artworks",
    event_artists_count_suffix: "Artists",

    // Single Event Embedded Showcase
    event_view_badge: "EXHIBITION SHOWCASE",
    event_back_btn: "← Back to All Exhibitions",
    event_hall_badge: "🏛️ Virtual Fine Art Gallery",
    event_btn_direct_webapp: "Open Full Event Webapp",
    event_btn_3d_walk: "Explore in 3D Gallery",
    event_artworks_title: "Artworks in this Exhibition",
    event_artworks_desc: "Select any artwork to view curatorial statements, hi-resolution details, and artist biography.",
    search_artworks_ph: "Search artworks, artists, techniques...",
    filter_all_artworks: "All Artworks",
    filter_paintings: "Paintings",
    filter_prints: "Printmaking",
    filter_sculpture: "Sculptures",
    filter_multimedia: "Mixed Media / Digital",
    empty_artworks_title: "No Artworks Match Your Filter",
    empty_artworks_desc: "Try adjusting your search keywords or resetting active filters.",
    btn_reset_filters: "Reset Filters",

    // Artwork Card & Badges
    badge_curated: "Curated Selection",
    lbl_artist: "Artist",
    lbl_technique: "Technique",
    lbl_dimensions: "Dimensions",
    lbl_year: "Year",
    lbl_price: "Price",
    btn_inspect: "Inspect Artwork",
    btn_quick_view: "Quick View",

    // Artwork Detail Modal
    modal_artwork_badge: "POH-CHANG CURATED ARTWORK",
    modal_title_artist: "Artist Biography & Concept",
    modal_btn_catalog: "Open in E-Catalog",
    modal_btn_share: "Share Artwork",
    modal_btn_close: "Close Window",
    modal_hi_res_hint: "Click artwork image for fullscreen view",
    modal_share_success: "Artwork link copied to clipboard!",
    modal_concept_title: "Curatorial Concept & Statement",
    modal_specs_title: "Artwork Specifications",
    modal_open_webapp_detail: "View Full Profile in Event Webapp →",

    // 3D Virtual Gallery HUD & Drawer
    gallery3d_loading: "Loading Virtual Museum...",
    gallery3d_title: "Poh-Chang Virtual Art Gallery",
    gallery3d_instructions_title: "Navigation Controls",
    gallery3d_controls_wasd: "W, A, S, D or Arrow Keys to Walk",
    gallery3d_controls_mouse: "Click & Drag Mouse to Look Around",
    gallery3d_controls_interact: "Click Artwork Placard to Inspect",
    gallery3d_btn_start: "Click to Enter Gallery",
    gallery3d_hud_directory: "Art Directory",
    gallery3d_hud_view_portal: "Back to Portal",
    gallery3d_hud_help: "Navigation Help",
    gallery3d_drawer_title: "Gallery Directory",
    gallery3d_drawer_search_ph: "Search artworks in hall...",
    gallery3d_teleport: "Teleport to Artwork",
    gallery3d_inspect_badge: "3D ARTWORK INSPECTION",
    gallery3d_inspect_exit: "Exit Inspection [ESC]",

    // Events Page
    events_page_badge: "ALL EXHIBITIONS",
    events_page_title: "Official Exhibition Directory",
    events_page_desc: "Browse contemporary art exhibitions, academic symposia, and international art biennials.",
    events_search_ph: "Search exhibitions, years, curators...",

    // Admin Page
    admin_badge: "PORTAL MANAGEMENT",
    admin_title: "Master Portal Administration",
    admin_desc: "Govern, register, and configure virtual exhibitions and spatial assets across the portal.",
    admin_tab_events: "All Exhibitions",
    admin_tab_create: "Add New Exhibition",
    admin_tab_system: "System Health",
    admin_th_cover: "Cover",
    admin_th_title: "Exhibition Title",
    admin_th_slug: "Slug / ID",
    admin_th_dates: "Exhibition Dates",
    admin_th_artworks: "Works",
    admin_th_status: "Status",
    admin_th_actions: "Actions",
    admin_btn_add: "+ New Exhibition",
    admin_btn_edit: "Edit",
    admin_btn_delete: "Delete",
    admin_btn_open_portal: "View Portal",
    admin_btn_open_event: "View Site",
    admin_form_title_th: "Thai Title",
    admin_form_title_en: "English Title",
    admin_form_slug: "URL Slug",
    admin_form_desc_th: "Description (TH)",
    admin_form_desc_en: "Description (EN)",
    admin_form_cover_url: "Cover Image URL",
    admin_form_start_date: "Start Date",
    admin_form_end_date: "End Date",
    admin_form_curator_th: "Curator (TH)",
    admin_form_curator_en: "Curator (EN)",
    admin_form_save: "Save Exhibition",
    admin_form_cancel: "Cancel",

    // Common Helpers
    price_on_request: "Price on request",
    not_for_sale: "Not for sale",
    free_exhibit: "Free Admission",
    dimensions_na: "N/A",
    loading_data: "Loading data...",
    btn_close: "Close",
    btn_back: "Back",
    footer_text: "© 2026 Poh-Chang Academy of Arts, RMUTR. All Rights Reserved.",
    footer_sub: "Founded by Royal Patronage of King Rama VI in 1913"
  }
};

class MasterI18nManager {
  constructor() {
    this.currentLang = localStorage.getItem('exhibition_lang') || 'th';
  }

  getLang() {
    return this.currentLang;
  }

  setLang(lang) {
    if (lang !== 'th' && lang !== 'en') return;
    this.currentLang = lang;
    localStorage.setItem('exhibition_lang', lang);
    this.apply();
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }

  t(key) {
    const dict = I18N_DICTIONARY[this.currentLang] || I18N_DICTIONARY.th;
    return dict[key] || I18N_DICTIONARY.th[key] || key;
  }

  /**
   * Helper to retrieve bilingual content from an item based on active language
   */
  getField(item, fieldName, defaultVal = '') {
    if (!item) return defaultVal;
    const lang = this.currentLang;
    let val = '';
    if (lang === 'th') {
      val = item[fieldName + '_th'] || item[fieldName] || item[fieldName + '_en'] || defaultVal;
    } else {
      val = item[fieldName + '_en'] || item[fieldName] || item[fieldName + '_th'] || defaultVal;
    }

    if (fieldName === 'dimensions' && val) {
      return this.formatDimensions(val, lang);
    }
    if (fieldName === 'price' && val) {
      return this.formatPrice(val, lang);
    }
    return val;
  }

  /**
   * Helper to retrieve artist full display name including academic/official title
   */
  getArtistFullName(item, defaultVal = '') {
    if (!item) return defaultVal;
    const title = this.getField(item, 'academic_title', '').trim();
    const name = this.getField(item, 'artist_name', defaultVal).trim();
    if (!name) return defaultVal;
    return title ? `${title} ${name}` : name;
  }

  /**
   * Helper to format artwork dimensions according to active language
   */
  formatDimensions(val, lang = this.currentLang) {
    if (!val || typeof val !== 'string') return (lang === 'th' ? 'ไม่ระบุ' : 'N/A');
    let str = val.trim();
    if (!str || str === '-' || str.toLowerCase() === 'n/a' || str === 'ไม่ระบุ') {
      return (lang === 'th' ? 'ไม่ระบุ' : 'N/A');
    }

    if (lang === 'en') {
      str = str.replace(/เซ็?นติเมตร\.?/gi, 'cm');
      str = str.replace(/ซม\.?/gi, 'cm');
      str = str.replace(/มิลลิเมตร\.?/gi, 'mm');
      str = str.replace(/มม\.?/gi, 'mm');
      str = str.replace(/เมตร\.?/gi, 'm');
      str = str.replace(/นิ้ว/gi, 'in');
      str = str.replace(/ฟุต/gi, 'ft');
      str = str.replace(/ไม่ระบุ/gi, 'N/A');
      str = str.replace(/(\d)\s*(cm|mm|m|in|ft)\b/gi, '$1 $2');
      str = str.replace(/cm\.+/gi, 'cm');
      return str.trim();
    } else {
      str = str.replace(/\bcentimeters?\.?/gi, 'ซม.');
      str = str.replace(/\bcentimetres?\.?/gi, 'ซม.');
      str = str.replace(/\bcm\.?/gi, 'ซม.');
      str = str.replace(/\bmillimeters?\.?/gi, 'มม.');
      str = str.replace(/\bmillimetres?\.?/gi, 'มม.');
      str = str.replace(/\bmm\.?/gi, 'มม.');
      str = str.replace(/\bmeters?\.?/gi, 'ม.');
      str = str.replace(/\bmetres?\.?/gi, 'ม.');
      str = str.replace(/\binches?\b/gi, 'นิ้ว');
      str = str.replace(/\bin\.?\b/gi, 'นิ้ว');
      str = str.replace(/\bfeet\b/gi, 'ฟุต');
      str = str.replace(/\bft\.?\b/gi, 'ฟุต');
      str = str.replace(/\b(n\/?a|not specified)\b/gi, 'ไม่ระบุ');
      str = str.replace(/(\d)\s*(ซม\.|มม\.|นิ้ว|ม\.)/g, '$1 $2');
      return str.trim();
    }
  }

  /**
   * Helper to format artwork price according to active language (THB vs บาท)
   */
  formatPrice(val, lang = this.currentLang) {
    if (!val || typeof val !== 'string') return '';
    let str = val.trim();
    if (!str || str === '-') return '';
    
    const isNa = /^(n\/?a|ไม่ได้ระบุ(ราคา)?|ไม่ระบุ(ราคา)?|price on request|inquire)$/i.test(str);
    if (isNa) {
      return lang === 'th' ? 'ไม่ได้ระบุราคา' : 'Price on request';
    }

    const isNotForSale = /^(ไม่ได้จำหน่าย|ไม่จำหน่าย|ไม่ขาย|not for sale)$/i.test(str);
    if (isNotForSale) {
      return lang === 'th' ? 'ไม่ได้จำหน่าย' : 'Not for sale';
    }

    const isFree = /^(ฟรี|free)$/i.test(str);
    if (isFree) {
      return lang === 'th' ? 'ฟรี' : 'Free';
    }

    if (lang === 'en') {
      if (/บาท|บ\./.test(str)) {
        return str.replace(/\s*(บาท|บ\.)\s*\.?/g, '').trim() + ' THB';
      }
      if (/baht/i.test(str)) {
        return str.replace(/\s*baht\s*\.?/gi, '').trim() + ' THB';
      }
      if (/\b(thb|usd|eur|gbp|jpy)\b/i.test(str)) {
        return str.toUpperCase();
      }
      if (/^[\d,]+(\.\d{1,2})?$/.test(str)) {
        return `${str} THB`;
      }
      return str;
    } else {
      if (/\b(thb|baht)\b/i.test(str)) {
        return str.replace(/\s*(thb|baht)\s*\.?/gi, '').trim() + ' บาท';
      }
      if (/บาท/.test(str)) {
        return str;
      }
      if (/^[\d,]+(\.\d{1,2})?$/.test(str)) {
        return `${str} บาท`;
      }
      return str;
    }
  }

  apply() {
    const dict = I18N_DICTIONARY[this.currentLang] || I18N_DICTIONARY.th;
    
    // 0. Set HTML lang attribute
    document.documentElement.lang = this.currentLang;

    // 1. Text elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    // 2. Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.placeholder = dict[key];
      }
    });

    // 3. Tooltip Titles
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (dict[key]) {
        el.title = dict[key];
      }
    });

    // 4. Update switcher buttons active states
    this.updateSwitcherUI();
  }

  updateSwitcherUI() {
    const isTh = this.currentLang === 'th';
    
    document.querySelectorAll('.lang-btn-th').forEach(btn => {
      if (isTh) {
        btn.className = 'lang-btn-th px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-[#C5A059] to-[#DFBE7A] text-[#141E19] shadow-sm transition-all duration-200 cursor-pointer';
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.className = 'lang-btn-th px-2.5 py-1 rounded-full text-xs font-medium text-[#C8DBD2] hover:text-[#E8C87A] transition-all duration-200 cursor-pointer';
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    document.querySelectorAll('.lang-btn-en').forEach(btn => {
      if (!isTh) {
        btn.className = 'lang-btn-en px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-[#C5A059] to-[#DFBE7A] text-[#141E19] shadow-sm transition-all duration-200 cursor-pointer';
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.className = 'lang-btn-en px-2.5 py-1 rounded-full text-xs font-medium text-[#C8DBD2] hover:text-[#E8C87A] transition-all duration-200 cursor-pointer';
        btn.setAttribute('aria-pressed', 'false');
      }
    });
  }

  /**
   * Renders the language switcher widget into any container element.
   * Styled according to Poh-Chang Heritage & Gold palette.
   */
  renderSwitcher(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="inline-flex items-center p-0.5 rounded-full bg-[#1A2822]/90 border border-[#355246] shadow-inner text-xs font-sans select-none" role="group" aria-label="Language Selector">
        <button type="button" onclick="window.i18n.setLang('th')" class="lang-btn-th" aria-label="ภาษาไทย">TH</button>
        <button type="button" onclick="window.i18n.setLang('en')" class="lang-btn-en" aria-label="English">EN</button>
      </div>
    `;
    this.updateSwitcherUI();
  }
}

// Instantiate global i18n
window.i18n = new MasterI18nManager();
window.t = (key) => window.i18n.t(key);
window.getField = (item, fieldName, defaultVal = '') => window.i18n.getField(item, fieldName, defaultVal);
window.getArtistFullName = (item, defaultVal = '') => window.i18n.getArtistFullName(item, defaultVal);
window.formatDimensions = (val, lang) => window.i18n.formatDimensions(val, lang);
window.formatPrice = (val, lang) => window.i18n.formatPrice(val, lang);

document.addEventListener('DOMContentLoaded', () => {
  window.i18n.apply();
});
