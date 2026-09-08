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
    btn_print_pdf: "ดาวน์โหลด PDF",
    btn_view_all_pages: "ดูทุกหน้าเรียงกัน",
    btn_single_reader: "เปิดโหมดอ่านทีละหน้า",
    sort_catalog_ph: "เรียงหน้า:",
    sort_catalog_custom: "ลำดับที่จัดไว้ (Saved)",
    sort_catalog_title: "ชื่อผลงาน (A-Z)",
    sort_catalog_artist: "ชื่อศิลปิน (A-Z)",
    sort_catalog_country: "ประเทศ / สัญชาติ (A-Z)",

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
    gallery_sort_default: "ลำดับการจัดแสดง (Curated Order)",
    gallery_sort_title_asc: "ชื่อผลงาน (A - Z / ก - ฮ)",
    gallery_sort_artist_asc: "ชื่อศิลปิน (A - Z / ก - ฮ)",
    gallery_sort_country_asc: "ตามประเทศ / สัญชาติ (A - Z)",
    gallery_sort_price_desc: "ราคาผลงาน (มากไปน้อย)",
    gallery_sort_price_asc: "ราคาผลงาน (น้อยไปมาก)",
    gallery_sort_year_desc: "ปีที่สร้างสรรค์ (ใหม่สุด)",

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
    // Catalog Studio Modal Localizations
    studio_btn_title: "จัดหน้า",
    studio_modal_title: "สตูดิโอจัดหน้าสูจิบัตร (Catalog Layout Studio)",
    studio_modal_subtitle: "กำหนดลำดับหน้า ปก คำนำ และการจัดวางของสูจิบัตรดิจิทัล",
    studio_tab_order: "ลำดับหน้าและเลือกผลงาน",
    studio_tab_cover: "หน้าปกสูจิบัตร",
    studio_tab_foreword: "สารจากภัณฑารักษ์",
    studio_tab_layout: "รูปแบบและธีม",
    studio_item_included: "รวมในเล่ม",
    studio_item_excluded: "ไม่แสดงในเล่ม",
    studio_cover_badge_th: "ป้ายกำกับด้านบน (TH)",
    studio_cover_badge_en: "ป้ายกำกับด้านบน (EN)",
    studio_cover_title1_th: "ชื่องาน บรรทัดที่ 1 (TH)",
    studio_cover_title1_en: "ชื่องาน บรรทัดที่ 1 (EN)",
    studio_cover_title_highlight: "ชื่องาน บรรทัดไฮไลท์สีทอง (Title Line 2 / Highlight)",
    studio_cover_sub_th: "คำโปรย / คำบรรยายสั้น (TH)",
    studio_cover_sub_en: "คำโปรย / คำบรรยายสั้น (EN)",
    studio_cover_curator_th: "ชื่อประธาน / ภัณฑารักษ์หลัก (TH)",
    studio_cover_curator_en: "ชื่อประธาน / ภัณฑารักษ์หลัก (EN)",
    studio_cover_edition_th: "ข้อมูลฉบับพิมพ์ / ช่วงเวลานิทรรศการ (TH)",
    studio_cover_edition_en: "ข้อมูลฉบับพิมพ์ / ช่วงเวลานิทรรศการ (EN)",
    studio_foreword_title_th: "หัวข้อสารจากภัณฑารักษ์ (TH)",
    studio_foreword_title_en: "หัวข้อสารจากภัณฑารักษ์ (EN)",
    studio_foreword_p1_th: "ย่อหน้าที่ 1 (TH)",
    studio_foreword_p1_en: "ย่อหน้าที่ 1 (EN)",
    studio_foreword_p2_th: "ย่อหน้าที่ 2 (TH)",
    studio_foreword_p2_en: "ย่อหน้าที่ 2 (EN)",
    studio_foreword_committee_th: "ลงชื่อคณะกรรมการ / ฝ่ายจัดงาน (TH)",
    studio_foreword_committee_en: "ลงชื่อคณะกรรมการ / ฝ่ายจัดงาน (EN)",
    studio_theme_title: "โทนสีและธีมของสูจิบัตร (Catalog Theme)",
    studio_theme_heritage_name: "🏛️ เพาะช่าง เฮอริเทจ (Heritage)",
    studio_theme_heritage_desc: "กระดาษสีงาช้างนวลตา ขอบทองคำโบราณ สไตล์วิทยาลัยเพาะช่าง (ค่าเริ่มต้น)",
    studio_theme_white_name: "Fine Art White (ขาวบริสุทธิ์)",
    studio_theme_white_desc: "พื้นหลังสีขาวนวล สไตล์พิพิธภัณฑ์ศิลปะสากล สะอาดตา",
    studio_theme_dark_name: "Luxury Dark (รัตติกาลทองคำ)",
    studio_theme_dark_desc: "พื้นหลังดำสนิท ขอบสีทอง ผสมผสานความร่วมสมัย สง่างาม",
    studio_btn_save: "บันทึกการจัดหน้า (Save Layout)",
    studio_sort_order_label: "จัดเรียงลำดับด่วน:",
    studio_sort_default: "ลำดับที่บันทึกไว้ (Custom)",
    studio_sort_title_asc: "ตามชื่อผลงาน (A-Z / ก-ฮ)",
    studio_sort_artist_asc: "ตามชื่อศิลปิน (A-Z / ก-ฮ)",
    studio_sort_country_asc: "ตามสัญชาติ / ประเทศ (A-Z)",
    footer_sub: "วิทยาลัยเพาะช่าง มทร.รัตนโกสินทร์",
    nav_curator_desk: "เข้าสู่ระบบผู้ดูแล (Curator Desk)"
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
    btn_print_pdf: "Download PDF",
    btn_view_all_pages: "View All Pages",
    btn_single_reader: "Single Page Reader",
    sort_catalog_ph: "Sort Pages:",
    sort_catalog_custom: "Curated Order",
    sort_catalog_title: "Artwork Title (A-Z)",
    sort_catalog_artist: "Artist Name (A-Z)",
    sort_catalog_country: "Country / Origin (A-Z)",

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
    gallery_sort_default: "Curated Exhibition Order",
    gallery_sort_title_asc: "Artwork Title (A - Z)",
    gallery_sort_artist_asc: "Artist Name (A - Z)",
    gallery_sort_country_asc: "Country / Nationality (A - Z)",
    gallery_sort_price_desc: "Artwork Price (High to Low)",
    gallery_sort_price_asc: "Artwork Price (Low to High)",
    gallery_sort_year_desc: "Year Created (Newest)",

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
    // Catalog Studio Modal Localizations
    studio_btn_title: "Layout",
    studio_modal_title: "Catalog Layout Studio",
    studio_modal_subtitle: "Organize page order, cover specs, foreword, and catalog display theme",
    studio_tab_order: "Page Order & Curation",
    studio_tab_cover: "Front Cover",
    studio_tab_foreword: "Curator Foreword",
    studio_tab_layout: "Layout & Theme",
    studio_item_included: "Included",
    studio_item_excluded: "Excluded",
    studio_cover_badge_th: "Top Badge (TH)",
    studio_cover_badge_en: "Top Badge (EN)",
    studio_cover_title1_th: "Exhibition Title Line 1 (TH)",
    studio_cover_title1_en: "Exhibition Title Line 1 (EN)",
    studio_cover_title_highlight: "Highlight Title Line (Gold Accent)",
    studio_cover_sub_th: "Subtitle / Tagline (TH)",
    studio_cover_sub_en: "Subtitle / Tagline (EN)",
    studio_cover_curator_th: "Chief Curator / Organizer (TH)",
    studio_cover_curator_en: "Chief Curator / Organizer (EN)",
    studio_cover_edition_th: "Edition Information (TH)",
    studio_cover_edition_en: "Edition Information (EN)",
    studio_foreword_title_th: "Foreword Title (TH)",
    studio_foreword_title_en: "Foreword Title (EN)",
    studio_foreword_p1_th: "Paragraph 1 (TH)",
    studio_foreword_p1_en: "Paragraph 1 (EN)",
    studio_foreword_p2_th: "Paragraph 2 (TH)",
    studio_foreword_p2_en: "Paragraph 2 (EN)",
    studio_foreword_committee_th: "Sign-off / Committee (TH)",
    studio_foreword_committee_en: "Sign-off / Committee (EN)",
    studio_theme_title: "Catalog Visual Theme",
    studio_theme_heritage_name: "🏛️ Poh-Chang Heritage (Warm Ivory)",
    studio_theme_heritage_desc: "Ivory paper tone with antique gold borders, authentic Poh-Chang style (Default)",
    studio_theme_white_name: "Fine Art White",
    studio_theme_white_desc: "Crisp gallery white background, modern and pristine museum atmosphere",
    studio_theme_dark_name: "Luxury Dark (Obsidian & Gold)",
    studio_theme_dark_desc: "Deep obsidian black backdrop with warm champagne bronze accents",
    studio_btn_save: "Save Layout",
    studio_sort_order_label: "Quick Sort:",
    studio_sort_default: "Custom Saved Order",
    studio_sort_title_asc: "By Artwork Title (A-Z)",
    studio_sort_artist_asc: "By Artist Name (A-Z)",
    studio_sort_country_asc: "By Country / Nationality (A-Z)",
    footer_sub: "Poh-Chang Academy of Arts, RMUTR",
    nav_curator_desk: "Curator Desk"
  },
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
