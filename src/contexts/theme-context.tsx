import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  DEFAULT_THEME,
  THEME_CLASS_DARK,
  THEME_CLASS_LIGHT,
  THEME_STORAGE_KEY,
  normalizeTheme,
  type ResolvedTheme,
  type Theme,
} from 'src/utilities/theme';

/**
 * ThemeContext
 *
 * Site-wide light/dark/system theming. The choice is persisted to localStorage
 * and reflected as `ui-theme-light` / `ui-theme-dark` on <html>, which drives
 * Tailwind's `dark:` variants (see tailwind.config.js `darkMode`).
 *
 * `theme` is the user's choice; `resolvedTheme` is the concrete light/dark it
 * resolves to (following the OS when set to 'system'). JS-driven consumers that
 * can't use CSS `dark:` variants — e.g. the Sandpack editor — read `resolvedTheme`.
 */

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const systemPrefersDark = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return false;
  }
};

const resolveTheme = (theme: Theme): ResolvedTheme =>
  theme === 'system' ? (systemPrefersDark() ? 'dark' : 'light') : theme;

// Read the persisted choice. localStorage access can throw where storage is
// blocked (privacy modes, partitioned/sandboxed iframes); since ThemeProvider
// is the root wrapper, an unhandled throw here would crash the whole app, so
// fall back to the default.
const readStoredTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return DEFAULT_THEME;
  }
  try {
    return normalizeTheme(localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    return DEFAULT_THEME;
  }
};

const applyThemeClass = (resolved: ResolvedTheme): void => {
  const { classList } = document.documentElement;
  classList.remove(THEME_CLASS_LIGHT, THEME_CLASS_DARK);
  classList.add(`ui-theme-${resolved}`);
};

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(readStoredTheme);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => resolveTheme(theme));

  const syncResolvedTheme = useCallback((resolved: ResolvedTheme) => {
    applyThemeClass(resolved);
    setResolvedTheme(resolved);
  }, []);

  // Reflect the current choice onto <html>. The pre-paint script in gatsby-ssr
  // sets this before hydration; here we keep it in sync as the choice changes.
  useEffect(() => {
    syncResolvedTheme(resolveTheme(theme));
  }, [theme, syncResolvedTheme]);

  // When following the system preference, react to OS-level changes live.
  useEffect(() => {
    if (theme !== 'system' || typeof window === 'undefined') {
      return undefined;
    }
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => syncResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, syncResolvedTheme]);

  const setTheme = useCallback((next: Theme) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Ignore write failures (e.g. Safari private mode).
    }
    setThemeState(next);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
