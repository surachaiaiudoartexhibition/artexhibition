# Project Guidelines & UI/UX Standards

This project follows the **UI/UX Pro Max** and **Impeccable** design intelligence systems for all frontend, user interface, styling, and user experience work.

## 1. UI/UX Pro Max Intelligence

Whenever designing, building, modifying, styling, or reviewing UI components, pages, portals (e.g. `master-portal`, `event-webapp`), or design systems in this workspace:

1. **Active Skill Integration**:
   - Utilize the `ui-ux-pro-max` skill located at `.agents/skills/ui-ux-pro-max/` (or `.agent/skills/ui-ux-pro-max/`).
   - Query design recommendations and palettes using the local CLI:
     ```bash
     python .agents/skills/ui-ux-pro-max/scripts/search.py "<product_type> <keywords>" --design-system
     python .agents/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain <ux|style|color|typography|icons|chart>
     python .agents/skills/ui-ux-pro-max/scripts/search.py "<query>" --stack <stack>
     ```

2. **Core UI/UX Rules & Priorities**:
   - **Accessibility (CRITICAL)**: Text contrast minimum 4.5:1, visible keyboard focus indicators, proper ARIA labels, semantic HTML.
   - **Touch & Interaction**: Minimum touch target 44×44px, `cursor-pointer` on all interactive elements, responsive feedback states (hover, active, focus, disabled).
   - **Iconography**: Never use raw emojis as UI icons; always use crisp SVG icons (e.g. Lucide, Heroicons, Phosphor).
   - **Responsive & Layout**: Mobile-first breakpoints (375px, 768px, 1024px, 1440px), prevent horizontal scrollbars, avoid fixed px container widths.
   - **Typography & Color**: Base font size 16px, line-height 1.5, coherent semantic color tokens (avoid raw, scattered hex codes).
   - **Animation**: Respect `prefers-reduced-motion`, use context-aware timing (150–300ms transitions), avoid layout thrashing.
   - **Pre-delivery Verification**: Test visual balance, error states, empty states, and loading indicators before completing tasks.

---

## 2. Impeccable Design & Craft Guidance

Utilize the **Impeccable** skill located at `.agents/skills/impeccable/` (and `.agent/skills/impeccable/`) for deep design critique, anti-pattern detection, and craft polishing.

1. **Deterministic Detector (61+ Anti-Pattern Rules)**:
   - Run design quality and anti-pattern scans before finishing frontend changes:
     ```bash
     npx.cmd impeccable detect apps/master-portal
     npx.cmd impeccable detect apps/event-webapp
     ```
   - Common Anti-Patterns Checked:
     - `overused-font`: Avoid overused generic fonts (Inter, Roboto, Space Grotesk) — pick faces with personality.
     - `flat-type-hierarchy`: Ensure clear step ratios between headings and body text (>= 1.25x).
     - `nested-cards`: Flatten excessive container nesting; rely on spacing, dividers, and typography.
     - `gray-on-color`: Never use washed-out gray text on colored backgrounds.
     - `dark-glow`: Avoid decorative zero-offset neon halos; use neutral elevation shadows.
     - `cramped-padding`: Ensure at least 8–16px padding inside bordered/outlined cards.

2. **Impeccable Craft Commands**:
   - `/impeccable audit <target>`: Run technical quality checks (accessibility, performance, responsive layout).
   - `/impeccable critique <target>`: UX design review with heuristic scoring.
   - `/impeccable polish <target>`: Final quality pass before shipping.
   - `/impeccable distill <target>`: Strip away unnecessary visual complexity.
   - `/impeccable harden <target>`: Handle edge cases, long text overflow, and error states.
   - `/impeccable animate <target>`: Add purposeful micro-interactions and smooth motion.
