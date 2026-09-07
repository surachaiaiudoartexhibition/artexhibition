/**
 * Multi-Tenant Virtual Exhibition System
 * Client-Side Bilingual Localization Engine (TH / EN)
 */

const I18N_DICTIONARY = {
  th: {
    // Navigation
    nav_home: "หน้าแรก",
    nav_gallery: "ชมนิทรรศการ",
    nav_artists: "ทำเนียบศิลปิน",
    nav_catalog: "สูจิบัตร",
    nav_submit: "ส่งผลงาน",
    nav_admin: "ผู้ดูแลระบบ",
    nav_back_gallery: "← กลับไปยังนิทรรศการ",
    nav_sub_brand: "นิทรรศการศิลปะเสมือนจริง",

    // Home / Hero
    hero_badge: "นิทรรศการเปิดให้เข้าชมออนไลน์",
    hero_desc: "นิทรรศการภาพพิมพ์และศิลปกรรมร่วมสมัย โดยวิทยาลัยเพาะช่าง มหาวิทยาลัยเทคโนโลยีราชมงคลรัตนโกสินทร์ สถาบันศิลปะแห่งแรกของประเทศไทย พระราชทานกำเนิดโดยรัชกาลที่ ๖ พ.ศ. ๒๔๕๖",
    btn_enter_gallery: "เข้าชมนิทรรศการ (Virtual Gallery)",
    btn_artists_dir: "ทำเนียบศิลปิน",
    btn_open_catalog: "เปิดสูจิบัตรดิจิทัล",
    sec_highlights_title: "ผลงานเด่นในนิทรรศการ",
    sec_highlights_desc: "คัดเลือกผลงานที่ผ่านการคัดสรรโดยภัณฑารักษ์",
    view_all_arrow: "ดูทั้งหมด →",

    // Artists Directory
    artists_badge: "👨‍🎨 ทำเนียบศิลปินแห่งนิทรรศการ",
    artists_title_1: "ทำเนียบศิลปินและ",
    artists_title_2: "ผลงานสร้างสรรค์",
    artists_desc: "รวบรวมประวัติและผลงานของศิลปินผู้ร่วมสร้างสรรค์ผลงานในนิทรรศการ สามารถค้นหา กรองสัญชาติ และเลือกชมได้ทั้งรูปแบบการ์ดสรุปหรือตารางข้อมูล",
    search_artists_ph: "ค้นหาชื่อศิลปิน, ผลงาน, สัญชาติ, หรืออีเมล...",
    filter_all_countries: "ทุกประเทศ (All Countries)",
    sort_label: "เรียงลำดับ:",
    sort_default: "ค่าเริ่มต้น (Default)",
    sort_name_asc: "ชื่อศิลปิน (A - Z / ก - ฮ)",
    sort_name_desc: "ชื่อศิลปิน (Z - A / ฮ - ก)",
    sort_country_asc: "ตามประเทศ / สัญชาติ (A - Z)",
    sort_price_desc: "ราคาผลงาน (มากไปน้อย)",
    sort_price_asc: "ราคาผลงาน (น้อยไปมาก)",
    sort_artworks_desc: "จำนวนผลงาน (มากไปน้อย)",
    th_price: "ราคา",
    jump_artist_ph: "🎯 ไปที่ศิลปิน...",
    view_card: "การ์ด",
    view_table: "ตาราง",
    th_artist: "ศิลปิน",
    th_nationality: "สัญชาติ",
    th_works_count: "จำนวนผลงาน",
    th_technique: "เทคนิคหลัก",
    th_contact: "ติดต่อ",
    th_action: "ดำเนินการ",
    btn_view_profile: "ดูประวัติและผลงาน",
    btn_open_profile: "เปิดโปรไฟล์",
    works_suffix: "ชิ้น",
    exhibition_label: "นิทรรศการจัดแสดง",
    modal_bio_title: "ประวัติและแนวคิด (Artist Biography)",
    modal_artworks_title: "ผลงานที่ร่วมแสดงในนิทรรศการนี้",
    modal_view_artwork: "ชมนิทรรศการชิ้นนี้ →",
    modal_open_catalog_btn: "เปิดดูผลงานในสูจิบัตรดิจิทัล",
    btn_close: "ปิดหน้าต่าง",
    empty_artists: "ไม่พบข้อมูลศิลปินที่ตรงกับเงื่อนไข",
    empty_artists_sub: "ลองเปลี่ยนคำค้นหาหรือเลือกดูทุกประเทศ",
    btn_reset_filter: "ล้างการค้นหา",

    // Catalog
    catalog_nav_title: "สูจิบัตรดิจิทัล (Official E-Catalog)",
    catalog_curator_label: "ภัณฑารักษ์ (Curator)",
    catalog_period_label: "ช่วงเวลาจัดแสดง",
    catalog_foreword_badge: "Foreword",
    catalog_foreword_sub: "EXHIBITION OVERVIEW",
    catalog_foreword_title: "คำนำจากภัณฑารักษ์ (Curator's Statement)",
    catalog_foreword_p1: "ยินดีต้อนรับสู่สูจิบัตรทางการของงานนิทรรศการ ซึ่งรวบรวมผลงานภาพพิมพ์และศิลปกรรมสร้างสรรค์จากศิลปินทั้งในประเทศและนานาชาติ ผ่านกระบวนการคัดกรองอย่างเข้มข้น เพื่อนำเสนอเทคนิคที่หลากหลาย และการทดลองเชิงสหวิทยาการร่วมสมัย",
    catalog_foreword_p2: "สูจิบัตรฉบับนี้ถูกออกแบบขึ้นเพื่อเป็นบันทึกทางประวัติศาสตร์ศิลป์ รวบรวมข้อมูลจำเพาะของผลงานทุกชิ้น ควบคู่ไปกับประวัติและแนวคิดของศิลปินผู้สร้างสรรค์ เพื่อเป็นประโยชน์ต่อการศึกษา สุนทรียะ และการเผยแพร่ศิลปกรรมสู่สาธารณชน",
    catalog_committee: "คณะกรรมการจัดงานและภัณฑารักษ์",
    catalog_page_prefix: "หน้า",
    catalog_spread_label: "A4 ARTWORK SPREAD",
    artwork_num_prefix: "ผลงานศิลปกรรมลำดับที่",
    view_hi_res_gallery: "เปิดชมความละเอียดสูงในแกลเลอรี",
    lbl_artwork_meta: "ผลงานศิลปกรรม",
    spec_technique_lbl: "เทคนิค:",
    spec_dimensions_lbl: "ขนาด:",
    spec_year_lbl: "ปีที่สร้างสรรค์:",
    spec_price_lbl: "ราคา:",
    concept_title: "แนวคิดผลงาน",
    created_by_artist: "ศิลปินผู้สร้างสรรค์",
    btn_print_pdf: "พิมพ์ / บันทึก PDF",
    btn_view_all_pages: "ดูทุกหน้าเรียงกัน",
    btn_single_reader: "เปิดโหมดอ่านทีละหน้า",

    // Submit / Intake Form
    submit_badge: "🎨 ARTIST & ARTWORK INTAKE FORM",
    submit_title_1: "แบบฟอร์มลงทะเบียนศิลปินและ",
    submit_title_2: "ส่งผลงานจัดแสดง",
    submit_desc: "กรอกข้อมูลประวัติศิลปินและรายละเอียดผลงานเพื่อใช้ประกอบการพิจารณาคัดกรอง จัดหน้าทำเนียบศิลปิน และจัดพิมพ์สูจิบัตรนิทรรศการดิจิทัล",
    notice_title: "Direct-to-Cloud Unsigned Upload Architecture",
    notice_desc: "รูปภาพโปรไฟล์ศิลปินและรูปผลงานความละเอียดสูงจะถูกส่งตรงไปยัง Cloudinary เพื่อประหยัด CPU เซิร์ฟเวอร์ และจะเข้าสู่สถานะ pending รอภัณฑารักษ์ตรวจรับ",
    sec1_title: "ข้อมูลศิลปิน (Artist Profile)",
    sec1_desc: "ข้อมูลนี้จะถูกนำไปจัดทำหน้าทำเนียบศิลปิน และหน้าสูจิบัตรดิจิทัล",
    lbl_artist_portrait: "รูปตัวศิลปิน (Artist Portrait)",
    avatar_upload_prompt: "คลิกเพื่ออัปโหลด<br>รูปศิลปิน",
    avatar_ratio_hint: "สัดส่วน 1:1 แนะนำหน้าตรง / สตูดิโอ",
    lbl_artist_name: "ชื่อศิลปิน / นามปากกา",
    artist_name_ph: "เช่น กานต์รวี สุวรรณเวช (Kanrawee S.)",
    lbl_academic_title: "ตำแหน่งทางวิชาการ / ทางราชการ",
    academic_title_ph: "เช่น ศ.ดร., รศ., ผศ., ดร., อาจารย์ หรือ ตำแหน่งทางราชการ",
    hint_optional: "(ถ้ามี / Optional)",
    lbl_artist_names: "ชื่อศิลปิน / นามปากกา",
    lbl_artist_name_th: "ชื่อ-นามสกุล ภาษาไทย (Thai Name)",
    artist_name_th_ph: "เช่น กานต์รวี สุวรรณเวช",
    lbl_artist_name_en: "ชื่อ-นามสกุล ภาษาอังกฤษ (English Name)",
    artist_name_en_ph: "e.g. Kanrawee Suwannawet",
    err_artist_name_required: "กรุณากรอกชื่อศิลปินอย่างน้อย 1 ภาษา (ไทย หรือ อังกฤษ)",
    lbl_nationality: "สัญชาติ / ประเทศ (Nationality)",
    lbl_email: "อีเมลติดต่อ (Email)",
    lbl_phone: "เบอร์โทรศัพท์ (Phone)",
    lbl_bio: "ประวัติย่อศิลปิน (Artist Bio / Statement)",
    bio_ph: "ประวัติการศึกษา รางวัล ประสบการณ์สร้างสรรค์ หรือความเชี่ยวชาญเฉพาะทาง...",
    sec2_title: "ข้อมูลผลงานศิลปะ (Artwork Specifications)",
    sec2_desc: "รูปภาพผลงานหลักและรายละเอียดสเปกสำหรับจัดแสดงและลงสูจิบัตร",
    lbl_artwork_title: "ชื่อผลงาน (Artwork Title)",
    artwork_title_ph: "เช่น Silent Resonance #01",
    lbl_technique: "เทคนิค / วัสดุ (Technique / Medium)",
    technique_ph: "เช่น ภาพพิมพ์โลหะร่องลึก (Intaglio Etching)",
    lbl_dimensions: "ขนาดผลงาน (Dimensions)",
    dimensions_ph: "เช่น 60 × 80 ซม.",
    lbl_year: "ปีที่สร้างสรรค์ (Year)",
    lbl_price: "ราคาจัดจำหน่าย (Price)",
    price_ph: "เช่น 35,000 บาท หรือ N/A",
    lbl_concept: "แนวคิดผลงาน หรือ แรงบันดาลใจ (Concept / Description)",
    concept_ph: "อธิบายแรงบันดาลใจ สัญลักษณ์ที่ใช้ หรือความหมายที่ต้องการสื่อสารผ่านผลงาน...",
    lbl_artwork_image: "ไฟล์รูปภาพผลงานความละเอียดสูง (Hi-Res Artwork Image)",
    art_upload_prompt: "ลากไฟล์รูปผลงานมาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์",
    art_upload_hint: "รองรับไฟล์ JPG, PNG, WEBP (ภาพคมชัด เหมาะสำหรับจัดพิมพ์สูจิบัตร)",
    btn_cancel: "ยกเลิก",
    btn_submit_artwork: "บันทึกและส่งผลงาน (Submit)",
    success_modal_title: "ลงทะเบียนและส่งผลงานสำเร็จ!",
    success_modal_desc: "ข้อมูลศิลปินและผลงานของคุณถูกส่งเข้าระบบเรียบร้อยแล้ว",
    success_tracking: "รหัสติดตามผลงาน:",
    success_notice: "ภัณฑารักษ์จะทำการตรวจสอบข้อมูล เมื่ออนุมัติ ผลงานจะปรากฏใน ห้องนิทรรศการ, ทำเนียบศิลปิน และ สูจิบัตรดิจิทัล ทันที",
    btn_goto_artists: "ไปที่ทำเนียบศิลปิน",
    btn_goto_gallery: "ชมห้องนิทรรศการ",
    btn_submit_another: "ส่งอีกชิ้น",

    // Gallery
    gallery_hall_badge: "🏛️ VIRTUAL EXHIBITION HALL",
    gallery_title_1: "ห้องจัดแสดง",
    gallery_title_2: "ผลงานนิทรรศการ",
    gallery_desc: "ผลงานศิลปะที่ผ่านการคัดสรรจากคณะกรรมการและภัณฑารักษ์",
    search_art_ph: "ค้นหาชื่อผลงาน หรือ ศิลปิน...",
    empty_gallery: "ไม่พบผลงานที่ตรงกับเงื่อนไขการค้นหา",
    btn_submit_cta: "ส่งผลงานเข้าร่วมนิทรรศการ",
    btn_view_art: "ชม",

    // Artwork Detail
    artwork_breadcrumb_home: "หน้าแรก",
    artwork_breadcrumb_gallery: "ห้องนิทรรศการ",
    btn_open_catalog_a4: "📖 เปิดสูจิบัตร A4",
    approved_badge: "APPROVED EXHIBITION PIECE",
    view_raw_image: "เปิดดูไฟล์ภาพต้นฉบับ",
    artist_tag_label: "ศิลปินผู้สร้างสรรค์",
    view_in_artists_dir: "ดูข้อมูลในทำเนียบศิลปิน →",

    // Admin
    admin_title: "ตรวจสอบและตรวจรับผลงาน (Curation)",
    admin_desc: "เมื่อกดอนุมัติ (Approve) ระบบจะอัปเดตสถานะใน D1 ประจำงาน และส่ง Webhook ข้อมูลไปยัง Master Portal อัตโนมัติ",
    tab_pending: "รอการตรวจสอบ (Pending)",
    tab_approved: "อนุมัติแล้ว (Approved)",
    tab_rejected: "ปฏิเสธ (Rejected)",
    tab_all: "ทั้งหมด",
    btn_approve: "อนุมัติ & Push Webhook",
    btn_reject: "ปฏิเสธ",
    btn_delete_artwork: "ลบผลงาน",
    btn_delete_artist: "ลบศิลปินและผลงานทั้งหมด",
    confirm_delete_artwork: "คุณแน่ใจหรือไม่ว่าต้องการลบผลงานชิ้นนี้อย่างถาวร? (การลบนี้ไม่สามารถย้อนกลับได้)",
    confirm_delete_artist: "คุณแน่ใจหรือไม่ว่าต้องการลบศิลปินท่านนี้ พร้อมผลงานทั้งหมดที่เกี่ยวข้องอย่างถาวร?",
    toast_deleted_artwork: "ลบผลงานสำเร็จ",
    toast_deleted_artist: "ลบศิลปินและผลงานสำเร็จ",
    btn_view_live: "ดูหน้าผลงานจริง ↗",
    btn_crop_rotate: "แต่งรูป (Crop/Rotate)",
    modal_crop_title: "เครื่องมือตกแต่งและตัดขอบรูปภาพผลงาน",
    btn_rotate_left: "หมุนซ้าย 90°",
    btn_rotate_right: "หมุนขวา 90°",
    btn_flip_h: "กลับแนวนอน",
    btn_flip_v: "กลับแนวตั้ง",
    ratio_free: "อิสระ (Free)",
    ratio_square: "1:1 จัตุรัส",
    label_rotation_free: "หมุนภาพอิสระ (Straighten):",
    btn_reset_angle: "ตั้งเป็น 0°",
    btn_save_cropped: "บันทึกภาพที่แก้ไข",
    lbl_crop_size: "ขนาดตัดภาพ:",
    btn_reset_crop: "รีเซ็ตทั้งหมด (Reset)",
    aspect_ratio_label: "สัดส่วน:",
    admin_key_label: "รหัสผู้ดูแล:",

    // Common & App
    app_loading: "กำลังโหลดข้อมูล...",
    app_error: "เกิดข้อผิดพลาด:",
    by_artist: "โดย",
    view_details_arrow: "ชมรายละเอียด →",
    footer_text: "วิทยาลัยเพาะช่าง มหาวิทยาลัยเทคโนโลยีราชมงคลรัตนโกสินทร์ • สถาบันศิลปะแห่งแรกของสยามประเทศ (Est. 1913)",
    footer_copyright: "© 2026 วิทยาลัยเพาะช่าง มทร.รัตนโกสินทร์ • ถนนตรีเพชร พระนคร กรุงเทพฯ",
    artists_count_unit: "ท่าน",
    works_count_unit: "ชิ้น",
    nav_event_default: "นิทรรศการศิลปกรรม วิทยาลัยเพาะช่าง ๒๕๖๙",

    // Navigation Subtitles
    nav_sub_index: "วิทยาลัยเพาะช่าง มทร.รัตนโกสินทร์",
    nav_sub_gallery: "หอศิลป์เพาะช่าง • ห้องจัดแสดง",
    nav_sub_artists: "ทำเนียบศิลปินเพาะช่าง",
    nav_sub_artwork: "รายละเอียดผลงาน",
    nav_sub_catalog: "สูจิบัตรดิจิทัล A4",
    nav_sub_submit: "ลงทะเบียนศิลปิน",
    nav_sub_admin: "ระบบจัดการและตรวจรับผลงาน",

    // Loading, Fallback & Error States
    loading_artworks: "กำลังโหลดข้อมูลผลงานและประวัติศิลปิน...",
    loading_artists: "กำลังโหลดทำเนียบศิลปิน...",
    loading_catalog: "กำลังรวบรวมข้อมูลจัดทำสูจิบัตรดิจิทัล...",
    loading_submissions: "กำลังโหลดรายการผลงาน...",
    art_not_found_title: "ไม่พบผลงานที่ต้องการ",
    art_not_found_desc: "ผลงานอาจยังอยู่ระหว่างการตรวจสอบ หรือไม่มีอยู่ในระบบ",
    no_artwork_desc: "ไม่มีคำอธิบายแนวคิดเพิ่มเติม",
    no_artist_bio: "ศิลปินผู้ร่วมจัดแสดงผลงานในนิทรรศการนี้",
    dimensions_na: "ไม่ระบุ",
    price_na: "ไม่ได้ระบุราคา",
    link_copied: "คัดลอกลิงก์ผลงานแล้ว!",
    btn_share_artwork: "แชร์ผลงาน",
    btn_back_home: "กลับหน้าแรก",
    btn_refresh: "รีเฟรชข้อมูล",

    // Submit Form Additions
    err_artwork_file_required: "กรุณาเลือกไฟล์รูปภาพผลงาน",
    status_uploading_avatar: "กำลังอัปโหลดรูปภาพศิลปิน...",
    status_uploading_artwork: "กำลังอัปโหลดรูปภาพผลงาน...",
    status_saving: "กำลังบันทึกข้อมูลเข้าสู่ระบบ...",
    err_save_failed: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",

    // Admin Dashboard Additions
    empty_status_artworks: "ไม่มีผลงานในสถานะนี้",
    refine_translation_title: "ปรับปรุง / เกลาคำแปลสองภาษา",
    lbl_title_th: "ชื่อผลงาน (ไทย / TH)",
    lbl_title_en: "ชื่อผลงาน (อังกฤษ / EN)",
    lbl_academic_th: "ตำแหน่งทางวิชาการ/ราชการ (ไทย / TH)",
    lbl_academic_en: "Academic Title (EN)",
    lbl_name_th: "ชื่อศิลปิน (ไทย / TH)",
    lbl_name_en: "Artist Name (EN)",
    lbl_technique_th: "เทคนิค (ไทย / TH)",
    lbl_technique_en: "Technique (EN)",
    lbl_desc_th: "แนวคิดผลงาน (ไทย / TH)",
    lbl_desc_en: "Artist Statement / Concept (EN)",
    lbl_bio_th: "ประวัติศิลปิน (ไทย / TH)",
    lbl_bio_en: "Artist Bio (EN)",
    btn_save_edits: "บันทึกการแก้ไข",
    btn_edit_translation: "เกลาคำแปล",
    status_saving_image: "กำลังบันทึกภาพ...",
    toast_crop_saved: "บันทึกรูปภาพที่ตกแต่งตัดขอบเรียบร้อยแล้ว",
    toast_approved: "อนุมัติผลงานเรียบร้อยแล้ว",
    toast_rejected: "ปฏิเสธผลงานแล้ว",
    confirm_approve: "ยืนยันการอนุมัติผลงาน และส่งข้อมูลไปยังเว็บท่าหรือไม่?",
    confirm_reject: "ต้องการปฏิเสธผลงานนี้ใช่หรือไม่?",

    // Catalog Additions
    catalog_cover_badge: "Official Curated Art Exhibition",
    catalog_cover_title_1: "นิทรรศการภาพพิมพ์ร่วมสมัยนานาชาติ",
    catalog_cover_title_2: "PRINTMAKING 2026",
    catalog_cover_sub: "นิทรรศการภาพพิมพ์ร่วมสมัยและศิลปกรรมเสมือนจริงระดับนานาชาติ",
    catalog_cover_meta: "EXHIBITION CATALOG & ARTIST DIRECTORY",
    catalog_chief_curator: "ประธานภัณฑารักษ์และคณะกรรมการ",
    catalog_edition_label: "ฉบับนิทรรศการเสมือนจริง 2026",
    catalog_foreword_label: "คำนำ (Foreword)",
    catalog_overview_label: "ภาพรวมนิทรรศการ (EXHIBITION OVERVIEW)",
    catalog_footer_title: "นิทรรศการภาพพิมพ์ร่วมสมัยนานาชาติ 2026",
    catalog_load_error: "เกิดข้อผิดพลาดในการโหลดสูจิบัตร:",

    // Catalog Studio Additions
    btn_edit_catalog_layout: "⚙️ จัดหน้าสูจิบัตร",
    catalog_studio_title: "เครื่องมือจัดหน้าสูจิบัตรดิจิทัล (Curator Studio)",
    tab_page_order: "จัดลำดับหน้าผลงาน",
    tab_edit_cover: "ปรับแต่งหน้าปก (Cover)",
    tab_edit_foreword: "คำนำภัณฑารักษ์ (Foreword)",
    tab_layout_style: "รูปแบบและการจัดวาง",
    btn_save_catalog_layout: "บันทึกการจัดหน้า",
    toast_catalog_saved: "บันทึกการจัดหน้าสูจิบัตรเรียบร้อยแล้ว",
    btn_move_up: "เลื่อนขึ้น",
    btn_move_down: "เลื่อนลง",
    badge_included: "แสดงในสูจิบัตร",
    badge_excluded: "ซ่อนจากสูจิบัตร",
    layout_classic_split: "Classic Split (รูปซ้าย ข้อมูลขวา)",
    layout_hero_top: "Hero Showcase (รูปใหญ่เด่นบน ข้อมูลล่าง)",
    theme_luxury_dark: "Luxury Dark (ธีมมืดหรูหรา)",
    theme_fine_white: "Fine Art White (ธีมขาวสะอาดตา)",
    nav_catalog_layout: "📖 จัดหน้าสูจิบัตร",
    lbl_cover_badge: "ป้ายข้อความบนหน้าปก",
    lbl_cover_title1_th: "ชื่อนิทรรศการ บรรทัดที่ 1 (ไทย)",
    lbl_cover_title1_en: "Exhibition Title Line 1 (EN)",
    lbl_cover_title2_th: "ชื่อนิทรรศการ บรรทัดที่ 2 (ไทย)",
    lbl_cover_title2_en: "Exhibition Title Line 2 (EN)",
    lbl_cover_sub_th: "คำบรรยายนิทรรศการ (ไทย)",
    lbl_cover_sub_en: "Exhibition Subtitle (EN)",
    lbl_curator_name_th: "ประธานภัณฑารักษ์ / ผู้จัดงาน (ไทย)",
    lbl_curator_name_en: "Curator / Committee (EN)",
    lbl_edition_th: "ฉบับสูจิบัตร (ไทย)",
    lbl_edition_en: "Edition Label (EN)",
    lbl_foreword_title_th: "หัวข้อคำนำ (ไทย)",
    lbl_foreword_title_en: "Foreword Title (EN)",
    lbl_foreword_p1_th: "เนื้อหาคำนำ ย่อหน้า 1 (ไทย)",
    lbl_foreword_p1_en: "Foreword Paragraph 1 (EN)",
    lbl_foreword_p2_th: "เนื้อหาคำนำ ย่อหน้า 2 (ไทย)",
    lbl_foreword_p2_en: "Foreword Paragraph 2 (EN)",
    lbl_foreword_sign_th: "ลงชื่อคณะทำงาน (ไทย)",
    lbl_foreword_sign_en: "Committee Sign-off (EN)",
    catalog_admin_prompt: "กรุณาระบุ Admin Key เพื่อเปิดโหมดจัดหน้าสูจิบัตร:",

    // Freeform Grid Designer & Element Visibility
    studio_tab_grid: "📐 จัดหน้าอิสระ & Grid",
    lbl_toggle_elements: "เลือกข้อมูลที่จะแสดงในหน้าผลงาน (Field Visibility)",
    toggle_show_title: "ชื่อผลงาน (Artwork Title)",
    toggle_show_artist: "ชื่อศิลปิน & ตำแหน่ง (Artist & Title)",
    toggle_show_flag: "ธงชาติ / ประเทศ (Country Flag)",
    toggle_show_technique: "เทคนิค (Technique)",
    toggle_show_dimensions: "ขนาดผลงาน (Dimensions)",
    toggle_show_year: "ปีที่สร้างสรรค์ (Year Created)",
    toggle_show_price: "ราคาผลงาน (Price)",
    toggle_show_concept: "แนวความคิด / คำบรรยาย (Concept Statement)",
    toggle_show_avatar: "รูปภาพศิลปิน (Artist Photo)",
    toggle_show_view_link: "ลิงก์ชมภาพความละเอียดสูง (High-Res Link)",
    toggle_show_page_num: "เลขผลงานและเลขหน้า (Artwork & Page Number)",
    grid_toggle_show: "แสดงเส้น Grid ช่วยจัดวาง",
    grid_toggle_snap: "ดูดจับเส้นตาราง (Snap to Grid)",
    grid_preset_split: "พรีเซ็ต: ซ้ายภาพ ขวาข้อมูล (Classic Split)",
    grid_preset_hero: "พรีเซ็ต: ภาพเด่นบน ข้อมูลล่าง (Hero Top)",
    grid_preset_center: "พรีเซ็ต: ภาพกึ่งกลาง ข้อมูลกระชับ (Minimal Center)",
    grid_preset_asymmetric: "พรีเซ็ต: อสมมาตรสไตล์สิ่งพิมพ์ (Editorial)",
    grid_instruction: "💡 คลิกและลากบล็อกบนหน้า A4 จำลองเพื่อจัดวางตำแหน่ง ระบบจะดูดจับตามเส้น Grid",
    block_image: "🖼️ รูปภาพผลงาน",
    block_meta: "📋 ชื่อผลงานและข้อมูลจำเพาะ",
    block_concept: "💬 แนวความคิดผลงาน",
    block_artist: "👤 ศิลปินและธงชาติ",

    // Admin Catalog Designer Studio
    designer_studio_title: "สตูดิโอจัดหน้าสูจิบัตรอิสระ (Catalog Designer Studio)",
    designer_admin_lock: "ระบบความปลอดภัย: เฉพาะผู้ดูแลระบบ (Admin Only)",
    designer_enter_key: "กรุณาระบุ Admin Key เพื่อเข้าจัดการสตูดิโอจัดหน้าสูจิบัตร",
    designer_auth_failed: "รหัส Admin Key ไม่ถูกต้อง ไม่อนุญาตให้เข้าใช้งาน",
    designer_unlock_page: "ปลดล็อคจัดเฉพาะหน้านี้",
    designer_custom_page_active: "✨ หน้านี้จัดเลย์เอาต์เฉพาะ",
    designer_reset_master: "คืนค่าแม่แบบหลัก",
    designer_add_element: "เพิ่มองค์ประกอบ",
    designer_save_btn: "บันทึกเลย์เอาต์",
    designer_preview_all: "ดูทุกหน้า",
    designer_zoom: "ซูม",
    designer_snap_grid: "ดูดจับเส้นตาราง (Snap)",
    designer_show_grid: "แสดง Grid",
    designer_show_margins: "แสดงระยะขอบ (Margin)",
    designer_preset: "ชุดจัดหน้าสำเร็จรูป",
    designer_save_success: "บันทึกเลย์เอาต์สูจิบัตรลงระบบเรียบร้อยแล้ว",
    designer_inspector_title: "คุณสมบัติบล็อกที่เลือก",
    designer_back_to_admin: "กลับหน้าแดชบอร์ดแอดมิน",
    designer_back_to_catalog: "เปิดดูสูจิบัตรจริง"
  },

  en: {
    // Navigation
    nav_home: "Home",
    nav_gallery: "Exhibition",
    nav_artists: "Artists",
    nav_catalog: "Catalog",
    nav_submit: "Submit",
    nav_admin: "Admin",
    nav_back_gallery: "← Back to Exhibition",
    nav_sub_brand: "Virtual Fine Art Exhibition",

    // Home / Hero
    hero_badge: "Virtual Exhibition Now Open",
    hero_desc: "International contemporary art & printmaking exhibition curated by Poh-Chang Academy of Arts, the first art academy in Thailand, established in 1913 by King Rama VI.",
    btn_enter_gallery: "Explore Virtual Gallery",
    btn_artists_dir: "Artists Directory",
    btn_open_catalog: "View Digital Catalog",
    sec_highlights_title: "Exhibition Highlights",
    sec_highlights_desc: "Selected works curated by the exhibition committee",
    view_all_arrow: "View All →",

    // Artists Directory
    artists_badge: "👨‍🎨 Exhibition Artists Directory",
    artists_title_1: "Directory of Artists & ",
    artists_title_2: "Creative Works",
    artists_desc: "Comprehensive directory of participating artists and their works. Search, filter by nationality, and explore in grid card or table view.",
    search_artists_ph: "Search artist name, artwork, nationality, email...",
    filter_all_countries: "All Countries",
    sort_label: "Sort by:",
    sort_default: "Default Order",
    sort_name_asc: "Artist Name (A - Z)",
    sort_name_desc: "Artist Name (Z - A)",
    sort_country_asc: "Country / Nationality (A - Z)",
    sort_price_desc: "Artwork Price (High to Low)",
    sort_price_asc: "Artwork Price (Low to High)",
    sort_artworks_desc: "Artworks Count (High to Low)",
    th_price: "Price",
    jump_artist_ph: "🎯 Jump to Artist...",
    view_card: "Cards",
    view_table: "Table",
    th_artist: "Artist",
    th_nationality: "Nationality",
    th_works_count: "Artworks",
    th_technique: "Primary Medium",
    th_contact: "Contact",
    th_action: "Action",
    btn_view_profile: "View Profile & Works",
    btn_open_profile: "Open Profile",
    works_suffix: "works",
    exhibition_label: "Participating Exhibition",
    modal_bio_title: "Artist Biography & Statement",
    modal_artworks_title: "Participating Artworks in this Exhibition",
    modal_view_artwork: "View Artwork Detail →",
    modal_open_catalog_btn: "View Artwork in Digital Catalog",
    btn_close: "Close",
    empty_artists: "No artists found matching your criteria",
    empty_artists_sub: "Try adjusting your search query or selecting all countries",
    btn_reset_filter: "Clear Search",

    // Catalog
    catalog_nav_title: "Digital Exhibition Catalog (A4)",
    catalog_curator_label: "Chief Curator",
    catalog_period_label: "Exhibition Period",
    catalog_foreword_badge: "Foreword",
    catalog_foreword_sub: "EXHIBITION OVERVIEW",
    catalog_foreword_title: "Curator's Statement & Introduction",
    catalog_foreword_p1: "Welcome to the official curated catalog of this exhibition, celebrating diverse artistic voices and techniques from local and international creators across traditional and experimental printmaking.",
    catalog_foreword_p2: "This digital catalog is designed as an art-historical record, documenting artwork specifications alongside artist statements to foster education, aesthetic appreciation, and cultural exchange.",
    catalog_committee: "Exhibition Organizing Committee & Curators",
    catalog_page_prefix: "Page",
    catalog_spread_label: "A4 ARTWORK SPREAD",
    artwork_num_prefix: "Artwork No.",
    view_hi_res_gallery: "View High Resolution in Gallery",
    lbl_artwork_meta: "Artwork Details",
    spec_technique_lbl: "Medium / Technique:",
    spec_dimensions_lbl: "Dimensions:",
    spec_year_lbl: "Year Created:",
    spec_price_lbl: "Price:",
    concept_title: "Artist Statement",
    created_by_artist: "Created by Artist",
    btn_print_pdf: "Print / Save PDF",
    btn_view_all_pages: "View All Pages",
    btn_single_reader: "Single Page Reader",

    // Submit / Intake Form
    submit_badge: "🎨 ARTIST & ARTWORK INTAKE FORM",
    submit_title_1: "Artist Registration & ",
    submit_title_2: "Artwork Submission",
    submit_desc: "Register artist details and artwork specifications for screening, directory cataloging, and official digital booklet publication.",
    notice_title: "Direct-to-Cloud Unsigned Upload Architecture",
    notice_desc: "Artist portraits and hi-res artworks are uploaded directly to Cloudinary without consuming server CPU. Submissions enter 'pending' status for curator moderation.",
    sec1_title: "Artist Information (Artist Profile)",
    sec1_desc: "This information will be featured in the official artists directory and catalog.",
    lbl_artist_portrait: "Artist Portrait (Photo)",
    avatar_upload_prompt: "Click to upload<br>artist portrait",
    avatar_ratio_hint: "1:1 ratio recommended (portrait / studio photo)",
    lbl_artist_name: "Artist Name / Pseudonym",
    artist_name_ph: "e.g., Kanrawee Suwanwech (Kanrawee S.)",
    lbl_academic_title: "Academic / Official Title",
    academic_title_ph: "e.g., Prof. Dr., Assoc. Prof., Asst. Prof., Dr., etc.",
    hint_optional: "(Optional)",
    lbl_artist_names: "Artist Name / Alias",
    lbl_artist_name_th: "Artist Name (Thai)",
    artist_name_th_ph: "e.g. กานต์รวี สุวรรณเวช",
    lbl_artist_name_en: "Artist Name (English)",
    artist_name_en_ph: "e.g. Kanrawee Suwannawet",
    err_artist_name_required: "Please provide the artist name in at least one language (Thai or English)",
    lbl_nationality: "Nationality / Country",
    lbl_email: "Email Address",
    lbl_phone: "Phone Number",
    lbl_bio: "Artist Biography / Statement",
    bio_ph: "Education, awards, exhibitions, background, and artistic philosophy...",
    sec2_title: "Artwork Specifications",
    sec2_desc: "High-resolution artwork file and catalog metadata.",
    lbl_artwork_title: "Artwork Title",
    artwork_title_ph: "e.g., Silent Resonance #01",
    lbl_technique: "Technique / Medium",
    technique_ph: "e.g., Intaglio Etching on Cotton Paper",
    lbl_dimensions: "Dimensions (cm)",
    dimensions_ph: "e.g., 60 × 80 cm",
    lbl_year: "Year Created",
    lbl_price: "Sale Price / Status",
    price_ph: "e.g., 35,000 THB or Not for sale",
    lbl_concept: "Artwork Concept / Description",
    concept_ph: "Describe the concept, symbolism, or creative inspiration behind this work...",
    lbl_artwork_image: "Hi-Res Artwork Image File",
    art_upload_prompt: "Drag and drop artwork image here, or click to browse",
    art_upload_hint: "Supports JPG, PNG, WEBP (Hi-res, suitable for A4 catalog publication)",
    btn_cancel: "Cancel",
    btn_submit_artwork: "Save & Submit Artwork",
    success_modal_title: "Submission Received Successfully!",
    success_modal_desc: "Your artist details and artwork have been saved to the database.",
    success_tracking: "Tracking ID:",
    success_notice: "Curators will review your work. Upon approval, it will automatically appear in the Exhibition Gallery, Artists Directory, and E-Catalog.",
    btn_goto_artists: "Go to Artists Directory",
    btn_goto_gallery: "View Exhibition Gallery",
    btn_submit_another: "Submit Another Work",

    // Gallery
    gallery_hall_badge: "🏛️ VIRTUAL EXHIBITION HALL",
    gallery_title_1: "Virtual ",
    gallery_title_2: "Exhibition Gallery",
    gallery_desc: "Selected works curated by the exhibition committee and curators",
    search_art_ph: "Search artwork title or artist name...",
    empty_gallery: "No artworks match your search query",
    btn_submit_cta: "Submit an Artwork to Exhibition",
    btn_view_art: "View",

    // Artwork Detail
    artwork_breadcrumb_home: "Home",
    artwork_breadcrumb_gallery: "Gallery",
    btn_open_catalog_a4: "📖 Open A4 Catalog",
    approved_badge: "APPROVED EXHIBITION PIECE",
    view_raw_image: "Open Original High-Res File",
    artist_tag_label: "Created by Artist",
    view_in_artists_dir: "View in Artists Directory →",

    // Admin
    admin_title: "Artwork Screening & Moderation (Curation)",
    admin_desc: "Upon approval, the status will update in D1 and trigger a webhook synchronization to the Master Portal automatically.",
    tab_pending: "Pending Review",
    tab_approved: "Approved",
    tab_rejected: "Rejected",
    tab_all: "All Works",
    btn_approve: "Approve & Push Webhook",
    btn_reject: "Reject",
    btn_delete_artwork: "Delete Artwork",
    btn_delete_artist: "Delete Artist & All Artworks",
    confirm_delete_artwork: "Are you sure you want to permanently delete this artwork? (This action cannot be undone)",
    confirm_delete_artist: "Are you sure you want to permanently delete this artist along with all associated artworks?",
    toast_deleted_artwork: "Artwork deleted successfully",
    toast_deleted_artist: "Artist and artworks deleted successfully",
    btn_view_live: "View Live Artwork ↗",
    btn_crop_rotate: "Crop / Rotate",
    modal_crop_title: "Artwork Crop & Rotate Tool",
    btn_rotate_left: "Rotate -90°",
    btn_rotate_right: "Rotate +90°",
    btn_flip_h: "Flip Horizontal",
    btn_flip_v: "Flip Vertical",
    ratio_free: "Free Crop",
    ratio_square: "1:1 Square",
    label_rotation_free: "Straighten / Rotate:",
    btn_reset_angle: "Set 0°",
    btn_save_cropped: "Save Edited Image",
    lbl_crop_size: "Crop size:",
    btn_reset_crop: "Reset All",
    aspect_ratio_label: "Aspect ratio:",
    admin_key_label: "Admin Key:",

    // Common & App
    app_loading: "Loading data...",
    app_error: "An error occurred:",
    by_artist: "by",
    view_details_arrow: "View Details →",
    footer_text: "Multi-Tenant Virtual Exhibition System • Zero-Budget Architecture (Cloudflare Pages + D1 + Cloudinary)",
    footer_copyright: "© 2026 Virtual Exhibition Platform. All artworks copyright of their respective artists.",
    artists_count_unit: "Artists",
    works_count_unit: "works",
    nav_event_default: "Poh-Chang Contemporary Art Exhibition 2026",

    // Navigation Subtitles
    nav_sub_index: "Poh-Chang Academy of Arts, RMUTR",
    nav_sub_gallery: "Virtual Exhibition Hall",
    nav_sub_artists: "Artists Directory",
    nav_sub_artwork: "Artwork Detail",
    nav_sub_catalog: "Digital A4 Catalog",
    nav_sub_submit: "Artist Registration",
    nav_sub_admin: "Curation & Moderation Dashboard",

    // Loading, Fallback & Error States
    loading_artworks: "Loading artwork details and artist profile...",
    loading_artists: "Loading artists directory...",
    loading_catalog: "Compiling digital catalog spreads...",
    loading_submissions: "Loading submissions list...",
    art_not_found_title: "Artwork Not Found",
    art_not_found_desc: "This artwork may still be pending review or does not exist in the system.",
    no_artwork_desc: "No concept statement provided.",
    no_artist_bio: "Exhibiting artist in this international exhibition.",
    dimensions_na: "Not specified",
    price_na: "Price on request",
    link_copied: "Artwork link copied to clipboard!",
    btn_share_artwork: "Share Artwork",
    btn_back_home: "Back to Home",
    btn_refresh: "Refresh Data",

    // Submit Form Additions
    err_artwork_file_required: "Please select an artwork image file",
    status_uploading_avatar: "Uploading artist portrait...",
    status_uploading_artwork: "Uploading artwork image...",
    status_saving: "Saving submission data...",
    err_save_failed: "Error saving submission",

    // Admin Dashboard Additions
    empty_status_artworks: "No artworks in this status",
    refine_translation_title: "Refine Bilingual Translation",
    lbl_title_th: "Artwork Title (TH)",
    lbl_title_en: "Artwork Title (EN)",
    lbl_academic_th: "Academic Title (TH)",
    lbl_academic_en: "Academic Title (EN)",
    lbl_name_th: "Artist Name (TH)",
    lbl_name_en: "Artist Name (EN)",
    lbl_technique_th: "Technique (TH)",
    lbl_technique_en: "Technique (EN)",
    lbl_desc_th: "Concept / Description (TH)",
    lbl_desc_en: "Artist Statement / Concept (EN)",
    lbl_bio_th: "Artist Bio (TH)",
    lbl_bio_en: "Artist Bio (EN)",
    btn_save_edits: "Save Changes",
    btn_edit_translation: "Edit Translation",
    status_saving_image: "Saving image...",
    toast_crop_saved: "Cropped artwork image saved successfully",
    toast_approved: "Artwork approved successfully",
    toast_rejected: "Artwork rejected",
    confirm_approve: "Confirm approval and push to Master Portal?",
    confirm_reject: "Are you sure you want to reject this artwork?",

    // Catalog Additions
    catalog_cover_badge: "Official Curated Art Exhibition",
    catalog_cover_title_1: "INTERNATIONAL CONTEMPORARY",
    catalog_cover_title_2: "PRINTMAKING 2026",
    catalog_cover_sub: "International Contemporary Printmaking & Virtual Art Exhibition",
    catalog_cover_meta: "EXHIBITION CATALOG & ARTIST DIRECTORY",
    catalog_chief_curator: "Chief Curator & Committee",
    catalog_edition_label: "2026 Virtual Edition",
    catalog_foreword_label: "Foreword",
    catalog_overview_label: "EXHIBITION OVERVIEW",
    catalog_footer_title: "International Contemporary Printmaking 2026",
    catalog_load_error: "Error loading catalog:",

    // Catalog Studio Additions
    btn_edit_catalog_layout: "⚙️ Layout Studio",
    catalog_studio_title: "Catalog Layout Studio & Organizer",
    tab_page_order: "Page Order & Artworks",
    tab_edit_cover: "Front Cover",
    tab_edit_foreword: "Curator Foreword",
    tab_layout_style: "Layout & Themes",
    btn_save_catalog_layout: "Save Catalog Layout",
    toast_catalog_saved: "Catalog layout saved successfully",
    btn_move_up: "Move Up",
    btn_move_down: "Move Down",
    badge_included: "Included",
    badge_excluded: "Hidden",
    layout_classic_split: "Classic Split (Left Image, Right Specs)",
    layout_hero_top: "Hero Showcase (Top Image, Bottom Specs)",
    theme_luxury_dark: "Luxury Dark Theme",
    theme_fine_white: "Fine Art White Theme",
    nav_catalog_layout: "📖 Catalog Layout",
    lbl_cover_badge: "Cover Top Badge",
    lbl_cover_title1_th: "Exhibition Title Line 1 (TH)",
    lbl_cover_title1_en: "Exhibition Title Line 1 (EN)",
    lbl_cover_title2_th: "Exhibition Title Line 2 (TH)",
    lbl_cover_title2_en: "Exhibition Title Line 2 (EN)",
    lbl_cover_sub_th: "Exhibition Subtitle (TH)",
    lbl_cover_sub_en: "Exhibition Subtitle (EN)",
    lbl_curator_name_th: "Curator / Committee (TH)",
    lbl_curator_name_en: "Curator / Committee (EN)",
    lbl_edition_th: "Edition Label (TH)",
    lbl_edition_en: "Edition Label (EN)",
    lbl_foreword_title_th: "Foreword Title (TH)",
    lbl_foreword_title_en: "Foreword Title (EN)",
    lbl_foreword_p1_th: "Foreword Paragraph 1 (TH)",
    lbl_foreword_p1_en: "Foreword Paragraph 1 (EN)",
    lbl_foreword_p2_th: "Foreword Paragraph 2 (TH)",
    lbl_foreword_p2_en: "Foreword Paragraph 2 (EN)",
    lbl_foreword_sign_th: "Committee Sign-off (TH)",
    lbl_foreword_sign_en: "Committee Sign-off (EN)",
    catalog_admin_prompt: "Enter Admin Key to access Catalog Layout Studio:",

    // Freeform Grid Designer & Element Visibility
    studio_tab_grid: "📐 Freeform Grid Layout",
    lbl_toggle_elements: "Choose visible artwork fields (Field Visibility)",
    toggle_show_title: "Artwork Title",
    toggle_show_artist: "Artist Name & Title",
    toggle_show_flag: "Country Flag",
    toggle_show_technique: "Technique / Medium",
    toggle_show_dimensions: "Dimensions",
    toggle_show_year: "Year Created",
    toggle_show_price: "Price",
    toggle_show_concept: "Concept Statement",
    toggle_show_avatar: "Artist Photo",
    toggle_show_view_link: "High-Res Gallery Link",
    toggle_show_page_num: "Artwork & Page Number",
    grid_toggle_show: "Show Grid Guides",
    grid_toggle_snap: "Snap to Grid",
    grid_preset_split: "Preset: Classic Split (Left / Right)",
    grid_preset_hero: "Preset: Hero Showcase (Top / Bottom)",
    grid_preset_center: "Preset: Minimalist Center",
    grid_preset_asymmetric: "Preset: Editorial Asymmetric",
    grid_instruction: "💡 Click and drag blocks on the A4 canvas to position them. Blocks snap to grid lines.",
    block_image: "🖼️ Artwork Image",
    block_meta: "📋 Title & Specs",
    block_concept: "💬 Concept Statement",
    block_artist: "👤 Artist & Flag",

    // Admin Catalog Designer Studio
    designer_studio_title: "Freeform Catalog Designer Studio",
    designer_admin_lock: "Security: Admin Access Only",
    designer_enter_key: "Please enter Admin Key to access the Catalog Designer Studio",
    designer_auth_failed: "Invalid Admin Key. Access denied.",
    designer_unlock_page: "Customize This Page",
    designer_custom_page_active: "✨ Custom Page Layout Active",
    designer_reset_master: "Revert to Master Template",
    designer_add_element: "Add Element",
    designer_save_btn: "Save Layout",
    designer_preview_all: "All Pages",
    designer_zoom: "Zoom",
    designer_snap_grid: "Snap to Grid",
    designer_show_grid: "Show Grid",
    designer_show_margins: "Show Margins",
    designer_preset: "Layout Presets",
    designer_save_success: "Catalog layout saved successfully to database.",
    designer_inspector_title: "Selected Block Inspector",
    designer_back_to_admin: "Back to Admin Dashboard",
    designer_back_to_catalog: "View Public Catalog"
  }
};

window.I18N_DICTIONARY = I18N_DICTIONARY;

class I18nManager {
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

    // 4. Update active state of language switcher buttons
    document.querySelectorAll('.lang-btn-th').forEach(btn => {
      const isActive = this.currentLang === 'th';
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    document.querySelectorAll('.lang-btn-en').forEach(btn => {
      const isActive = this.currentLang === 'en';
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
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
   * Helper to format artwork dimensions according to active language (cm/mm/in/m vs ซม./มม./นิ้ว/ม.)
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
   * Helper to render the language switcher widget into any container
   */
  renderSwitcher(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="lang-switcher-wrap" role="group" aria-label="Language Selector">
        <button type="button" onclick="window.i18n.setLang('th')" class="lang-tab lang-btn-th">TH</button>
        <button type="button" onclick="window.i18n.setLang('en')" class="lang-tab lang-btn-en">EN</button>
      </div>
    `;
    this.apply();
  }

}

// ==========================================
// Country Flag Detection & Rendering Engine
// ==========================================
const COUNTRY_FLAG_MAP = {
  // Asia
  'th': 'th', 'thailand': 'th', 'thai': 'th', 'ไทย': 'th', 'ประเทศไทย': 'th', 'สัญชาติไทย': 'th', 'คนไทย': 'th',
  'jp': 'jp', 'japan': 'jp', 'japanese': 'jp', 'jpn': 'jp', 'ญี่ปุ่น': 'jp', 'ประเทศญี่ปุ่น': 'jp',
  'cn': 'cn', 'china': 'cn', 'chinese': 'cn', 'chn': 'cn', 'จีน': 'cn', 'ประเทศจีน': 'cn',
  'kr': 'kr', 'south korea': 'kr', 'korea': 'kr', 'korean': 'kr', 'kor': 'kr', 'เกาหลี': 'kr', 'เกาหลีใต้': 'kr',
  'sg': 'sg', 'singapore': 'sg', 'singaporean': 'sg', 'sgp': 'sg', 'สิงคโปร์': 'sg',
  'my': 'my', 'malaysia': 'my', 'malaysian': 'my', 'mys': 'my', 'มาเลเซีย': 'my',
  'vn': 'vn', 'vietnam': 'vn', 'vietnamese': 'vn', 'vnm': 'vn', 'เวียดนาม': 'vn',
  'id': 'id', 'indonesia': 'id', 'indonesian': 'id', 'idn': 'id', 'อินโดนีเซีย': 'id',
  'ph': 'ph', 'philippines': 'ph', 'filipino': 'ph', 'phl': 'ph', 'ฟิลิปปินส์': 'ph',
  'in': 'in', 'india': 'in', 'indian': 'in', 'ind': 'in', 'อินเดีย': 'in',
  'tw': 'tw', 'taiwan': 'tw', 'taiwanese': 'tw', 'twn': 'tw', 'ไต้หวัน': 'tw',
  'hk': 'hk', 'hong kong': 'hk', 'hkg': 'hk', 'ฮ่องกง': 'hk',
  'mm': 'mm', 'myanmar': 'mm', 'burma': 'mm', 'mmr': 'mm', 'พม่า': 'mm', 'เมียนมา': 'mm',
  'la': 'la', 'laos': 'la', 'lao': 'la', 'lao': 'la', 'ลาว': 'la',
  'kh': 'kh', 'cambodia': 'kh', 'khm': 'kh', 'กัมพูชา': 'kh',
  // Europe
  'fr': 'fr', 'france': 'fr', 'french': 'fr', 'fra': 'fr', 'ฝรั่งเศส': 'fr', 'ประเทศฝรั่งเศส': 'fr',
  'gb': 'gb', 'uk': 'gb', 'united kingdom': 'gb', 'great britain': 'gb', 'britain': 'gb', 'england': 'gb', 'gbr': 'gb', 'อังกฤษ': 'gb', 'สหราชอาณาจักร': 'gb',
  'de': 'de', 'germany': 'de', 'german': 'de', 'deu': 'de', 'เยอรมนี': 'de', 'เยอรมัน': 'de',
  'it': 'it', 'italy': 'it', 'italian': 'it', 'ita': 'it', 'อิตาลี': 'it',
  'es': 'es', 'spain': 'es', 'spanish': 'es', 'esp': 'es', 'สเปน': 'es',
  'nl': 'nl', 'netherlands': 'nl', 'holland': 'nl', 'dutch': 'nl', 'nld': 'nl', 'เนเธอร์แลนด์': 'nl', 'ฮอลแลนด์': 'nl',
  'se': 'se', 'sweden': 'se', 'swedish': 'se', 'swe': 'se', 'สวีเดน': 'se',
  'no': 'no', 'norway': 'no', 'norwegian': 'no', 'nor': 'no', 'นอร์เวย์': 'no',
  'dk': 'dk', 'denmark': 'dk', 'danish': 'dk', 'dnk': 'dk', 'เดนมาร์ก': 'dk',
  'fi': 'fi', 'finland': 'fi', 'finnish': 'fi', 'fin': 'fi', 'ฟินแลนด์': 'fi',
  'ch': 'ch', 'switzerland': 'ch', 'swiss': 'ch', 'che': 'ch', 'สวิตเซอร์แลนด์': 'ch', 'สวิส': 'ch',
  'at': 'at', 'austria': 'at', 'austrian': 'at', 'aut': 'at', 'ออสเตรีย': 'at',
  'be': 'be', 'belgium': 'be', 'belgian': 'be', 'bel': 'be', 'เบลเยียม': 'be',
  'pt': 'pt', 'portugal': 'pt', 'portuguese': 'pt', 'prt': 'pt', 'โปรตุเกส': 'pt',
  'pl': 'pl', 'poland': 'pl', 'polish': 'pl', 'pol': 'pl', 'โปแลนด์': 'pl',
  'ru': 'ru', 'russia': 'ru', 'russian': 'ru', 'rus': 'ru', 'รัสเซีย': 'ru',
  'gr': 'gr', 'greece': 'gr', 'greek': 'gr', 'grc': 'gr', 'กรีซ': 'gr',
  'ie': 'ie', 'ireland': 'ie', 'irish': 'ie', 'irl': 'ie', 'ไอร์แลนด์': 'ie',
  // Americas & Oceania
  'us': 'us', 'usa': 'us', 'united states': 'us', 'america': 'us', 'usa': 'us', 'สหรัฐอเมริกา': 'us', 'สหรัฐ': 'us', 'อเมริกา': 'us',
  'ca': 'ca', 'canada': 'ca', 'canadian': 'ca', 'can': 'ca', 'แคนาดา': 'ca',
  'au': 'au', 'australia': 'au', 'australian': 'au', 'aus': 'au', 'ออสเตรเลีย': 'au',
  'nz': 'nz', 'new zealand': 'nz', 'nzl': 'nz', 'นิวซีแลนด์': 'nz',
  'br': 'br', 'brazil': 'br', 'brazilian': 'br', 'bra': 'br', 'บราซิล': 'br',
  'mx': 'mx', 'mexico': 'mx', 'mexican': 'mx', 'mex': 'mx', 'เม็กซิโก': 'mx',
  'ar': 'ar', 'argentina': 'ar', 'arg': 'ar', 'อาร์เจนตินา': 'ar'
};

const COUNTRY_NAMES = {
  'th': { th: 'ประเทศไทย', en: 'Thailand' },
  'jp': { th: 'ญี่ปุ่น', en: 'Japan' },
  'cn': { th: 'จีน', en: 'China' },
  'kr': { th: 'เกาหลีใต้', en: 'South Korea' },
  'sg': { th: 'สิงคโปร์', en: 'Singapore' },
  'my': { th: 'มาเลเซีย', en: 'Malaysia' },
  'vn': { th: 'เวียดนาม', en: 'Vietnam' },
  'id': { th: 'อินโดนีเซีย', en: 'Indonesia' },
  'ph': { th: 'ฟิลิปปินส์', en: 'Philippines' },
  'in': { th: 'อินเดีย', en: 'India' },
  'tw': { th: 'ไต้หวัน', en: 'Taiwan' },
  'hk': { th: 'ฮ่องกง', en: 'Hong Kong' },
  'mm': { th: 'เมียนมา', en: 'Myanmar' },
  'la': { th: 'ลาว', en: 'Laos' },
  'kh': { th: 'กัมพูชา', en: 'Cambodia' },
  'fr': { th: 'ฝรั่งเศส', en: 'France' },
  'gb': { th: 'สหราชอาณาจักร', en: 'United Kingdom' },
  'de': { th: 'เยอรมนี', en: 'Germany' },
  'it': { th: 'อิตาลี', en: 'Italy' },
  'es': { th: 'สเปน', en: 'Spain' },
  'nl': { th: 'เนเธอร์แลนด์', en: 'Netherlands' },
  'se': { th: 'สวีเดน', en: 'Sweden' },
  'no': { th: 'นอร์เวย์', en: 'Norway' },
  'dk': { th: 'เดนมาร์ก', en: 'Denmark' },
  'fi': { th: 'ฟินแลนด์', en: 'Finland' },
  'ch': { th: 'สวิตเซอร์แลนด์', en: 'Switzerland' },
  'at': { th: 'ออสเตรีย', en: 'Austria' },
  'be': { th: 'เบลเยียม', en: 'Belgium' },
  'pt': { th: 'โปรตุเกส', en: 'Portugal' },
  'pl': { th: 'โปแลนด์', en: 'Poland' },
  'ru': { th: 'รัสเซีย', en: 'Russia' },
  'gr': { th: 'กรีซ', en: 'Greece' },
  'ie': { th: 'ไอร์แลนด์', en: 'Ireland' },
  'us': { th: 'สหรัฐอเมริกา', en: 'United States' },
  'ca': { th: 'แคนาดา', en: 'Canada' },
  'au': { th: 'ออสเตรเลีย', en: 'Australia' },
  'nz': { th: 'นิวซีแลนด์', en: 'New Zealand' },
  'br': { th: 'บราซิล', en: 'Brazil' },
  'mx': { th: 'เม็กซิโก', en: 'Mexico' },
  'ar': { th: 'อาร์เจนตินา', en: 'Argentina' }
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

window.i18n = new I18nManager();
window.t = (key) => window.i18n.t(key);
window.getField = (item, fieldName, defaultVal = '') => window.i18n.getField(item, fieldName, defaultVal);
window.getArtistFullName = (item, defaultVal = '') => window.i18n.getArtistFullName(item, defaultVal);
window.formatDimensions = (val, lang) => window.i18n.formatDimensions(val, lang);
window.formatPrice = (val, lang) => window.i18n.formatPrice(val, lang);
window.resolveCountryCode = resolveCountryCode;
window.getCountryDisplayName = getCountryDisplayName;
window.getFlagEmoji = getFlagEmoji;
window.getCountryFlagBadge = getCountryFlagBadge;

document.addEventListener('DOMContentLoaded', () => {
  window.i18n.apply();
});
