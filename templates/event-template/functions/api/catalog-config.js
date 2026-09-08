// Cloudflare Pages Function: /api/catalog-config
export async function onRequestGet(context) {
  const { env } = context;
  try {
    let config = null;
    if (env.DB) {
      const row = await env.DB.prepare("SELECT value FROM catalog_config WHERE key = 'main'").first();
      if (row && row.value) {
        try { config = JSON.parse(row.value); } catch (e) { config = null; }
      }
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
          p1: "Welcome to the official catalog of this exhibition...",
          p1_th: "ยินดีต้อนรับสู่สูจิบัตรทางการของงานนิทรรศการ...",
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
        layout: { template: "split", theme: "heritage" },
        elements: {
          showTitle: true, showArtist: true, showFlag: true, showTechnique: true,
          showDimensions: true, showYear: true, showPrice: true, showConcept: true,
          showAvatar: true, showViewLink: true, showPageNum: true
        }
      };
    }

    return new Response(JSON.stringify({ success: true, config }), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate"
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const adminKey = request.headers.get("x-admin-key");
    const expectedKey = env.ADMIN_KEY || "admin123";
    if (adminKey !== expectedKey) {
      return new Response(JSON.stringify({ success: false, error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }

    const body = await request.json();
    const config = body.config || body;

    if (env.DB) {
      await env.DB.prepare(`
        INSERT INTO catalog_config (key, value, updated_at)
        VALUES ('main', ?, CURRENT_TIMESTAMP)
        ON CONFLICT(key) DO UPDATE SET
          value = excluded.value,
          updated_at = CURRENT_TIMESTAMP;
      `).bind(JSON.stringify(config)).run();
    }

    return new Response(JSON.stringify({ success: true, message: "Configuration saved successfully" }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
