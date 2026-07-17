import { LanguageKey } from 'src/data/languages/types';
import { ExampleFiles } from 'src/data/examples/types';

// Applies the docs host theme to a Sandpack example preview by baking the theme
// into the example's files. When the docs theme changes, ExamplesRenderer
// regenerates these files with the new value and Sandpack reloads the preview
// so it renders in the matching theme.
//
// This is deliberately simpler and more robust than live cross-iframe
// messaging: no postMessage, no handshake, no polling, no timing window — the
// theme is fixed at file-generation time, at the cost of a short reload when the
// theme changes.

const THEME_SYNC_FILE = 'ably-theme-sync.js';

// The side-effect module baked into each example; `isDark` is fixed when the
// files are generated.
const themeSyncModule = (
  isDark: boolean,
): string => `// Injected by the docs site — applies the docs theme to this preview.
(function () {
  if (typeof window === 'undefined') return;
  // Class-based dark mode so Tailwind \`dark:\` utilities follow the class rather
  // than the OS preference (the Play CDN defaults to media).
  window.tailwind = window.tailwind || {};
  window.tailwind.config = Object.assign({}, window.tailwind.config, { darkMode: 'class' });

  document.documentElement.classList.toggle('dark', ${isDark});
  document.documentElement.style.colorScheme = ${isDark ? "'dark'" : "'light'"};

  // The examples' --primary token is identical in light and dark, so
  // uk-text-primary (used for body text) would stay a low-contrast mid-slate on
  // dark. Remap it to the foreground token in dark; scoped to .dark so light is
  // untouched.
  var fixes = document.createElement('style');
  fixes.textContent = '.dark .uk-text-primary{color:hsl(var(--foreground))}';
  (document.head || document.documentElement).appendChild(fixes);
})();
`;

// Entry module per template (see data/createPages: react files are stripped of
// their `src/` prefix, javascript files keep their project-relative path). Match
// on a pattern so both `index.tsx` and `main.tsx` entries (and any `src/`-prefixed
// variant) are found.
const ENTRY_PATTERN_BY_LANGUAGE: Partial<Record<LanguageKey, RegExp>> = {
  react: /(^|\/)(index|main)\.tsx$/,
  javascript: /(^|\/)script\.ts$/,
};

// Sandpack accepts either a raw code string or a { code, hidden } object per
// file (the renderer already relies on this for the injected tsconfig).
type SandpackFilesMap = Record<string, string | { code: string; hidden?: boolean }>;

const codeOf = (file: string | { code?: string }): string => (typeof file === 'string' ? file : (file.code ?? ''));

/**
 * Return a copy of an example's files with the theme baked in: a hidden module
 * (imported from the entry) applies the current theme on load, and the HTML head
 * gets the class-based dark-mode config ahead of the Tailwind CDN. Regenerated
 * per theme, so the preview reloads to match when the docs theme changes.
 */
export const withThemeSync = (
  files: ExampleFiles[LanguageKey],
  language: LanguageKey,
  resolvedTheme: 'light' | 'dark',
): SandpackFilesMap | undefined => {
  if (!files) {
    return files;
  }

  const isDark = resolvedTheme === 'dark';
  const result = { ...files } as SandpackFilesMap;

  // Add the theme module in the entry's directory and import it, so a relative
  // `./` import resolves in both templates (react's entry is at the root; the
  // javascript entry lives under src/).
  const entryPattern = ENTRY_PATTERN_BY_LANGUAGE[language];
  const entryKey = entryPattern ? Object.keys(result).find((key) => entryPattern.test(key)) : undefined;
  if (entryKey) {
    const slash = entryKey.lastIndexOf('/');
    const entryDir = slash >= 0 ? entryKey.slice(0, slash + 1) : '';
    result[`${entryDir}${THEME_SYNC_FILE}`] = { code: themeSyncModule(isDark), hidden: true };

    const importLine = `import './${THEME_SYNC_FILE}';\n`;
    const original = result[entryKey];
    const code = codeOf(original);
    if (!code.includes(THEME_SYNC_FILE)) {
      result[entryKey] =
        typeof original === 'string' ? importLine + original : { ...(original as object), code: importLine + code };
    }
  }

  // Set up the theme in the HTML <head>, ahead of the Tailwind Play CDN and the
  // bundle, so `dark:` utilities key off the class and — crucially — the page
  // paints on the dark canvas from the very first frame. Without this the iframe
  // shows a white flash before the JS entry runs, which is visible on the slower
  // re-bundle that a language switch triggers.
  const htmlKey =
    'index.html' in result ? 'index.html' : Object.keys(result).find((key) => key.replace(/^\//, '') === 'index.html');
  if (htmlKey) {
    const html = codeOf(result[htmlKey]);
    if (!html.includes('darkMode')) {
      const headTag =
        `<script>window.tailwind=window.tailwind||{};window.tailwind.config=Object.assign({},window.tailwind.config,{darkMode:'class'});` +
        `${isDark ? "document.documentElement.classList.add('dark');" : ''}</script>` +
        `${isDark ? '<style>html{background-color:#03020d;color-scheme:dark}</style>' : ''}`;
      const injected = html.includes('<head>')
        ? html.replace('<head>', `<head>\n    ${headTag}`)
        : `${headTag}\n${html}`;
      const originalHtml = result[htmlKey];
      result[htmlKey] = typeof originalHtml === 'string' ? injected : { ...(originalHtml as object), code: injected };
    }
  }

  return result;
};
