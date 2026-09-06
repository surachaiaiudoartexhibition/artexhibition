---
target: apps/event-webapp/public/index.html
total_score: 18
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
target_identity: "file:D:\\project-ai\\port\\apps\\event-webapp\\public\\index.html"
target_fingerprint: "sha256:55b3efd31a12a1fb63cba56c4dae24194cb4cd0c0324b6c00e9e99e68e544c8a"
target_path: "D:\\project-ai\\port\\apps\\event-webapp\\public\\index.html"
timestamp: 2026-09-04T17-23-35Z
slug: apps-event-webapp-public-index-html
---
# Design Critique: apps/event-webapp/public/index.html

Method: dual-agent (A: db5e4210-bbcc-41fe-94ed-ff85cb2e8c8c · B: 59fc92eb-580b-45d6-93c5-03ae668b7603)

### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|:---:|---|
| 1 | Visibility of System Status | 2/4 | Skeletons pulse during fetch, but API rejection freezes indefinitely with no error copy. |
| 2 | Match System / Real World | 2/4 | Museum vocabulary punctuated by developer leaks: `#${art.id}`, `/admin.html` in nav, cloud hosting boast in footer. |
| 3 | User Control and Freedom | 3/4 | Responsive navigation and language switcher; lacks breadcrumb/scroll anchors. |
| 4 | Consistency and Standards | 2/4 | English hero title hardcoded on Thai landing; disparate gold hex values; 4:3 crop distorts prints. |
| 5 | Error Prevention | 2/4 | Unhandled API exceptions in DOMContentLoaded swallowed silently. |
| 6 | Recognition Rather Than Recall | 3/4 | Artwork title, artist name, and preview clearly visible on highlight cards. |
| 7 | Flexibility and Efficiency | n/a | *(Public fine-art exhibition landing surface; no expert shortcut workflows)* |
| 8 | Aesthetic and Minimalist Design | 3/4 | Serene obsidian canvas and refined serifs marred by 3-button hero cluster and DevOps footer text. |
| 9 | Error Recovery | 1/4 | Failed network calls leave visitors staring at pulsing placeholders without retry action. |
| 10 | Help and Documentation | n/a | *(Self-explanatory digital exhibition entrance)* |
| **Total** | | **18/32** | **Baseline Functional (Needs Curatorial Hardening)** |

### Design Specificity Verdict
**Curatorial Facade with SaaS/Developer Underbelly (Hybrid Specificity)**

- **LLM Assessment**: The page projects an atmospheric mood with Obsidian (`#090a0d`), Champagne Bronze, and classical serif pairings (Cormorant Garamond + Noto Serif Thai). However, it is held back by pervasive SaaS and database tropes: a 3-button hero cluster, rigid `object-cover` artwork cropping that ignores fine-art margins, raw database primary keys (`#${art.id}`), `/admin.html` in primary navigation, and an infrastructure boast in the footer.
- **Deterministic Scan**: Mechanical detector reported 5 warnings on `index.html`: `overused-font` (Plus Jakarta Sans), `hero-eyebrow-chip` (pill chip above h1), `pulsing-dot` (blinking status indicator), `gradient-text` (gold gradient clipping), and `dark-glow` (halo shadows and blurred spotlight). The detector operated in degraded regex fallback mode as DOM parser packages are not bundled in root.
- **Visual Overlays**: No live browser injection overlay active; static deterministic evidence used.

### Overall Impression
The visual mood successfully evokes the quiet serenity of entering an international gallery at dusk. But the curatorial illusion collapses whenever a visitor encounters developer artifacts (cloud architecture in footer, database IDs, generic SaaS eyebrow pills). Stripping away these tells will elevate the site into an authentic digital salon.

### What's Working
1. **Atmospheric Color & Typography Foundation**: Cormorant Garamond and Noto Serif Thai against `#090a0d` create a distinguished exhibition entrance.
2. **Subtle Card Micro-interactions**: The 700ms image zoom transition (`group-hover:scale-[1.03]`) gives tactile weight to digital artworks.
3. **Structured Dual-Language Framework**: Language switching smoothly swaps metadata and nav items with clean layout stability.

### Priority Issues

#### [P0] Immersion-Breaking Infrastructure Footer & Database Leaks
- **Why it matters**: Footer displays `"Multi-Tenant Virtual Exhibition System • Zero-Budget Architecture (Cloudflare Pages + D1 + Cloudinary)"` and cards display `#${art.id}`. In addition, `/admin.html` sits in the main nav. This reduces a cultural institution to a tech demo.
- **Fix**: Replace footer with an authentic exhibition colophon (curatorial committee, host dates, copyright). Hide `/admin.html` behind discreet URL/footer access. Replace `#${art.id}` with artwork medium, year, or accession number.
- **Suggested command**: `/impeccable distill`

#### [P1] Compounding AI Slop Tells in the Hero Section
- **Why it matters**: The hero section contains 4 distinct AI signifiers: a tracked uppercase pill chip, a pulsing status dot, an italic text gradient, and a blurred background halo. These elements signal template-generated UI rather than bespoke institutional craft.
- **Fix**: Replace the pill chip with a quiet typographic date line (`Bangkok • September 2026`). Remove the pulsing dot. Render the exhibition title in solid refined warm gold (`#e2c792`). Replace the blurred halo with ambient negative space.
- **Suggested command**: `/impeccable quieter`

#### [P1] Hardcoded Hero Title & Broken Multi-Tenant Localization
- **Why it matters**: `#hero-title` is hardcoded in English ("International Contemporary Printmaking 2026") regardless of language selection, and does not dynamically sync with `config.eventTitle`.
- **Why it matters**: Incongruous for Thai visitors and breaks whenever an organizer configures a new exhibition name.
- **Fix**: Bind `#hero-title` to dynamic config/i18n dictionary and render bilingual or custom event titles.
- **Suggested command**: `/impeccable harden`

#### [P2] Disrespectful "Object-Cover" Cropping of Fine Art Prints
- **Why it matters**: The preview cards enforce `aspect-[4/3]` with `object-cover`, slicing off margins and plate marks on vertical, square, or wide prints.
- **Fix**: Use `object-contain` within a museum-mat container with breathing room to preserve exact artistic proportions.
- **Suggested command**: `/impeccable polish`

#### [P3] Unhandled API Failure State Leaving Skeletons Frozen
- **Why it matters**: If `EventAPI.getSubmissions()` rejects, the error is swallowed by `console.error`, leaving pulse skeletons animating forever without user feedback.
- **Fix**: Render a graceful fallback banner with an exhibition inquiry notice and a retry trigger.
- **Suggested command**: `/impeccable harden`

### Persona Red Flags
- **The Fine Art Collector / Curator**: Sees `#3` stamped on an artwork like an SKU, notices print edges cropped by a 4:3 box, and reads a cloud-hosting deployment brag in the footer. They immediately discount the platform as amateurish.
- **The First-Time Visitor**: Enters expecting art, but sees zero artwork imagery above the fold—only 3 competing buttons. They experience choice friction before knowing what the show is about.

### Minor Observations
- Active nav link lacks `aria-current="page"`.
- SVGs lack `aria-hidden="true"`.
- Multiple gold hex definitions (`#c5a059`, `#d4af37`, `#aa8126`, `#e2c792`) lack a unified token scale.
- Unconstrained hero spotlight `w-[700px]` risks subtle horizontal scroll on narrow mobile screens.

### Questions to Consider
1. *If a physical museum hung a banner in its foyer boasting about its server hosting budget, would collectors take the exhibition seriously?*
2. *Why are fine-art prints treated like e-commerce products with destructive 4:3 center crops?*
3. *Could replacing the 3-button hero cluster with a single breathtaking centerpiece transform the page into an authentic digital vernissage?*
