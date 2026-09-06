/**
 * Curatorial Theme Engine for Virtual Art Exhibitions
 * Supported Curatorial Design Styles:
 * 1. heritage     : Neo-Classical Heritage & Royal Salon (วิทยาลัยเพาะช่าง)
 * 2. swiss-modern : Swiss Modernism & Editorial Grid (Obsidian Noir)
 * 3. white-cube   : Exaggerated Minimalism & White Cube Gallery
 * 4. bento-craft  : Curatorial Bento & Organic Craft (Celadon Forest)
 */

(function () {
  const THEMES = [
    {
      id: 'heritage',
      aliases: ['crimson', 'pohchang'],
      nameTh: '🏛️ เพาะช่าง เฮอริเทจ (Neo-Classical)',
      nameEn: 'Poh-Chang Heritage',
      shortName: 'Heritage',
      color: '#8b1b1b',
      accentColor: '#d4af37',
      bg: '#14070a'
    },
    {
      id: 'swiss-modern',
      aliases: ['noir', 'swiss'],
      nameTh: '⬛ สวิส โมเดิร์น (Swiss Editorial Noir)',
      nameEn: 'Swiss Modernism',
      shortName: 'Swiss Modern',
      color: '#c5a059',
      accentColor: '#e2c792',
      bg: '#090a0d'
    },
    {
      id: 'white-cube',
      aliases: ['white', 'minimal'],
      nameTh: '⬜ ไวท์คิวบ์ มินิมอล (White Cube Gallery)',
      nameEn: 'White Cube Minimal',
      shortName: 'White Cube',
      color: '#b45309',
      accentColor: '#8c3f04',
      bg: '#f7f7f8'
    },
    {
      id: 'bento-craft',
      aliases: ['celadon', 'bento'],
      nameTh: '🍵 เบนโตะ คราฟต์ (Bento Craft Celadon)',
      nameEn: 'Bento Craft Celadon',
      shortName: 'Bento Craft',
      color: '#7ea990',
      accentColor: '#c5b358',
      bg: '#09130f'
    }
  ];

  function resolveThemeId(input) {
    if (!input) return null;
    const clean = input.toLowerCase().trim();
    const match = THEMES.find(t => t.id === clean || (t.aliases && t.aliases.includes(clean)));
    return match ? match.id : null;
  }

  function getQueryTheme() {
    const params = new URLSearchParams(window.location.search);
    const t = params.get('theme') || params.get('style');
    return resolveThemeId(t);
  }

  function getStoredTheme() {
    try {
      const stored = localStorage.getItem('event_theme_override');
      return resolveThemeId(stored);
    } catch (e) {}
    return null;
  }

  function applyTheme(themeId) {
    const resolved = resolveThemeId(themeId) || 'heritage';
    document.documentElement.setAttribute('data-theme', resolved);
    document.documentElement.className = document.documentElement.className
      .replace(/\btheme-[^\s]+/g, '') + ' theme-' + resolved;
    
    // Dispatch custom event for UI updates
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: resolved } }));
    if (typeof document !== 'undefined' && document.body) {
      renderThemeSwitchers();
    }
  }

  // Pre-hydration synchronous theme application to prevent FOUC
  const initialTheme = getQueryTheme() || getStoredTheme() || 'heritage';
  applyTheme(initialTheme);

  // Async configuration sync with /api/config
  document.addEventListener('DOMContentLoaded', async () => {
    // If not manually overridden by query, check API config
    if (!getQueryTheme() && !getStoredTheme()) {
      try {
        const res = await fetch('/api/config');
        if (res.ok) {
          const cfg = await res.json();
          const resolved = resolveThemeId(cfg.eventTheme);
          if (resolved) {
            applyTheme(resolved);
          }
        }
      } catch (e) {
        // Fallback gracefully
      }
    }
    
    // Render theme switcher widgets across mounts
    renderThemeSwitchers();
  });

  function setTheme(themeId, persist = true) {
    const resolved = resolveThemeId(themeId) || 'heritage';
    applyTheme(resolved);
    if (persist) {
      try {
        localStorage.setItem('event_theme_override', resolved);
      } catch (e) {}
    }
  }

  function clearThemeOverride() {
    try {
      localStorage.removeItem('event_theme_override');
    } catch (e) {}
    applyTheme('heritage');
  }

  function renderThemeSwitchers() {
    const containers = document.querySelectorAll('.theme-picker-mount');
    const currentTheme = resolveThemeId(document.documentElement.getAttribute('data-theme')) || 'heritage';

    containers.forEach(container => {
      container.innerHTML = `
        <div class="inline-flex items-center gap-1 p-1.5 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] corner-cut-12 shadow-md">
          ${THEMES.map(t => {
            const isActive = currentTheme === t.id;
            return `
              <button
                type="button"
                onclick="window.GalleryTheme.setTheme('${t.id}')"
                class="px-2.5 py-1.5 text-xs font-medium corner-cut-6 transition-all flex items-center gap-1.5 ${
                  isActive 
                    ? 'bg-[var(--color-accent-glow)] text-[var(--color-accent-light)] font-semibold border border-[var(--border-accent)] shadow-sm' 
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]'
                }"
                title="${t.nameTh}">
                <span class="w-2.5 h-2.5 corner-cut-2 border border-black/30 shrink-0" style="background-color: ${t.color}"></span>
                <span class="text-[11px] tracking-wide whitespace-nowrap">${t.shortName}</span>
              </button>
            `;
          }).join('')}
        </div>
      `;
    });
  }

  window.GalleryTheme = {
    themes: THEMES,
    current: () => resolveThemeId(document.documentElement.getAttribute('data-theme')) || 'heritage',
    setTheme,
    clearOverride: clearThemeOverride,
    applyTheme,
    resolveThemeId
  };
})();
