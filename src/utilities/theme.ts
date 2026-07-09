// Shared theme constants and the pre-paint init script. Kept framework-agnostic
// (no React) so it can be imported by both the theme context and gatsby-ssr.

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

// Persisted user choice. The docs site is its own origin, so this is scoped to
// docs; a future cross-property theme would move this to a shared cookie.
export const THEME_STORAGE_KEY = 'ably.docs.theme';

// Default until the user chooses. Deliberately 'light' (not 'system') while
// content imagery is still light-only (see DX-1518 phase 4); flip to 'system'
// once dark-mode imagery lands.
export const DEFAULT_THEME: Theme = 'light';

export const THEME_CLASS_LIGHT = 'ui-theme-light';
export const THEME_CLASS_DARK = 'ui-theme-dark';

const THEMES: readonly Theme[] = ['light', 'dark', 'system'];

export const isTheme = (value: unknown): value is Theme => THEMES.includes(value as Theme);

// Coerce an unknown/legacy persisted value to a known theme so a corrupt entry
// can never produce a `ui-theme-<garbage>` class with no light/dark fallback.
export const normalizeTheme = (value: string | null): Theme => (isTheme(value) ? value : DEFAULT_THEME);

/**
 * Inline script injected into <head> by gatsby-ssr so the theme class is set on
 * <html> before first paint, preventing a flash of the wrong theme on the
 * static build. It runs pre-hydration, so it must be self-contained and mirror
 * the resolution logic in theme-context (including the stored-value validation).
 */
export const THEME_NO_FLASH_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var theme = stored === 'light' || stored === 'dark' || stored === 'system' ? stored : '${DEFAULT_THEME}';
    var resolved =
      theme === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : theme;
    document.documentElement.classList.add('ui-theme-' + resolved);
  } catch (e) {
    document.documentElement.classList.add('${THEME_CLASS_LIGHT}');
  }
})();
`;
