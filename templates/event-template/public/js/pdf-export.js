/**
 * Vector PDF Exporter for the Digital Exhibition Catalog (สูจิบัตรออนไลน์)
 * -----------------------------------------------------------------------
 * Generates the catalog PDF entirely client-side using jsPDF:
 *   - Real embedded fonts (Thai + Latin) -> text stays vector/selectable, not a screenshot.
 *   - Reads the exact same catalogConfig / submissions data the on-screen
 *     catalog and the Catalog Designer Studio use, so layout positions,
 *     visible fields, and text content match what the admin configured.
 *   - No server round-trip, no OS print dialog, no manual margin/scale setup.
 *
 * Usage (called from catalog.html):
 *   window.PDFExport.run({ catalogConfig, submissions, isTh })
 */
(function () {
  'use strict';

  const JSPDF_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/4.2.1/jspdf.umd.min.js';

  const PAGE_W_MM = 210;
  const PAGE_H_MM = 297;
  const PT_TO_MM = 0.352778;

  const FONT_FILES = {
    NotoSerifThai: { normal: '/fonts/NotoSerifThai-Regular.ttf', bold: '/fonts/NotoSerifThai-Bold.ttf' },
    Sarabun: { normal: '/fonts/Sarabun-Regular.ttf', bold: '/fonts/Sarabun-Bold.ttf' },
    Maitree: { normal: '/fonts/Maitree-Regular.ttf', bold: '/fonts/Maitree-Bold.ttf' },
    CormorantGaramond: { normal: '/fonts/CormorantGaramond-Regular.ttf', bold: '/fonts/CormorantGaramond-Bold.ttf', italic: '/fonts/CormorantGaramond-Italic.ttf' },
    Cinzel: { bold: '/fonts/Cinzel-Bold.ttf' }
  };

  const THAI_RE = /[฀-๿]/;

  let fontsReadyPromise = null;
  let jspdfReadyPromise = null;
  const imageCache = new Map();

  // ---------------------------------------------------------------------
  // Low-level helpers
  // ---------------------------------------------------------------------

  function ensureJsPDFLoaded() {
    if (window.jspdf && window.jspdf.jsPDF) return Promise.resolve();
    if (jspdfReadyPromise) return jspdfReadyPromise;
    jspdfReadyPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = JSPDF_CDN;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('โหลดไลบรารี jsPDF ไม่สำเร็จ (ตรวจสอบอินเทอร์เน็ต)'));
      document.head.appendChild(s);
    });
    return jspdfReadyPromise;
  }

  async function fetchAsBase64(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error('fetch failed: ' + url + ' (' + res.status + ')');
    const buf = await res.arrayBuffer();
    let binary = '';
    const bytes = new Uint8Array(buf);
    const chunk = 0x8000;
    for (let i = 0; i < bytes.length; i += chunk) {
      binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
    }
    return btoa(binary);
  }

  async function loadFonts(doc) {
    if (fontsReadyPromise) { await fontsReadyPromise; return; }
    fontsReadyPromise = (async () => {
      const jobs = [];
      for (const family of Object.keys(FONT_FILES)) {
        for (const style of Object.keys(FONT_FILES[family])) {
          jobs.push((async () => {
            try {
              const b64 = await fetchAsBase64(FONT_FILES[family][style]);
              const vfsName = family + '-' + style + '.ttf';
              doc.addFileToVFS(vfsName, b64);
              doc.addFont(vfsName, family, style);
            } catch (e) {
              console.warn('[pdf-export] font load failed:', family, style, e.message);
            }
          })());
        }
      }
      await Promise.all(jobs);
    })();
    await fontsReadyPromise;
  }

  // Map the catalog's 5 design fonts -> an embedded font that can render the given text.
  // (Cormorant Garamond has no Thai glyphs; the on-screen CSS silently falls back to Noto
  // Serif Thai for Thai characters via the font-stack, so we mirror that behavior here.)
  function pickFont(text, preferred) {
    const family = preferred || 'Maitree';
    if (family === 'Cinzel') return 'Cinzel';
    const hasThai = THAI_RE.test(text || '');
    if (hasThai && family === 'CormorantGaramond') return 'NotoSerifThai';
    return family;
  }

  function hexToRgb(hex) {
    if (!hex) return [23, 28, 26];
    const m = String(hex).replace('#', '');
    const full = m.length === 3 ? m.split('').map(c => c + c).join('') : m;
    const num = parseInt(full, 16);
    if (isNaN(num)) return [23, 28, 26];
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  }

  async function loadImageResized(url, maxDim) {
    if (!url) return null;
    const cacheKey = url + '|' + maxDim;
    if (imageCache.has(cacheKey)) return imageCache.get(cacheKey);
    const promise = (async () => {
      try {
        const res = await fetch(url, { mode: 'cors' });
        if (!res.ok) throw new Error('bad status ' + res.status);
        const blob = await res.blob();
        const bitmap = await createImageBitmap(blob).catch(() => null);
        let width, height, drawSource;
        if (bitmap) {
          width = bitmap.width; height = bitmap.height; drawSource = bitmap;
        } else {
          const imgEl = await new Promise((resolve, reject) => {
            const im = new Image();
            im.onload = () => resolve(im);
            im.onerror = reject;
            im.src = URL.createObjectURL(blob);
          });
          width = imgEl.naturalWidth; height = imgEl.naturalHeight; drawSource = imgEl;
        }
        let outW = width, outH = height;
        if (Math.max(width, height) > maxDim) {
          const scale = maxDim / Math.max(width, height);
          outW = Math.round(width * scale);
          outH = Math.round(height * scale);
        }
        const canvas = document.createElement('canvas');
        canvas.width = outW; canvas.height = outH;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(drawSource, 0, 0, outW, outH);
        const dataUri = canvas.toDataURL('image/jpeg', 0.86);
        return { dataUri, width: outW, height: outH, format: 'JPEG' };
      } catch (e) {
        console.warn('[pdf-export] image load failed:', url, e.message);
        return null;
      }
    })();
    imageCache.set(cacheKey, promise);
    return promise;
  }

  // Draw an image "contain" (fit within box, centered, preserve aspect) or "cover" (fill box, crop, clipped)
  async function drawImageInBox(doc, url, x, y, w, h, fit) {
    const img = await loadImageResized(url, 1800);
    if (!img || w <= 0 || h <= 0) return;
    const boxRatio = w / h;
    const imgRatio = img.width / img.height;

    if (fit === 'cover') {
      let drawW, drawH, drawX, drawY;
      if (imgRatio > boxRatio) {
        drawH = h; drawW = h * imgRatio;
        drawX = x - (drawW - w) / 2; drawY = y;
      } else {
        drawW = w; drawH = w / imgRatio;
        drawX = x; drawY = y - (drawH - h) / 2;
      }
      doc.saveGraphicsState();
      doc.rect(x, y, w, h, null);
      doc.clip();
      doc.addImage(img.dataUri, img.format, drawX, drawY, drawW, drawH, undefined, 'FAST');
      doc.restoreGraphicsState();
    } else {
      let drawW, drawH;
      if (imgRatio > boxRatio) { drawW = w; drawH = w / imgRatio; }
      else { drawH = h; drawW = h * imgRatio; }
      const drawX = x + (w - drawW) / 2;
      const drawY = y + (h - drawH) / 2;
      doc.addImage(img.dataUri, img.format, drawX, drawY, drawW, drawH, undefined, 'FAST');
    }
  }

  // Draw a real national flag image (flagcdn.com, same source the on-screen site uses)
  // next to the country name. Returns the total width used (mm), so callers can lay out
  // whatever comes after it. Falls back to a small globe glyph if the country can't be resolved.
  async function drawCountryFlagChip(doc, country, x, y, opts) {
    opts = opts || {};
    const fontSizePt = opts.fontSizePt || 8;
    const flagH = opts.flagH || (fontSizePt * PT_TO_MM * 1.1);
    const code = window.resolveCountryCode ? window.resolveCountryCode(country || 'Thailand') : null;
    const name = window.getCountryDisplayName ? window.getCountryDisplayName(country || 'Thailand', opts.isTh ? 'th' : 'en') : (country || 'Thailand');

    let flagW = 0;
    if (code) {
      const flagUrl = `https://flagcdn.com/w160/${code}.png`;
      const img = await loadImageResized(flagUrl, 320);
      if (img) {
        flagW = flagH * (img.width / img.height);
        doc.addImage(img.dataUri, img.format, x, y, flagW, flagH, undefined, 'FAST');
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.1);
        doc.rect(x, y, flagW, flagH);
        flagW += 2;
      }
    }
    drawTextBlock(doc, name, x + flagW, y - (fontSizePt * PT_TO_MM * 0.12), 80, {
      fontFamily: 'Sarabun', fontSizePt, color: opts.color || '#4A5852'
    });
  }

  // Draw wrapped text inside a box, anchored to the box's top. Returns the height used (mm).
  function drawTextBlock(doc, text, x, y, w, opts) {
    opts = opts || {};
    const family = pickFont(text, opts.fontFamily || 'Maitree');
    const style = opts.bold ? 'bold' : (opts.italic && family === 'CormorantGaramond' ? 'italic' : 'normal');
    const availableStyles = (doc.getFontList()[family] || []);
    doc.setFont(family, availableStyles.includes(style) ? style : (availableStyles[0] || 'normal'));
    const sizePt = opts.fontSizePt || 10;
    doc.setFontSize(sizePt);
    const rgb = hexToRgb(opts.color || '#171C1A');
    doc.setTextColor(rgb[0], rgb[1], rgb[2]);

    const lines = doc.splitTextToSize(String(text == null ? '' : text), w);
    const lineHeightMm = sizePt * PT_TO_MM * 1.34;
    const align = opts.align || 'left';
    let anchorX = x;
    if (align === 'center') anchorX = x + w / 2;
    else if (align === 'right') anchorX = x + w;

    const maxLines = opts.maxLines || lines.length;
    const shownLines = lines.slice(0, maxLines);
    let cursorY = y + sizePt * PT_TO_MM * 0.9;
    shownLines.forEach((line) => {
      doc.text(line, anchorX, cursorY, { align });
      cursorY += lineHeightMm;
    });
    return shownLines.length * lineHeightMm;
  }

  // Draw a "label ... value" spec row (technique/dimensions/year/price), matching the
  // on-screen justify-between + bottom-border pattern in renderPageBlocks().
  function drawSpecRow(doc, label, value, x, y, w, tokens, style, isPriceRow) {
    if (value === undefined || value === null || value === '') return;
    const fontFamily = (style && style.fontFamily) || 'Sarabun';
    const fontSizePt = (style && style.fontSizePt) || 9;
    drawTextBlock(doc, label, x, y, w * 0.42, { fontFamily: 'Sarabun', fontSizePt: fontSizePt * 0.85, color: tokens.sub });
    drawTextBlock(doc, String(value), x + w * 0.42, y, w * 0.58, {
      fontFamily, fontSizePt, align: 'right', bold: true,
      color: isPriceRow ? tokens.gold : ((style && style.color) || tokens.heading)
    });
    const borderRgb = hexToRgb(tokens.border);
    doc.setDrawColor(borderRgb[0], borderRgb[1], borderRgb[2]);
    doc.setLineWidth(0.15);
    const lineY = y + fontSizePt * PT_TO_MM * 1.25;
    doc.line(x, lineY, x + w, lineY);
  }

  function pct2mm(pct, total) {
    return (Number(pct) || 0) / 100 * total;
  }

  // ---------------------------------------------------------------------
  // Theme tokens (mirrors renderCatalog()'s theme branching in catalog.html)
  // ---------------------------------------------------------------------

  function getThemeTokens(catalogConfig) {
    const theme = (catalogConfig.layout && catalogConfig.layout.theme) || 'heritage';
    if (theme === 'fine-white') {
      return { bg: '#ffffff', border: '#e2e8f0', heading: '#0f172a', sub: '#64748b', concept: '#334155', gold: '#C5A059' };
    }
    if (theme === 'luxury-dark') {
      return { bg: '#13141c', border: '#334155', heading: '#ffffff', sub: '#94a3b8', concept: '#d4d4d4', gold: '#D4AF37' };
    }
    return { bg: '#FBF9F4', border: '#E8E0D2', heading: '#171C1A', sub: '#4A5852', concept: '#171C1A', gold: '#C5A059' };
  }

  // ---------------------------------------------------------------------
  // Fixed pages: Cover / Foreword / Jury
  // ---------------------------------------------------------------------

  function drawPageChrome(doc, tokens) {
    const rgb = hexToRgb(tokens.bg);
    doc.setFillColor(rgb[0], rgb[1], rgb[2]);
    doc.rect(0, 0, PAGE_W_MM, PAGE_H_MM, 'F');
    const borderRgb = hexToRgb(tokens.border);
    doc.setDrawColor(borderRgb[0], borderRgb[1], borderRgb[2]);
    doc.setLineWidth(0.3);
    doc.rect(6, 6, PAGE_W_MM - 12, PAGE_H_MM - 12);
  }

  function drawCoverPage(doc, catalogConfig, isTh, tokens, orgName, orgSub) {
    drawPageChrome(doc, tokens);
    const coverData = catalogConfig.cover || {};
    const badge = (isTh ? coverData.badge_th : coverData.badge_en) || coverData.badge || 'Official Curated Art Exhibition';
    const title1 = (isTh ? coverData.title_th : coverData.title_en) || coverData.title_line1 || '';
    const highlight = coverData.title_highlight || coverData.title_line2 || '';
    const sub = (isTh ? coverData.subtitle_th : coverData.subtitle_en) || '';
    const curator = (isTh ? coverData.curator_th : coverData.curator_en) || coverData.chief_curator || '';
    const edition = (isTh ? coverData.edition_th : coverData.edition_en) || coverData.edition_label || '';

    const margin = 20;
    let y = 26;

    const orgLine1 = orgName || '';
    const orgLine2 = orgSub || '';
    const goldRgb0 = hexToRgb(tokens.gold);
    doc.setFillColor(goldRgb0[0], goldRgb0[1], goldRgb0[2]);
    doc.rect(margin, 18, 9, 9, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFont('CormorantGaramond', 'bold');
    doc.setFontSize(9);
    doc.text('P.C.', margin + 4.5, 23.5, { align: 'center' });
    if (orgLine1) drawTextBlock(doc, orgLine1, margin + 12, 17.5, 90, { fontFamily: 'NotoSerifThai', fontSizePt: 8, color: tokens.heading, bold: true });
    if (orgLine2) drawTextBlock(doc, orgLine2, margin + 12, 22.5, 90, { fontFamily: 'Sarabun', fontSizePt: 6.5, color: tokens.gold });

    drawTextBlock(doc, 'OFFICIAL CATALOG', PAGE_W_MM - margin - 45, 19, 45, { fontFamily: 'Sarabun', fontSizePt: 8, color: tokens.gold, align: 'right', bold: true });
    const borderRgb0 = hexToRgb(tokens.border);
    doc.setDrawColor(borderRgb0[0], borderRgb0[1], borderRgb0[2]);
    doc.line(margin, 30, PAGE_W_MM - margin, 30);

    y = 42;
    drawTextBlock(doc, badge, margin, y, PAGE_W_MM - margin * 2, { fontFamily: 'Sarabun', fontSizePt: 9, color: tokens.gold, align: 'center', bold: true });

    y += 16;
    drawTextBlock(doc, title1, margin, y, PAGE_W_MM - margin * 2, { fontFamily: 'CormorantGaramond', fontSizePt: 22, color: tokens.heading, align: 'center', bold: true });

    y += 22;
    drawTextBlock(doc, highlight.toUpperCase(), margin, y, PAGE_W_MM - margin * 2, { fontFamily: 'Cinzel', fontSizePt: 26, color: tokens.gold, align: 'center', bold: true });

    y += 20;
    const goldRgb = hexToRgb(tokens.gold);
    doc.setDrawColor(goldRgb[0], goldRgb[1], goldRgb[2]);
    doc.setLineWidth(0.4);
    doc.line(PAGE_W_MM / 2 - 15, y, PAGE_W_MM / 2 + 15, y);

    y += 10;
    drawTextBlock(doc, sub, margin + 15, y, PAGE_W_MM - (margin + 15) * 2, { fontFamily: 'CormorantGaramond', fontSizePt: 12, italic: true, color: tokens.sub, align: 'center' });

    const footerY = PAGE_H_MM - 24;
    const subRgb = hexToRgb(tokens.border);
    doc.setDrawColor(subRgb[0], subRgb[1], subRgb[2]);
    doc.line(margin, footerY, PAGE_W_MM - margin, footerY);
    drawTextBlock(doc, 'CHIEF CURATOR', margin, footerY + 4, 80, { fontFamily: 'Sarabun', fontSizePt: 7, color: tokens.gold, bold: true });
    drawTextBlock(doc, curator, margin, footerY + 9, 80, { fontFamily: 'Sarabun', fontSizePt: 9, color: tokens.heading });
    drawTextBlock(doc, 'EDITION', margin, footerY + 4, 80, { fontFamily: 'Sarabun', fontSizePt: 7, color: tokens.gold, align: 'right', bold: true });
    drawTextBlock(doc, edition, margin, footerY + 9, PAGE_W_MM - margin * 2, { fontFamily: 'Sarabun', fontSizePt: 9, color: tokens.sub, align: 'right' });
  }

  function drawForewordPage(doc, catalogConfig, isTh, tokens) {
    drawPageChrome(doc, tokens);
    const fw = catalogConfig.foreword || {};
    const title = (isTh ? fw.title_th : fw.title_en) || '';
    const p1 = (isTh ? fw.p1_th : fw.p1_en) || '';
    const p2 = (isTh ? fw.p2_th : fw.p2_en) || '';
    const committee = (isTh ? fw.committee_th : fw.committee_en) || (isTh ? fw.signoff_th : fw.signoff_en) || '';

    const margin = 20;
    let y = 26;
    drawTextBlock(doc, 'CURATORIAL FOREWORD', margin, y, 100, { fontFamily: 'Sarabun', fontSizePt: 8, color: tokens.gold, bold: true });
    y += 6;
    drawTextBlock(doc, title, margin, y, PAGE_W_MM - margin * 2, { fontFamily: 'CormorantGaramond', fontSizePt: 18, color: tokens.heading, bold: true });
    y += 14;
    const borderRgb = hexToRgb(tokens.border);
    doc.setDrawColor(borderRgb[0], borderRgb[1], borderRgb[2]);
    doc.line(margin, y, PAGE_W_MM - margin, y);

    y += 12;
    const h1 = drawTextBlock(doc, p1, margin, y, PAGE_W_MM - margin * 2, { fontFamily: 'NotoSerifThai', fontSizePt: 11, color: tokens.heading });
    y += h1 + 6;
    if (p2) {
      const h2 = drawTextBlock(doc, p2, margin, y, PAGE_W_MM - margin * 2, { fontFamily: 'NotoSerifThai', fontSizePt: 11, color: tokens.heading });
      y += h2 + 6;
    }

    const footerY = PAGE_H_MM - 30;
    doc.line(margin, footerY, PAGE_W_MM - margin, footerY);
    drawTextBlock(doc, committee, margin, footerY + 5, PAGE_W_MM - margin * 2, { fontFamily: 'Sarabun', fontSizePt: 10, color: tokens.heading, align: 'right', bold: true });
  }

  async function drawJuryPage(doc, catalogConfig, isTh, tokens) {
    const jury = catalogConfig.jury;
    if (!jury || !jury.enabled || !Array.isArray(jury.members) || jury.members.length === 0) return false;

    drawPageChrome(doc, tokens);
    const title = (isTh ? jury.title_th : jury.title_en) || 'คณะกรรมการผู้ทรงคุณวุฒิพิจารณาคัดเลือกผลงาน';

    const margin = 20;
    let y = 26;
    drawTextBlock(doc, 'CURATORIAL SELECTION COMMITTEE', margin, y, 130, { fontFamily: 'Sarabun', fontSizePt: 8, color: tokens.gold, bold: true });
    y += 6;
    drawTextBlock(doc, title, margin, y, PAGE_W_MM - margin * 2, { fontFamily: 'CormorantGaramond', fontSizePt: 16, color: tokens.heading, bold: true });
    y += 12;

    const members = jury.members.slice(0, 5);
    const cardH = 26;
    const gap = 5;
    for (const m of members) {
      const hasReal = Boolean(m.avatar_url && String(m.avatar_url).trim() && !String(m.avatar_url).includes('unsplash.com'));
      const avatarUrl = hasReal ? m.avatar_url : `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name_th || 'Jury')}&background=14070a&color=D4AF37&bold=true`;

      const borderRgb = hexToRgb(tokens.border);
      doc.setDrawColor(borderRgb[0], borderRgb[1], borderRgb[2]);
      doc.setLineWidth(0.25);
      doc.rect(margin, y, PAGE_W_MM - margin * 2, cardH);

      await drawImageInBox(doc, avatarUrl, margin + 3, y + 3, 20, 20, 'cover');

      const textX = margin + 28;
      const textW = PAGE_W_MM - margin * 2 - 32;
      let ty = y + 4;
      drawTextBlock(doc, m.role_th || m.role_en || 'กรรมการผู้ทรงคุณวุฒิ', textX, ty, textW, { fontFamily: 'Sarabun', fontSizePt: 7, color: tokens.gold, bold: true });
      ty += 5.5;
      drawTextBlock(doc, m.name_th || m.name_en || '', textX, ty, textW, { fontFamily: 'CormorantGaramond', fontSizePt: 13, color: tokens.heading, bold: true });
      ty += 7;
      if (m.academic_title) {
        drawTextBlock(doc, m.academic_title, textX, ty, textW, { fontFamily: 'Sarabun', fontSizePt: 8, color: tokens.gold });
        ty += 4.5;
      }
      if (m.institution) {
        drawTextBlock(doc, m.institution, textX, ty, textW, { fontFamily: 'Sarabun', fontSizePt: 7.5, color: tokens.sub });
      }

      y += cardH + gap;
    }
    return true;
  }

  // ---------------------------------------------------------------------
  // Artwork spread pages (block-driven, mirrors renderPageBlocks in catalog.html)
  // ---------------------------------------------------------------------

  const DEFAULT_FREE_LAYOUT_BLOCKS = {
    image: { x: 6, y: 10, w: 50, h: 74 },
    meta: { x: 60, y: 12, w: 34 },
    concept: { x: 60, y: 46, w: 34 },
    artist: { x: 60, y: 74, w: 34 }
  };

  const DEFAULT_ELEMENTS = {
    showTitle: true, showArtist: true, showFlag: true, showTechnique: true,
    showDimensions: true, showYear: true, showPrice: true, showConcept: true,
    showAvatar: true, showViewLink: true, showPageNum: true
  };

  async function drawArtworkSpreadPage(doc, ctx) {
    const { templateSource, item, bl, elem, tokens, title, artistName, technique, description, avatar, pageNum, isTh } = ctx;

    drawPageChrome(doc, tokens);
    const goldRgb = hexToRgb(tokens.gold);

    let usedBlockLayout = false;
    if (templateSource && Array.isArray(templateSource.blocks) && templateSource.blocks.length > 0) {
      usedBlockLayout = true;
      const blocks = templateSource.blocks.slice().sort((a, b) => (a.zIndex || 2) - (b.zIndex || 2));
      let hasPageNumBlock = false;

      for (const b of blocks) {
        const x = pct2mm(b.xPct !== undefined ? b.xPct : b.x, PAGE_W_MM);
        const y = pct2mm(b.yPct !== undefined ? b.yPct : b.y, PAGE_H_MM);
        const w = pct2mm(b.wPct !== undefined ? b.wPct : (b.w || 40), PAGE_W_MM);
        const h = pct2mm(b.hPct !== undefined ? b.hPct : (b.h || 10), PAGE_H_MM);
        const s = b.style || {};
        const align = s.textAlign || 'left';
        const commonOpts = { fontFamily: s.fontFamily, fontSizePt: s.fontSizePt, color: s.color, bold: s.fontWeight === 'bold' || s.fontWeight === 'semibold', italic: s.fontStyle === 'italic', align };

        switch (b.type) {
          case 'artwork_image':
            await drawImageInBox(doc, item.image_url || item.thumbnail_url, x, y, w, h, s.objectFit === 'cover' ? 'cover' : 'contain');
            break;
          case 'artwork_title':
            if (elem.showTitle === false) break;
            drawTextBlock(doc, title, x, y, w, Object.assign({ fontSizePt: 16, bold: true }, commonOpts));
            break;
          case 'artist_name':
            if (elem.showArtist === false) break;
            drawTextBlock(doc, artistName, x, y, w, Object.assign({ fontSizePt: 11 }, commonOpts));
            break;
          case 'artist_photo':
            if (elem.showAvatar === false || !avatar) break;
            await drawImageInBox(doc, avatar, x, y, w, h, 'cover');
            break;
          case 'country_flag': {
            if (elem.showFlag === false) break;
            await drawCountryFlagChip(doc, item.nationality, x, y, { fontSizePt: 8, color: tokens.sub, isTh });
            break;
          }
          case 'artist_profile': {
            let ax = x;
            if (elem.showAvatar !== false && avatar) {
              await drawImageInBox(doc, avatar, x, y, 12, 12, 'cover');
              ax = x + 15;
            }
            const aw = w - (ax - x);
            let ay = y;
            if (elem.showArtist !== false) {
              drawTextBlock(doc, artistName, ax, ay, aw, { fontFamily: s.fontFamily, fontSizePt: s.fontSizePt || 11, color: s.color, bold: true });
              ay += 6;
            }
            if (elem.showFlag !== false) {
              await drawCountryFlagChip(doc, item.nationality, ax, ay, { fontSizePt: 7.5, color: tokens.sub, isTh });
            }
            break;
          }
          case 'technique':
            if (elem.showTechnique === false) break;
            drawSpecRow(doc, (isTh ? 'เทคนิค' : 'Technique'), technique, x, y, w, tokens, s);
            break;
          case 'dimensions':
            if (elem.showDimensions === false) break;
            drawSpecRow(doc, (isTh ? 'ขนาด' : 'Dimensions'), window.formatDimensions ? window.formatDimensions(item.dimensions) : item.dimensions, x, y, w, tokens, s);
            break;
          case 'year_created':
            if (elem.showYear === false) break;
            drawSpecRow(doc, (isTh ? 'ปีที่สร้าง' : 'Year'), item.year_created || '', x, y, w, tokens, s);
            break;
          case 'price':
            if (elem.showPrice === false || !item.price) break;
            drawSpecRow(doc, (isTh ? 'ราคา' : 'Price'), window.formatPrice ? window.formatPrice(item.price) : item.price, x, y, w, tokens, s, true);
            break;
          case 'concept':
            if (elem.showConcept === false || !description) break;
            doc.setDrawColor(goldRgb[0], goldRgb[1], goldRgb[2]);
            doc.setLineWidth(0.5);
            doc.line(x, y, x, y + h);
            drawTextBlock(doc, '"' + description + '"', x + 2.5, y, w - 2.5, Object.assign({ fontSizePt: 9.5, italic: true, color: tokens.concept }, commonOpts, { italic: true }));
            break;
          case 'page_number':
            if (elem.showPageNum === false) break;
            hasPageNumBlock = true;
            drawTextBlock(doc, (isTh ? 'หน้า' : 'Page') + ' ' + pageNum, x, y, w, { fontFamily: 'Sarabun', fontSizePt: 7.5, color: tokens.sub, align: 'right' });
            break;
          case 'divider_line': {
            doc.setDrawColor(goldRgb[0], goldRgb[1], goldRgb[2]);
            doc.setLineWidth(0.3);
            doc.line(x, y + h / 2, x + w, y + h / 2);
            break;
          }
          case 'custom_text':
            drawTextBlock(doc, b.customContent || '', x, y, w, Object.assign({ fontSizePt: 10 }, commonOpts));
            break;
          default:
            break;
        }
      }

      if (!hasPageNumBlock && elem.showPageNum !== false) {
        drawTextBlock(doc, (isTh ? 'หน้า' : 'Page') + ' ' + pageNum, PAGE_W_MM - 40, PAGE_H_MM - 16, 30, { fontFamily: 'Sarabun', fontSizePt: 7.5, color: tokens.sub, align: 'right' });
      }
    }

    if (!usedBlockLayout) {
      // Fallback: fixed 4-block layout (image / meta / concept / artist), matches catalog.html's non-block fallback
      const imgX = pct2mm(bl.image.x, PAGE_W_MM), imgY = pct2mm(bl.image.y, PAGE_H_MM);
      const imgW = pct2mm(bl.image.w, PAGE_W_MM), imgH = pct2mm(bl.image.h || 74, PAGE_H_MM);
      await drawImageInBox(doc, item.image_url || item.thumbnail_url, imgX, imgY, imgW, imgH, 'contain');

      const metaX = pct2mm(bl.meta.x, PAGE_W_MM), metaY = pct2mm(bl.meta.y, PAGE_H_MM), metaW = pct2mm(bl.meta.w, PAGE_W_MM);
      let my = metaY;
      if (elem.showTitle !== false) {
        my += drawTextBlock(doc, title, metaX, my, metaW, { fontFamily: 'CormorantGaramond', fontSizePt: 16, bold: true, color: tokens.heading }) + 3;
      }
      const specs = [
        elem.showTechnique !== false && ['เทคนิค / Technique', technique],
        elem.showDimensions !== false && ['ขนาด / Dimensions', window.formatDimensions ? window.formatDimensions(item.dimensions) : item.dimensions],
        elem.showYear !== false && ['ปีที่สร้าง / Year', item.year_created],
        elem.showPrice !== false && item.price && ['ราคา / Price', window.formatPrice ? window.formatPrice(item.price) : item.price]
      ].filter(Boolean);
      specs.forEach(([label, val]) => {
        drawTextBlock(doc, label, metaX, my, metaW * 0.5, { fontFamily: 'Sarabun', fontSizePt: 8, color: tokens.sub });
        drawTextBlock(doc, String(val || ''), metaX + metaW * 0.5, my, metaW * 0.5, { fontFamily: 'Sarabun', fontSizePt: 8, color: tokens.heading, align: 'right', bold: true });
        my += 5.5;
      });

      if (elem.showConcept !== false && description) {
        const cX = pct2mm(bl.concept.x, PAGE_W_MM), cY = pct2mm(bl.concept.y, PAGE_H_MM), cW = pct2mm(bl.concept.w, PAGE_W_MM);
        doc.setDrawColor(goldRgb[0], goldRgb[1], goldRgb[2]);
        doc.line(cX, cY, cX, cY + 40);
        drawTextBlock(doc, '"' + description + '"', cX + 2.5, cY, cW - 2.5, { fontFamily: 'NotoSerifThai', fontSizePt: 9.5, italic: true, color: tokens.concept });
      }

      const aX = pct2mm(bl.artist.x, PAGE_W_MM), aY = pct2mm(bl.artist.y, PAGE_H_MM), aW = pct2mm(bl.artist.w, PAGE_W_MM);
      let ax = aX, ay = aY;
      if (elem.showAvatar !== false && avatar) {
        await drawImageInBox(doc, avatar, aX, aY, 14, 14, 'cover');
        ax = aX + 17;
      }
      if (elem.showArtist !== false) {
        drawTextBlock(doc, artistName, ax, ay, aW - (ax - aX), { fontFamily: 'CormorantGaramond', fontSizePt: 12, bold: true, color: tokens.heading });
        ay += 6;
      }
      if (elem.showFlag !== false) {
        await drawCountryFlagChip(doc, item.nationality, ax, ay, { fontSizePt: 7.5, color: tokens.sub, isTh });
      }

      if (elem.showPageNum !== false) {
        drawTextBlock(doc, (isTh ? 'หน้า' : 'Page') + ' ' + pageNum, PAGE_W_MM - 40, PAGE_H_MM - 16, 30, { fontFamily: 'Sarabun', fontSizePt: 7.5, color: tokens.sub, align: 'right' });
      }
    }
  }

  // ---------------------------------------------------------------------
  // Orchestration
  // ---------------------------------------------------------------------

  function setProgress(cb, done, total, label) {
    if (typeof cb === 'function') { try { cb(done, total, label); } catch (e) { /* noop */ } }
  }

  async function run(data) {
    const { catalogConfig, submissions, isTh, filename, onProgress, orgName, orgSub } = data;
    await ensureJsPDFLoaded();
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });

    setProgress(onProgress, 0, 1, isTh ? 'กำลังโหลดฟอนต์...' : 'Loading fonts...');
    await loadFonts(doc);

    const tokens = getThemeTokens(catalogConfig || {});
    let pageIndex = 0;
    const newPage = () => { if (pageIndex > 0) doc.addPage('a4', 'portrait'); pageIndex++; };

    newPage();
    setProgress(onProgress, 1, submissions.length + 3, isTh ? 'กำลังวาดหน้าปก...' : 'Drawing cover...');
    drawCoverPage(doc, catalogConfig, isTh, tokens, orgName, orgSub);

    newPage();
    setProgress(onProgress, 2, submissions.length + 3, isTh ? 'กำลังวาดหน้าคำนำ...' : 'Drawing foreword...');
    drawForewordPage(doc, catalogConfig, isTh, tokens);

    let pageNumCounter = 3;
    const jury = catalogConfig.jury;
    const hasJury = Boolean(jury && jury.enabled && Array.isArray(jury.members) && jury.members.length > 0);
    if (hasJury) {
      newPage();
      setProgress(onProgress, 3, submissions.length + 3, isTh ? 'กำลังวาดหน้ากรรมการ...' : 'Drawing jury page...');
      await drawJuryPage(doc, catalogConfig, isTh, tokens);
      pageNumCounter++;
    }

    const bl = (catalogConfig.freeLayout && catalogConfig.freeLayout.blocks) || DEFAULT_FREE_LAYOUT_BLOCKS;
    const elem = catalogConfig.elements || DEFAULT_ELEMENTS;

    for (let i = 0; i < submissions.length; i++) {
      const item = submissions[i];
      newPage();
      setProgress(onProgress, i + (hasJury ? 4 : 3), submissions.length + 3, (isTh ? 'กำลังวาดผลงาน ' : 'Drawing artwork ') + (i + 1) + '/' + submissions.length);

      const title = window.getField ? window.getField(item, 'title') : (item.title || '');
      const artistName = window.getArtistFullName ? window.getArtistFullName(item) : (item.artist_name || '');
      const technique = window.getField ? window.getField(item, 'technique') : (item.technique || '');
      const description = window.getField ? window.getField(item, 'description') : (item.description || '');
      const hasAvatar = Boolean(item.artist_avatar_url && String(item.artist_avatar_url).trim() && !String(item.artist_avatar_url).includes('unsplash.com'));
      const avatar = hasAvatar ? item.artist_avatar_url : '';

      const override = catalogConfig.pageOverrides && catalogConfig.pageOverrides[item.id];
      const templateSource = override || catalogConfig.masterTemplate;

      await drawArtworkSpreadPage(doc, {
        templateSource, item, bl, elem, tokens, title, artistName, technique, description, avatar,
        pageNum: pageNumCounter, isTh
      });
      pageNumCounter++;
    }

    setProgress(onProgress, submissions.length + 3, submissions.length + 3, isTh ? 'กำลังบันทึกไฟล์...' : 'Saving file...');
    doc.save(filename || 'catalog.pdf');
  }

  window.PDFExport = { run };
})();
