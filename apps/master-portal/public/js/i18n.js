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
    filter_all_countries: "ทุกประเทศ (All Countries)",
    gallery_sort_default: "ลำดับการจัดแสดง (Curated Order)",
    gallery_sort_artist_asc: "ชื่อศิลปิน (A - Z / ก - ฮ)",
    gallery_sort_title_asc: "ชื่อผลงาน (A - Z / ก - ฮ)",
    gallery_sort_country_asc: "ตามประเทศ / สัญชาติ (A - Z)",
    gallery_sort_price_desc: "ราคาผลงาน (มากไปน้อย)",
    gallery_sort_price_asc: "ราคาผลงาน (น้อยไปมาก)",
    gallery_sort_year_desc: "ปีที่สร้างสรรค์ (ใหม่สุด)",
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
    filter_all_countries: "All Countries",
    gallery_sort_default: "Curated Exhibition Order",
    gallery_sort_artist_asc: "Artist Name (A - Z)",
    gallery_sort_title_asc: "Artwork Title (A - Z)",
    gallery_sort_country_asc: "Country / Nationality (A - Z)",
    gallery_sort_price_desc: "Artwork Price (High to Low)",
    gallery_sort_price_asc: "Artwork Price (Low to High)",
    gallery_sort_year_desc: "Year Created (Newest)",
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
    let savedLang = 'th';
    try {
      if (typeof localStorage !== 'undefined') {
        savedLang = localStorage.getItem('exhibition_lang') || 'th';
      }
    } catch (_) {}
    this.currentLang = (savedLang === 'en') ? 'en' : 'th';
  }

  getLang() {
    return this.currentLang;
  }

  setLang(lang) {
    if (lang !== 'th' && lang !== 'en') return;
    this.currentLang = lang;
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('exhibition_lang', lang);
      }
    } catch (_) {}
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

// ==========================================
// Country Flag Detection & Rendering Engine
// ==========================================
const COUNTRY_FLAG_MAP = {
  "af": "af", "afghanistan": "af", "islamic republic of afghanistan": "af", "afghan": "af", "อัฟกานิสถาน": "af",
  "al": "al", "albania": "al", "republic of albania": "al", "albanian": "al", "แอลเบเนีย": "al",
  "dz": "dz", "algeria": "dz", "people's democratic republic of algeria": "dz", "algerian": "dz", "แอลจีเรีย": "dz",
  "as": "as", "american samoa": "as", "american samoan": "as", "อเมริกันซามัว": "as",
  "ad": "ad", "andorra": "ad", "principality of andorra": "ad", "andorran": "ad", "อันดอร์รา": "ad",
  "ao": "ao", "angola": "ao", "republic of angola": "ao", "angolan": "ao", "แองโกลา": "ao",
  "ag": "ag", "antigua and barbuda": "ag", "antiguan": "ag", "barbudan": "ag", "แอนติกาและบาร์บูดา": "ag",
  "ar": "ar", "argentina": "ar", "argentine republic": "ar", "argentine": "ar", "อาร์เจนตินา": "ar", "arg": "ar",
  "am": "am", "armenia": "am", "republic of armenia": "am", "armenian": "am", "อาร์เมเนีย": "am",
  "aw": "aw", "aruba": "aw", "aruban": "aw", "อารูบา": "aw",
  "au": "au", "australia": "au", "commonwealth of australia": "au", "australian": "au", "ออสเตรเลีย": "au", "aus": "au",
  "at": "at", "austria": "at", "republic of austria": "at", "austrian": "at", "ออสเตรีย": "at", "aut": "at",
  "az": "az", "azerbaijan": "az", "republic of azerbaijan": "az", "azerbaijani": "az", "อาเซอร์ไบจาน": "az",
  "bs": "bs", "bahamas": "bs", "commonwealth of the bahamas": "bs", "bahamian": "bs", "บาฮามาส": "bs",
  "bh": "bh", "bahrain": "bh", "kingdom of bahrain": "bh", "bahraini": "bh", "บาห์เรน": "bh",
  "bd": "bd", "bangladesh": "bd", "people's republic of bangladesh": "bd", "bangladeshi": "bd", "บังกลาเทศ": "bd",
  "bb": "bb", "barbados": "bb", "barbadian": "bb", "บาร์เบโดส": "bb",
  "by": "by", "belarus": "by", "republic of belarus": "by", "belarusian": "by", "เบลารุส": "by",
  "be": "be", "belgium": "be", "kingdom of belgium": "be", "belgian": "be", "เบลเยียม": "be", "bel": "be",
  "bz": "bz", "belize": "bz", "belizean": "bz", "เบลีซ": "bz",
  "bj": "bj", "benin": "bj", "republic of benin": "bj", "beninese": "bj", "เบนิน": "bj",
  "bm": "bm", "bermuda": "bm", "bermudian": "bm", "เบอร์มิวดา": "bm",
  "bt": "bt", "bhutan": "bt", "kingdom of bhutan": "bt", "bhutanese": "bt", "ภูฏาน": "bt",
  "bo": "bo", "bolivia": "bo", "plurinational state of bolivia": "bo", "bolivian": "bo", "โบลิเวีย": "bo",
  "ba": "ba", "bosnia and herzegovina": "ba", "bosnian": "ba", "herzegovinian": "ba", "บอสเนียและเฮอร์เซโกวีนา": "ba",
  "bw": "bw", "botswana": "bw", "republic of botswana": "bw", "motswana": "bw", "บอตสวานา": "bw",
  "br": "br", "brazil": "br", "federative republic of brazil": "br", "brazilian": "br", "บราซิล": "br", "bra": "br",
  "vg": "vg", "british virgin islands": "vg", "virgin islands": "vg", "virgin islander": "vg", "หมู่เกาะบริติชเวอร์จิน": "vg",
  "bn": "bn", "brunei": "bn", "nation of brunei, abode of peace": "bn", "bruneian": "bn", "บรูไน": "bn",
  "bg": "bg", "bulgaria": "bg", "republic of bulgaria": "bg", "bulgarian": "bg", "บัลแกเรีย": "bg",
  "bf": "bf", "burkina faso": "bf", "burkinabe": "bf", "บูร์กินาฟาโซ": "bf",
  "bi": "bi", "burundi": "bi", "republic of burundi": "bi", "burundian": "bi", "บุรุนดี": "bi",
  "kh": "kh", "cambodia": "kh", "kingdom of cambodia": "kh", "cambodian": "kh", "กัมพูชา": "kh", "khm": "kh",
  "cm": "cm", "cameroon": "cm", "republic of cameroon": "cm", "cameroonian": "cm", "แคเมอรูน": "cm",
  "ca": "ca", "canada": "ca", "canadian": "ca", "แคนาดา": "ca", "can": "ca",
  "cv": "cv", "cape verde": "cv", "republic of cabo verde": "cv", "cape verdian": "cv", "เคปเวิร์ด": "cv",
  "ky": "ky", "cayman islands": "ky", "caymanian": "ky", "หมู่เกาะเคย์แมน": "ky",
  "cf": "cf", "central african republic": "cf", "central african": "cf", "สาธารณรัฐแอฟริกากลาง": "cf",
  "td": "td", "chad": "td", "republic of chad": "td", "chadian": "td", "ชาด": "td",
  "cl": "cl", "chile": "cl", "republic of chile": "cl", "chilean": "cl", "ชิลี": "cl",
  "cn": "cn", "china": "cn", "people's republic of china": "cn", "chinese": "cn", "จีน": "cn", "chn": "cn", "ประเทศจีน": "cn",
  "co": "co", "colombia": "co", "republic of colombia": "co", "colombian": "co", "โคลอมเบีย": "co",
  "km": "km", "comoros": "km", "union of the comoros": "km", "comoran": "km", "คอโมโรส": "km",
  "cg": "cg", "congo": "cg", "congolese": "cg", "คองโก": "cg",
  "ck": "ck", "cook islands": "ck", "cook islander": "ck", "หมู่เกาะคุก": "ck",
  "cr": "cr", "costa rica": "cr", "republic of costa rica": "cr", "costa rican": "cr", "คอสตาริกา": "cr",
  "hr": "hr", "croatia": "hr", "republic of croatia": "hr", "croatian": "hr", "โครเอเชีย": "hr",
  "cu": "cu", "cuba": "cu", "republic of cuba": "cu", "cuban": "cu", "คิวบา": "cu",
  "cy": "cy", "cyprus": "cy", "republic of cyprus": "cy", "cypriot": "cy", "ไซปรัส": "cy",
  "cz": "cz", "czechia": "cz", "czech republic": "cz", "czech": "cz", "สาธารณรัฐเช็ก": "cz",
  "dk": "dk", "denmark": "dk", "kingdom of denmark": "dk", "danish": "dk", "เดนมาร์ก": "dk", "dnk": "dk",
  "dj": "dj", "djibouti": "dj", "republic of djibouti": "dj", "จิบูตี": "dj",
  "dm": "dm", "dominica": "dm", "commonwealth of dominica": "dm", "dominican": "dm", "โดมินิกา": "dm",
  "do": "do", "dominican republic": "do", "สาธารณรัฐโดมินิกัน": "do",
  "cd": "cd", "dr congo": "cd", "democratic republic of the congo": "cd", "สาธารณรัฐประชาธิปไตยคองโก": "cd",
  "ec": "ec", "ecuador": "ec", "republic of ecuador": "ec", "ecuadorean": "ec", "เอกวาดอร์": "ec",
  "eg": "eg", "egypt": "eg", "arab republic of egypt": "eg", "egyptian": "eg", "อียิปต์": "eg",
  "sv": "sv", "el salvador": "sv", "republic of el salvador": "sv", "salvadoran": "sv", "เอลซัลวาดอร์": "sv",
  "gq": "gq", "equatorial guinea": "gq", "republic of equatorial guinea": "gq", "equatorial guinean": "gq", "อิเควทอเรียลกินี": "gq",
  "er": "er", "eritrea": "er", "state of eritrea": "er", "eritrean": "er", "เอริเทรีย": "er",
  "ee": "ee", "estonia": "ee", "republic of estonia": "ee", "estonian": "ee", "เอสโตเนีย": "ee",
  "sz": "sz", "eswatini": "sz", "kingdom of eswatini": "sz", "swazi": "sz", "เอสวาตินี": "sz",
  "et": "et", "ethiopia": "et", "federal democratic republic of ethiopia": "et", "ethiopian": "et", "เอธิโอเปีย": "et",
  "fj": "fj", "fiji": "fj", "republic of fiji": "fj", "fijian": "fj", "ฟิจิ": "fj",
  "fi": "fi", "finland": "fi", "republic of finland": "fi", "finnish": "fi", "ฟินแลนด์": "fi", "fin": "fi",
  "fr": "fr", "france": "fr", "french republic": "fr", "french": "fr", "ฝรั่งเศส": "fr", "fra": "fr", "ประเทศฝรั่งเศส": "fr",
  "ga": "ga", "gabon": "ga", "gabonese republic": "ga", "gabonese": "ga", "กาบอง": "ga",
  "gm": "gm", "gambia": "gm", "republic of the gambia": "gm", "gambian": "gm", "แกมเบีย": "gm",
  "ge": "ge", "georgia": "ge", "georgian": "ge", "จอร์เจีย": "ge",
  "de": "de", "germany": "de", "federal republic of germany": "de", "german": "de", "เยอรมนี": "de", "deu": "de", "เยอรมัน": "de",
  "gh": "gh", "ghana": "gh", "republic of ghana": "gh", "ghanaian": "gh", "กานา": "gh",
  "gi": "gi", "gibraltar": "gi", "ยิบรอลตาร์": "gi",
  "gr": "gr", "greece": "gr", "hellenic republic": "gr", "greek": "gr", "กรีซ": "gr", "grc": "gr",
  "gl": "gl", "greenland": "gl", "greenlandic": "gl", "กรีนแลนด์": "gl",
  "gd": "gd", "grenada": "gd", "grenadian": "gd", "เกรเนดา": "gd",
  "gu": "gu", "guam": "gu", "guamanian": "gu", "กวม": "gu",
  "gt": "gt", "guatemala": "gt", "republic of guatemala": "gt", "guatemalan": "gt", "กัวเตมาลา": "gt",
  "gn": "gn", "guinea": "gn", "republic of guinea": "gn", "guinean": "gn", "กินี": "gn",
  "gw": "gw", "guinea-bissau": "gw", "republic of guinea-bissau": "gw", "guinea-bissauan": "gw", "กินี-บิสเซา": "gw",
  "gy": "gy", "guyana": "gy", "co-operative republic of guyana": "gy", "guyanese": "gy", "กายอานา": "gy",
  "ht": "ht", "haiti": "ht", "republic of haiti": "ht", "haitian": "ht", "เฮติ": "ht",
  "hn": "hn", "honduras": "hn", "republic of honduras": "hn", "honduran": "hn", "ฮอนดูรัส": "hn",
  "hk": "hk", "hong kong": "hk", "hong kong special administrative region of the people's republic of china": "hk", "hong konger": "hk", "ฮ่องกง": "hk", "hkg": "hk",
  "hu": "hu", "hungary": "hu", "hungarian": "hu", "ฮังการี": "hu",
  "is": "is", "iceland": "is", "icelander": "is", "ไอซ์แลนด์": "is",
  "in": "in", "india": "in", "republic of india": "in", "indian": "in", "อินเดีย": "in", "ind": "in",
  "id": "id", "indonesia": "id", "republic of indonesia": "id", "indonesian": "id", "อินโดนีเซีย": "id", "idn": "id",
  "ir": "ir", "iran": "ir", "islamic republic of iran": "ir", "iranian": "ir", "อิหร่าน": "ir",
  "iq": "iq", "iraq": "iq", "republic of iraq": "iq", "iraqi": "iq", "อิรัก": "iq",
  "ie": "ie", "ireland": "ie", "republic of ireland": "ie", "irish": "ie", "ไอร์แลนด์": "ie", "irl": "ie",
  "il": "il", "israel": "il", "state of israel": "il", "israeli": "il", "อิสราเอล": "il",
  "it": "it", "italy": "it", "italian republic": "it", "italian": "it", "อิตาลี": "it", "ita": "it",
  "ci": "ci", "ivory coast": "ci", "republic of côte d'ivoire": "ci", "ivorian": "ci", "โกตดิวัวร์": "ci",
  "jm": "jm", "jamaica": "jm", "jamaican": "jm", "จาเมกา": "jm",
  "jp": "jp", "japan": "jp", "japanese": "jp", "ญี่ปุ่น": "jp", "jpn": "jp", "ประเทศญี่ปุ่น": "jp",
  "jo": "jo", "jordan": "jo", "hashemite kingdom of jordan": "jo", "jordanian": "jo", "จอร์แดน": "jo",
  "kz": "kz", "kazakhstan": "kz", "republic of kazakhstan": "kz", "kazakhstani": "kz", "คาซัคสถาน": "kz",
  "ke": "ke", "kenya": "ke", "republic of kenya": "ke", "kenyan": "ke", "เคนยา": "ke",
  "ki": "ki", "kiribati": "ki", "independent and sovereign republic of kiribati": "ki", "i-kiribati": "ki", "คิริบาส": "ki",
  "xk": "xk", "kosovo": "xk", "republic of kosovo": "xk", "kosovar": "xk", "โคโซโว": "xk",
  "kw": "kw", "kuwait": "kw", "state of kuwait": "kw", "kuwaiti": "kw", "คูเวต": "kw",
  "kg": "kg", "kyrgyzstan": "kg", "kyrgyz republic": "kg", "kirghiz": "kg", "คีร์กีซสถาน": "kg",
  "la": "la", "laos": "la", "lao people's democratic republic": "la", "laotian": "la", "ลาว": "la", "lao": "la",
  "lv": "lv", "latvia": "lv", "republic of latvia": "lv", "latvian": "lv", "ลัตเวีย": "lv",
  "lb": "lb", "lebanon": "lb", "lebanese republic": "lb", "lebanese": "lb", "เลบานอน": "lb",
  "ls": "ls", "lesotho": "ls", "kingdom of lesotho": "ls", "mosotho": "ls", "เลโซโท": "ls",
  "lr": "lr", "liberia": "lr", "republic of liberia": "lr", "liberian": "lr", "ไลบีเรีย": "lr",
  "ly": "ly", "libya": "ly", "state of libya": "ly", "libyan": "ly", "ลิเบีย": "ly",
  "li": "li", "liechtenstein": "li", "principality of liechtenstein": "li", "liechtensteiner": "li", "ลิกเตนสไตน์": "li",
  "lt": "lt", "lithuania": "lt", "republic of lithuania": "lt", "lithuanian": "lt", "ลิทัวเนีย": "lt",
  "lu": "lu", "luxembourg": "lu", "grand duchy of luxembourg": "lu", "luxembourger": "lu", "ลักเซมเบิร์ก": "lu",
  "mo": "mo", "macau": "mo", "macao special administrative region of the people's republic of china": "mo", "macanese": "mo", "มาเก๊า": "mo",
  "mg": "mg", "madagascar": "mg", "republic of madagascar": "mg", "malagasy": "mg", "มาดากัสการ์": "mg",
  "mw": "mw", "malawi": "mw", "republic of malawi": "mw", "malawian": "mw", "มาลาวี": "mw",
  "my": "my", "malaysia": "my", "malaysian": "my", "มาเลเซีย": "my", "mys": "my",
  "mv": "mv", "maldives": "mv", "republic of the maldives": "mv", "maldivan": "mv", "มัลดีฟส์": "mv",
  "ml": "ml", "mali": "ml", "republic of mali": "ml", "malian": "ml", "มาลี": "ml",
  "mt": "mt", "malta": "mt", "republic of malta": "mt", "maltese": "mt", "มอลตา": "mt",
  "mh": "mh", "marshall islands": "mh", "republic of the marshall islands": "mh", "marshallese": "mh", "หมู่เกาะมาร์แชลล์": "mh",
  "mr": "mr", "mauritania": "mr", "islamic republic of mauritania": "mr", "mauritanian": "mr", "มอริเตเนีย": "mr",
  "mu": "mu", "mauritius": "mu", "republic of mauritius": "mu", "mauritian": "mu", "มอริเชียส": "mu",
  "mx": "mx", "mexico": "mx", "united mexican states": "mx", "mexican": "mx", "เม็กซิโก": "mx", "mex": "mx",
  "fm": "fm", "micronesia": "fm", "federated states of micronesia": "fm", "micronesian": "fm", "ไมโครนีเซีย": "fm",
  "md": "md", "moldova": "md", "republic of moldova": "md", "moldovan": "md", "มอลโดวา": "md",
  "mc": "mc", "monaco": "mc", "principality of monaco": "mc", "monegasque": "mc", "โมนาโก": "mc",
  "mn": "mn", "mongolia": "mn", "mongolian": "mn", "มองโกเลีย": "mn",
  "me": "me", "montenegro": "me", "montenegrin": "me", "มอนเตเนโกร": "me",
  "ma": "ma", "morocco": "ma", "kingdom of morocco": "ma", "moroccan": "ma", "โมร็อกโก": "ma",
  "mz": "mz", "mozambique": "mz", "republic of mozambique": "mz", "mozambican": "mz", "โมซัมบิก": "mz",
  "mm": "mm", "myanmar": "mm", "republic of the union of myanmar": "mm", "burmese": "mm", "เมียนมา": "mm", "burma": "mm", "mmr": "mm", "พม่า": "mm",
  "na": "na", "namibia": "na", "republic of namibia": "na", "namibian": "na", "นามิเบีย": "na",
  "nr": "nr", "nauru": "nr", "republic of nauru": "nr", "nauruan": "nr", "นาอูรู": "nr",
  "np": "np", "nepal": "np", "federal democratic republic of nepal": "np", "nepalese": "np", "เนปาล": "np",
  "nl": "nl", "netherlands": "nl", "kingdom of the netherlands": "nl", "dutch": "nl", "เนเธอร์แลนด์": "nl", "holland": "nl", "nld": "nl", "ฮอลแลนด์": "nl",
  "nz": "nz", "new zealand": "nz", "new zealander": "nz", "นิวซีแลนด์": "nz", "nzl": "nz",
  "ni": "ni", "nicaragua": "ni", "republic of nicaragua": "ni", "nicaraguan": "ni", "นิการากัว": "ni",
  "ne": "ne", "niger": "ne", "republic of niger": "ne", "nigerien": "ne", "ไนเจอร์": "ne",
  "ng": "ng", "nigeria": "ng", "federal republic of nigeria": "ng", "nigerian": "ng", "ไนจีเรีย": "ng",
  "kp": "kp", "north korea": "kp", "democratic people's republic of korea": "kp", "north korean": "kp", "เกาหลีเหนือ": "kp",
  "mk": "mk", "north macedonia": "mk", "republic of north macedonia": "mk", "macedonian": "mk", "มาซิโดเนียเหนือ": "mk",
  "no": "no", "norway": "no", "kingdom of norway": "no", "norwegian": "no", "นอร์เวย์": "no", "nor": "no",
  "om": "om", "oman": "om", "sultanate of oman": "om", "omani": "om", "โอมาน": "om",
  "pk": "pk", "pakistan": "pk", "islamic republic of pakistan": "pk", "pakistani": "pk", "ปากีสถาน": "pk",
  "pw": "pw", "palau": "pw", "republic of palau": "pw", "palauan": "pw", "ปาเลา": "pw",
  "ps": "ps", "palestine": "ps", "state of palestine": "ps", "palestinian": "ps", "ปาเลสไตน์": "ps",
  "pa": "pa", "panama": "pa", "republic of panama": "pa", "panamanian": "pa", "ปานามา": "pa",
  "pg": "pg", "papua new guinea": "pg", "independent state of papua new guinea": "pg", "papua new guinean": "pg", "ปาปัวนิวกินี": "pg",
  "py": "py", "paraguay": "py", "republic of paraguay": "py", "paraguayan": "py", "ปารากวัย": "py",
  "pe": "pe", "peru": "pe", "republic of peru": "pe", "peruvian": "pe", "เปรู": "pe",
  "ph": "ph", "philippines": "ph", "republic of the philippines": "ph", "filipino": "ph", "ฟิลิปปินส์": "ph", "phl": "ph",
  "pl": "pl", "poland": "pl", "republic of poland": "pl", "polish": "pl", "โปแลนด์": "pl", "pol": "pl",
  "pt": "pt", "portugal": "pt", "portuguese republic": "pt", "portuguese": "pt", "โปรตุเกส": "pt", "prt": "pt",
  "pr": "pr", "puerto rico": "pr", "commonwealth of puerto rico": "pr", "puerto rican": "pr", "เปอร์โตริโก": "pr",
  "qa": "qa", "qatar": "qa", "state of qatar": "qa", "qatari": "qa", "กาตาร์": "qa",
  "ro": "ro", "romania": "ro", "romanian": "ro", "โรมาเนีย": "ro",
  "ru": "ru", "russia": "ru", "russian federation": "ru", "russian": "ru", "รัสเซีย": "ru", "rus": "ru",
  "rw": "rw", "rwanda": "rw", "republic of rwanda": "rw", "rwandan": "rw", "รวันดา": "rw",
  "kn": "kn", "saint kitts and nevis": "kn", "federation of saint christopher and nevis": "kn", "kittitian or nevisian": "kn", "เซนต์คิตส์และเนวิส": "kn",
  "lc": "lc", "saint lucia": "lc", "saint lucian": "lc", "เซนต์ลูเซีย": "lc",
  "vc": "vc", "saint vincent and the grenadines": "vc", "saint vincentian": "vc", "เซนต์วินเซนต์และเกรนาดีนส์": "vc",
  "ws": "ws", "samoa": "ws", "independent state of samoa": "ws", "samoan": "ws", "ซามัว": "ws",
  "sm": "sm", "san marino": "sm", "most serene republic of san marino": "sm", "sammarinese": "sm", "ซานมารีโน": "sm",
  "st": "st", "são tomé and príncipe": "st", "democratic republic of são tomé and príncipe": "st", "sao tomean": "st", "เซาตูเมและปรินซิปี": "st",
  "sa": "sa", "saudi arabia": "sa", "kingdom of saudi arabia": "sa", "saudi arabian": "sa", "ซาอุดีอาระเบีย": "sa",
  "sn": "sn", "senegal": "sn", "republic of senegal": "sn", "senegalese": "sn", "เซเนกัล": "sn",
  "rs": "rs", "serbia": "rs", "republic of serbia": "rs", "serbian": "rs", "เซอร์เบีย": "rs",
  "sc": "sc", "seychelles": "sc", "republic of seychelles": "sc", "seychellois": "sc", "เซเชลส์": "sc",
  "sl": "sl", "sierra leone": "sl", "republic of sierra leone": "sl", "sierra leonean": "sl", "เซียร์ราลีโอน": "sl",
  "sg": "sg", "singapore": "sg", "republic of singapore": "sg", "singaporean": "sg", "สิงคโปร์": "sg", "sgp": "sg",
  "sk": "sk", "slovakia": "sk", "slovak republic": "sk", "slovak": "sk", "สโลวาเกีย": "sk",
  "si": "si", "slovenia": "si", "republic of slovenia": "si", "slovene": "si", "สโลวีเนีย": "si",
  "sb": "sb", "solomon islands": "sb", "solomon islander": "sb", "หมู่เกาะโซโลมอน": "sb",
  "so": "so", "somalia": "so", "federal republic of somalia": "so", "somali": "so", "โซมาเลีย": "so",
  "za": "za", "south africa": "za", "republic of south africa": "za", "south african": "za", "แอฟริกาใต้": "za",
  "kr": "kr", "south korea": "kr", "republic of korea": "kr", "south korean": "kr", "เกาหลีใต้": "kr", "korea": "kr", "korean": "kr", "kor": "kr", "เกาหลี": "kr",
  "ss": "ss", "south sudan": "ss", "republic of south sudan": "ss", "south sudanese": "ss", "ซูดานใต้": "ss",
  "es": "es", "spain": "es", "kingdom of spain": "es", "spanish": "es", "สเปน": "es", "esp": "es",
  "lk": "lk", "sri lanka": "lk", "democratic socialist republic of sri lanka": "lk", "sri lankan": "lk", "ศรีลังกา": "lk",
  "sd": "sd", "sudan": "sd", "republic of the sudan": "sd", "sudanese": "sd", "ซูดาน": "sd",
  "sr": "sr", "suriname": "sr", "republic of suriname": "sr", "surinamer": "sr", "ซูรินาเม": "sr",
  "se": "se", "sweden": "se", "kingdom of sweden": "se", "swedish": "se", "สวีเดน": "se", "swe": "se",
  "ch": "ch", "switzerland": "ch", "swiss confederation": "ch", "swiss": "ch", "สวิตเซอร์แลนด์": "ch", "che": "ch", "สวิส": "ch",
  "sy": "sy", "syria": "sy", "syrian arab republic": "sy", "syrian": "sy", "ซีเรีย": "sy",
  "tw": "tw", "taiwan": "tw", "republic of china (taiwan)": "tw", "taiwanese": "tw", "ไต้หวัน": "tw", "twn": "tw",
  "tj": "tj", "tajikistan": "tj", "republic of tajikistan": "tj", "tadzhik": "tj", "ทาจิกิสถาน": "tj",
  "tz": "tz", "tanzania": "tz", "united republic of tanzania": "tz", "tanzanian": "tz", "แทนซาเนีย": "tz",
  "th": "th", "thailand": "th", "kingdom of thailand": "th", "thai": "th", "ไทย": "th", "ประเทศไทย": "th", "สัญชาติไทย": "th", "คนไทย": "th",
  "tl": "tl", "timor-leste": "tl", "democratic republic of timor-leste": "tl", "east timorese": "tl", "ติมอร์-เลสเต": "tl",
  "tg": "tg", "togo": "tg", "togolese republic": "tg", "togolese": "tg", "โตโก": "tg",
  "to": "to", "tonga": "to", "kingdom of tonga": "to", "tongan": "to", "ตองงา": "to",
  "tt": "tt", "trinidad and tobago": "tt", "republic of trinidad and tobago": "tt", "trinidadian": "tt", "ตรินิแดดและโตเบโก": "tt",
  "tn": "tn", "tunisia": "tn", "tunisian republic": "tn", "tunisian": "tn", "ตูนิเซีย": "tn",
  "tr": "tr", "türkiye": "tr", "republic of türkiye": "tr", "turkey": "tr", "turkish": "tr", "ตุรกี": "tr",
  "tm": "tm", "turkmenistan": "tm", "turkmen": "tm", "เติร์กเมนิสถาน": "tm",
  "tv": "tv", "tuvalu": "tv", "tuvaluan": "tv", "ตูวาลู": "tv",
  "ug": "ug", "uganda": "ug", "republic of uganda": "ug", "ugandan": "ug", "ยูกันดา": "ug",
  "ua": "ua", "ukraine": "ua", "ukrainian": "ua", "ยูเครน": "ua",
  "ae": "ae", "united arab emirates": "ae", "emirati": "ae", "สหรัฐอาหรับเอมิเรตส์": "ae",
  "gb": "gb", "united kingdom": "gb", "united kingdom of great britain and northern ireland": "gb", "british": "gb", "สหราชอาณาจักร": "gb", "uk": "gb", "great britain": "gb", "britain": "gb", "england": "gb", "gbr": "gb", "อังกฤษ": "gb",
  "us": "us", "united states": "us", "united states of america": "us", "american": "us", "สหรัฐอเมริกา": "us", "usa": "us", "america": "us", "สหรัฐ": "us", "อเมริกา": "us",
  "uy": "uy", "uruguay": "uy", "oriental republic of uruguay": "uy", "uruguayan": "uy", "อุรุกวัย": "uy",
  "uz": "uz", "uzbekistan": "uz", "republic of uzbekistan": "uz", "uzbekistani": "uz", "อุซเบกิสถาน": "uz",
  "vu": "vu", "vanuatu": "vu", "republic of vanuatu": "vu", "ni-vanuatu": "vu", "วานูอาตู": "vu",
  "va": "va", "vatican city": "va", "vatican city state": "va", "vatican": "va", "นครรัฐวาติกัน": "va",
  "ve": "ve", "venezuela": "ve", "bolivarian republic of venezuela": "ve", "venezuelan": "ve", "เวเนซุเอลา": "ve",
  "vn": "vn", "vietnam": "vn", "socialist republic of vietnam": "vn", "vietnamese": "vn", "เวียดนาม": "vn", "vnm": "vn",
  "ye": "ye", "yemen": "ye", "republic of yemen": "ye", "yemeni": "ye", "เยเมน": "ye",
  "zm": "zm", "zambia": "zm", "republic of zambia": "zm", "zambian": "zm", "แซมเบีย": "zm",
  "zw": "zw", "zimbabwe": "zw", "republic of zimbabwe": "zw", "zimbabwean": "zw", "ซิมบับเว": "zw"
};

const COUNTRY_NAMES = {
  "af": { th: "อัฟกานิสถาน", en: "Afghanistan" },
  "al": { th: "แอลเบเนีย", en: "Albania" },
  "dz": { th: "แอลจีเรีย", en: "Algeria" },
  "as": { th: "อเมริกันซามัว", en: "American Samoa" },
  "ad": { th: "อันดอร์รา", en: "Andorra" },
  "ao": { th: "แองโกลา", en: "Angola" },
  "ag": { th: "แอนติกาและบาร์บูดา", en: "Antigua and Barbuda" },
  "ar": { th: "อาร์เจนตินา", en: "Argentina" },
  "am": { th: "อาร์เมเนีย", en: "Armenia" },
  "aw": { th: "อารูบา", en: "Aruba" },
  "au": { th: "ออสเตรเลีย", en: "Australia" },
  "at": { th: "ออสเตรีย", en: "Austria" },
  "az": { th: "อาเซอร์ไบจาน", en: "Azerbaijan" },
  "bs": { th: "บาฮามาส", en: "Bahamas" },
  "bh": { th: "บาห์เรน", en: "Bahrain" },
  "bd": { th: "บังกลาเทศ", en: "Bangladesh" },
  "bb": { th: "บาร์เบโดส", en: "Barbados" },
  "by": { th: "เบลารุส", en: "Belarus" },
  "be": { th: "เบลเยียม", en: "Belgium" },
  "bz": { th: "เบลีซ", en: "Belize" },
  "bj": { th: "เบนิน", en: "Benin" },
  "bm": { th: "เบอร์มิวดา", en: "Bermuda" },
  "bt": { th: "ภูฏาน", en: "Bhutan" },
  "bo": { th: "โบลิเวีย", en: "Bolivia" },
  "ba": { th: "บอสเนียและเฮอร์เซโกวีนา", en: "Bosnia and Herzegovina" },
  "bw": { th: "บอตสวานา", en: "Botswana" },
  "br": { th: "บราซิล", en: "Brazil" },
  "vg": { th: "หมู่เกาะบริติชเวอร์จิน", en: "British Virgin Islands" },
  "bn": { th: "บรูไน", en: "Brunei" },
  "bg": { th: "บัลแกเรีย", en: "Bulgaria" },
  "bf": { th: "บูร์กินาฟาโซ", en: "Burkina Faso" },
  "bi": { th: "บุรุนดี", en: "Burundi" },
  "kh": { th: "กัมพูชา", en: "Cambodia" },
  "cm": { th: "แคเมอรูน", en: "Cameroon" },
  "ca": { th: "แคนาดา", en: "Canada" },
  "cv": { th: "เคปเวิร์ด", en: "Cape Verde" },
  "ky": { th: "หมู่เกาะเคย์แมน", en: "Cayman Islands" },
  "cf": { th: "สาธารณรัฐแอฟริกากลาง", en: "Central African Republic" },
  "td": { th: "ชาด", en: "Chad" },
  "cl": { th: "ชิลี", en: "Chile" },
  "cn": { th: "จีน", en: "China" },
  "co": { th: "โคลอมเบีย", en: "Colombia" },
  "km": { th: "คอโมโรส", en: "Comoros" },
  "cg": { th: "คองโก", en: "Congo" },
  "ck": { th: "หมู่เกาะคุก", en: "Cook Islands" },
  "cr": { th: "คอสตาริกา", en: "Costa Rica" },
  "hr": { th: "โครเอเชีย", en: "Croatia" },
  "cu": { th: "คิวบา", en: "Cuba" },
  "cy": { th: "ไซปรัส", en: "Cyprus" },
  "cz": { th: "สาธารณรัฐเช็ก", en: "Czech Republic" },
  "dk": { th: "เดนมาร์ก", en: "Denmark" },
  "dj": { th: "จิบูตี", en: "Djibouti" },
  "dm": { th: "โดมินิกา", en: "Dominica" },
  "do": { th: "สาธารณรัฐโดมินิกัน", en: "Dominican Republic" },
  "cd": { th: "สาธารณรัฐประชาธิปไตยคองโก", en: "DR Congo" },
  "ec": { th: "เอกวาดอร์", en: "Ecuador" },
  "eg": { th: "อียิปต์", en: "Egypt" },
  "sv": { th: "เอลซัลวาดอร์", en: "El Salvador" },
  "gq": { th: "อิเควทอเรียลกินี", en: "Equatorial Guinea" },
  "er": { th: "เอริเทรีย", en: "Eritrea" },
  "ee": { th: "เอสโตเนีย", en: "Estonia" },
  "sz": { th: "เอสวาตินี", en: "Eswatini" },
  "et": { th: "เอธิโอเปีย", en: "Ethiopia" },
  "fj": { th: "ฟิจิ", en: "Fiji" },
  "fi": { th: "ฟินแลนด์", en: "Finland" },
  "fr": { th: "ฝรั่งเศส", en: "France" },
  "ga": { th: "กาบอง", en: "Gabon" },
  "gm": { th: "แกมเบีย", en: "Gambia" },
  "ge": { th: "จอร์เจีย", en: "Georgia" },
  "de": { th: "เยอรมนี", en: "Germany" },
  "gh": { th: "กานา", en: "Ghana" },
  "gi": { th: "ยิบรอลตาร์", en: "Gibraltar" },
  "gr": { th: "กรีซ", en: "Greece" },
  "gl": { th: "กรีนแลนด์", en: "Greenland" },
  "gd": { th: "เกรเนดา", en: "Grenada" },
  "gu": { th: "กวม", en: "Guam" },
  "gt": { th: "กัวเตมาลา", en: "Guatemala" },
  "gn": { th: "กินี", en: "Guinea" },
  "gw": { th: "กินี-บิสเซา", en: "Guinea-Bissau" },
  "gy": { th: "กายอานา", en: "Guyana" },
  "ht": { th: "เฮติ", en: "Haiti" },
  "hn": { th: "ฮอนดูรัส", en: "Honduras" },
  "hk": { th: "ฮ่องกง", en: "Hong Kong" },
  "hu": { th: "ฮังการี", en: "Hungary" },
  "is": { th: "ไอซ์แลนด์", en: "Iceland" },
  "in": { th: "อินเดีย", en: "India" },
  "id": { th: "อินโดนีเซีย", en: "Indonesia" },
  "ir": { th: "อิหร่าน", en: "Iran" },
  "iq": { th: "อิรัก", en: "Iraq" },
  "ie": { th: "ไอร์แลนด์", en: "Ireland" },
  "il": { th: "อิสราเอล", en: "Israel" },
  "it": { th: "อิตาลี", en: "Italy" },
  "ci": { th: "โกตดิวัวร์", en: "Ivory Coast" },
  "jm": { th: "จาเมกา", en: "Jamaica" },
  "jp": { th: "ญี่ปุ่น", en: "Japan" },
  "jo": { th: "จอร์แดน", en: "Jordan" },
  "kz": { th: "คาซัคสถาน", en: "Kazakhstan" },
  "ke": { th: "เคนยา", en: "Kenya" },
  "ki": { th: "คิริบาส", en: "Kiribati" },
  "xk": { th: "โคโซโว", en: "Kosovo" },
  "kw": { th: "คูเวต", en: "Kuwait" },
  "kg": { th: "คีร์กีซสถาน", en: "Kyrgyzstan" },
  "la": { th: "ลาว", en: "Laos" },
  "lv": { th: "ลัตเวีย", en: "Latvia" },
  "lb": { th: "เลบานอน", en: "Lebanon" },
  "ls": { th: "เลโซโท", en: "Lesotho" },
  "lr": { th: "ไลบีเรีย", en: "Liberia" },
  "ly": { th: "ลิเบีย", en: "Libya" },
  "li": { th: "ลิกเตนสไตน์", en: "Liechtenstein" },
  "lt": { th: "ลิทัวเนีย", en: "Lithuania" },
  "lu": { th: "ลักเซมเบิร์ก", en: "Luxembourg" },
  "mo": { th: "มาเก๊า", en: "Macau" },
  "mg": { th: "มาดากัสการ์", en: "Madagascar" },
  "mw": { th: "มาลาวี", en: "Malawi" },
  "my": { th: "มาเลเซีย", en: "Malaysia" },
  "mv": { th: "มัลดีฟส์", en: "Maldives" },
  "ml": { th: "มาลี", en: "Mali" },
  "mt": { th: "มอลตา", en: "Malta" },
  "mh": { th: "หมู่เกาะมาร์แชลล์", en: "Marshall Islands" },
  "mr": { th: "มอริเตเนีย", en: "Mauritania" },
  "mu": { th: "มอริเชียส", en: "Mauritius" },
  "mx": { th: "เม็กซิโก", en: "Mexico" },
  "fm": { th: "ไมโครนีเซีย", en: "Micronesia" },
  "md": { th: "มอลโดวา", en: "Moldova" },
  "mc": { th: "โมนาโก", en: "Monaco" },
  "mn": { th: "มองโกเลีย", en: "Mongolia" },
  "me": { th: "มอนเตเนโกร", en: "Montenegro" },
  "ma": { th: "โมร็อกโก", en: "Morocco" },
  "mz": { th: "โมซัมบิก", en: "Mozambique" },
  "mm": { th: "เมียนมา", en: "Myanmar" },
  "na": { th: "นามิเบีย", en: "Namibia" },
  "nr": { th: "นาอูรู", en: "Nauru" },
  "np": { th: "เนปาล", en: "Nepal" },
  "nl": { th: "เนเธอร์แลนด์", en: "Netherlands" },
  "nz": { th: "นิวซีแลนด์", en: "New Zealand" },
  "ni": { th: "นิการากัว", en: "Nicaragua" },
  "ne": { th: "ไนเจอร์", en: "Niger" },
  "ng": { th: "ไนจีเรีย", en: "Nigeria" },
  "kp": { th: "เกาหลีเหนือ", en: "North Korea" },
  "mk": { th: "มาซิโดเนียเหนือ", en: "North Macedonia" },
  "no": { th: "นอร์เวย์", en: "Norway" },
  "om": { th: "โอมาน", en: "Oman" },
  "pk": { th: "ปากีสถาน", en: "Pakistan" },
  "pw": { th: "ปาเลา", en: "Palau" },
  "ps": { th: "ปาเลสไตน์", en: "Palestine" },
  "pa": { th: "ปานามา", en: "Panama" },
  "pg": { th: "ปาปัวนิวกินี", en: "Papua New Guinea" },
  "py": { th: "ปารากวัย", en: "Paraguay" },
  "pe": { th: "เปรู", en: "Peru" },
  "ph": { th: "ฟิลิปปินส์", en: "Philippines" },
  "pl": { th: "โปแลนด์", en: "Poland" },
  "pt": { th: "โปรตุเกส", en: "Portugal" },
  "pr": { th: "เปอร์โตริโก", en: "Puerto Rico" },
  "qa": { th: "กาตาร์", en: "Qatar" },
  "ro": { th: "โรมาเนีย", en: "Romania" },
  "ru": { th: "รัสเซีย", en: "Russia" },
  "rw": { th: "รวันดา", en: "Rwanda" },
  "kn": { th: "เซนต์คิตส์และเนวิส", en: "Saint Kitts and Nevis" },
  "lc": { th: "เซนต์ลูเซีย", en: "Saint Lucia" },
  "vc": { th: "เซนต์วินเซนต์และเกรนาดีนส์", en: "Saint Vincent and the Grenadines" },
  "ws": { th: "ซามัว", en: "Samoa" },
  "sm": { th: "ซานมารีโน", en: "San Marino" },
  "st": { th: "เซาตูเมและปรินซิปี", en: "São Tomé and Príncipe" },
  "sa": { th: "ซาอุดีอาระเบีย", en: "Saudi Arabia" },
  "sn": { th: "เซเนกัล", en: "Senegal" },
  "rs": { th: "เซอร์เบีย", en: "Serbia" },
  "sc": { th: "เซเชลส์", en: "Seychelles" },
  "sl": { th: "เซียร์ราลีโอน", en: "Sierra Leone" },
  "sg": { th: "สิงคโปร์", en: "Singapore" },
  "sk": { th: "สโลวาเกีย", en: "Slovakia" },
  "si": { th: "สโลวีเนีย", en: "Slovenia" },
  "sb": { th: "หมู่เกาะโซโลมอน", en: "Solomon Islands" },
  "so": { th: "โซมาเลีย", en: "Somalia" },
  "za": { th: "แอฟริกาใต้", en: "South Africa" },
  "kr": { th: "เกาหลีใต้", en: "South Korea" },
  "ss": { th: "ซูดานใต้", en: "South Sudan" },
  "es": { th: "สเปน", en: "Spain" },
  "lk": { th: "ศรีลังกา", en: "Sri Lanka" },
  "sd": { th: "ซูดาน", en: "Sudan" },
  "sr": { th: "ซูรินาเม", en: "Suriname" },
  "se": { th: "สวีเดน", en: "Sweden" },
  "ch": { th: "สวิตเซอร์แลนด์", en: "Switzerland" },
  "sy": { th: "ซีเรีย", en: "Syria" },
  "tw": { th: "ไต้หวัน", en: "Taiwan" },
  "tj": { th: "ทาจิกิสถาน", en: "Tajikistan" },
  "tz": { th: "แทนซาเนีย", en: "Tanzania" },
  "th": { th: "ไทย", en: "Thailand" },
  "tl": { th: "ติมอร์-เลสเต", en: "Timor-Leste" },
  "tg": { th: "โตโก", en: "Togo" },
  "to": { th: "ตองงา", en: "Tonga" },
  "tt": { th: "ตรินิแดดและโตเบโก", en: "Trinidad and Tobago" },
  "tn": { th: "ตูนิเซีย", en: "Tunisia" },
  "tr": { th: "ตุรกี", en: "Turkey" },
  "tm": { th: "เติร์กเมนิสถาน", en: "Turkmenistan" },
  "tv": { th: "ตูวาลู", en: "Tuvalu" },
  "ug": { th: "ยูกันดา", en: "Uganda" },
  "ua": { th: "ยูเครน", en: "Ukraine" },
  "ae": { th: "สหรัฐอาหรับเอมิเรตส์", en: "United Arab Emirates" },
  "gb": { th: "สหราชอาณาจักร", en: "United Kingdom" },
  "us": { th: "สหรัฐอเมริกา", en: "United States" },
  "uy": { th: "อุรุกวัย", en: "Uruguay" },
  "uz": { th: "อุซเบกิสถาน", en: "Uzbekistan" },
  "vu": { th: "วานูอาตู", en: "Vanuatu" },
  "va": { th: "นครรัฐวาติกัน", en: "Vatican City" },
  "ve": { th: "เวเนซุเอลา", en: "Venezuela" },
  "vn": { th: "เวียดนาม", en: "Vietnam" },
  "ye": { th: "เยเมน", en: "Yemen" },
  "zm": { th: "แซมเบีย", en: "Zambia" },
  "zw": { th: "ซิมบับเว", en: "Zimbabwe" }
};

const SORTED_COUNTRY_KEYS = Object.keys(COUNTRY_FLAG_MAP).sort((a, b) => b.length - a.length);

/**
 * Case-insensitive, robust country matching engine
 * Tolerates any casing (TH, th, tH, THAILAND, thailand, tHaIlAnD, ญี่ปุ่น, Sweden, etc.)
 */
function resolveCountryCode(input) {
  if (!input) return 'th';
  const str = String(input).trim();
  if (!str) return 'th';

  const lower = str.toLowerCase();
  // 1. Direct match in dictionary
  if (COUNTRY_FLAG_MAP[lower]) return COUNTRY_FLAG_MAP[lower];

  // 2. Stripped alphanumeric match (e.g. "U.S.A." -> "usa", "(TH)" -> "th")
  const stripped = lower.replace(/[^a-z0-9\u0E00-\u0E7F]/g, '');
  if (COUNTRY_FLAG_MAP[stripped]) return COUNTRY_FLAG_MAP[stripped];

  // 3. Cleaned punctuation & symbols
  const cleaned = lower.replace(/[()[\]{},;:.!?'"\\/|#*&^%$@~`+=\-_]/g, ' ').trim();
  if (COUNTRY_FLAG_MAP[cleaned]) return COUNTRY_FLAG_MAP[cleaned];

  // 4. Token-based word match (e.g. "TH / Thailand" -> checks "th", "thailand")
  const tokens = cleaned.split(/\s+/).filter(Boolean);
  for (const token of tokens) {
    if (COUNTRY_FLAG_MAP[token]) return COUNTRY_FLAG_MAP[token];
  }

  // 5. Substring search in order of key length (e.g. "Born in South Korea", "สัญชาติไทย")
  for (const key of SORTED_COUNTRY_KEYS) {
    if (key.length >= 3 && lower.includes(key)) {
      return COUNTRY_FLAG_MAP[key];
    }
  }

  // 6. Fallback standard 2-letter ISO
  if (/^[a-z]{2}$/.test(cleaned)) return cleaned;
  if (/^[a-z]{2}$/.test(stripped)) return stripped;

  return null;
}

/**
 * Helper to get user-facing full country display name in Thai or English
 */
function getCountryDisplayName(country, lang = null) {
  const currentLang = lang || (window.i18n ? window.i18n.getLang() : 'th');
  const code = resolveCountryCode(country);
  if (!code) return country || 'Unknown';
  if (COUNTRY_NAMES[code]) {
    return COUNTRY_NAMES[code][currentLang] || COUNTRY_NAMES[code]['en'];
  }
  return country || code.toUpperCase();
}

function isoToEmoji(code) {
  if (!code || code.length !== 2) return '🌐';
  const c = code.toUpperCase();
  return String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65, 0x1F1E6 + c.charCodeAt(1) - 65);
}

function getFlagEmoji(country) {
  const code = resolveCountryCode(country);
  if (!code) return '🌐';
  return isoToEmoji(code);
}

/**
 * Generates National Flag badge.
 * Replaces abbreviations completely with crisp, high-DPI National Flag.
 * If showName is requested, shows full localized country name (never abbreviations like TH, JP).
 */
function getCountryFlagBadge(country, options = {}) {
  const rawCountry = (country || 'Thailand').trim();
  const code = resolveCountryCode(rawCountry);
  const currentLang = (window.i18n && window.i18n.getLang()) || 'th';
  const fullName = getCountryDisplayName(code || rawCountry, currentLang);
  const showName = options.showName === true;
  
  const size = options.size || 'sm';
  let imgSizeClass = 'w-5 h-3.5';
  let badgePadding = 'px-1.5 py-0.5';
  if (size === 'xs') {
    imgSizeClass = 'w-4 h-2.5';
    badgePadding = 'px-1 py-0.5';
  } else if (size === 'md') {
    imgSizeClass = 'w-6 h-4';
    badgePadding = 'px-2 py-0.5';
  } else if (size === 'lg') {
    imgSizeClass = 'w-8 h-5.5';
    badgePadding = 'px-2.5 py-1';
  }

  if (!code) {
    if (!showName) return `<span class="text-xs align-middle" title="${rawCountry}">🌐</span>`;
    return `<span class="inline-flex items-center gap-1.5 ${badgePadding} rounded bg-slate-900/80 border border-slate-700/80 text-xs text-slate-300 align-middle" title="${rawCountry}">🌐 ${fullName}</span>`;
  }

  const flagUrl = `https://flagcdn.com/w40/${code}.png`;
  const flagUrl2x = `https://flagcdn.com/w80/${code}.png`;
  const svgUrl = `https://flagcdn.com/${code}.svg`;

  if (!showName) {
    return `<img src="${flagUrl}" srcset="${flagUrl2x} 2x" alt="${fullName}" title="${fullName}" class="${imgSizeClass} object-cover rounded-xs border border-black/10 inline-block align-middle shrink-0" loading="lazy" onerror="this.onerror=null; this.src='${svgUrl}';">`;
  }

  return `
    <span class="inline-flex items-center gap-1.5 ${badgePadding} rounded bg-slate-900/90 border border-slate-700/70 shadow-sm align-middle group/flag hover:border-amber-400/50 transition-colors" title="${fullName}">
      <img src="${flagUrl}" srcset="${flagUrl2x} 2x" alt="${fullName}" class="${imgSizeClass} object-cover rounded-xs shadow-xs border border-slate-700/80 shrink-0 inline-block align-middle" loading="lazy" onerror="this.onerror=null; this.src='${svgUrl}';">
      <span class="text-xs text-slate-200 font-medium align-middle">${fullName}</span>
    </span>
  `.trim();
}

window.resolveCountryCode = resolveCountryCode;
window.getCountryDisplayName = getCountryDisplayName;
window.getFlagEmoji = getFlagEmoji;
window.getCountryFlagBadge = getCountryFlagBadge;
