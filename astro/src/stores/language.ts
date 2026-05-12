import { atom } from 'nanostores';

export const SUPPORTED_LANGUAGES = [
  'javascript',
  'nodejs',
  'react',
  'python',
  'ruby',
  'java',
  'go',
  'php',
  'csharp',
  'swift',
  'kotlin',
  'flutter',
  'objc',
  'android',
  'rest',
  'realtime',
  'shell',
] as const;

export type LanguageKey = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: LanguageKey = 'javascript';

const STORAGE_KEY = 'ably-docs-language';
const QUERY_PARAM = 'lang';

export const $language = atom<LanguageKey>(DEFAULT_LANGUAGE);

/**
 * Read the initial language from `?lang=` query param, then localStorage.
 * Must run on the client — Astro SSR imports this file but will only touch
 * the atom from island code.
 */
export const initLanguageFromEnvironment = () => {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  const fromQuery = url.searchParams.get(QUERY_PARAM);
  if (fromQuery && (SUPPORTED_LANGUAGES as readonly string[]).includes(fromQuery)) {
    $language.set(fromQuery as LanguageKey);
    return;
  }
  try {
    const fromStorage = window.localStorage.getItem(STORAGE_KEY);
    if (fromStorage && (SUPPORTED_LANGUAGES as readonly string[]).includes(fromStorage)) {
      $language.set(fromStorage as LanguageKey);
    }
  } catch {
    /* localStorage blocked — stick with default */
  }
};

export const setLanguage = (next: LanguageKey) => {
  $language.set(next);
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* ignore */
  }
  const url = new URL(window.location.href);
  url.searchParams.set(QUERY_PARAM, next);
  window.history.replaceState({}, '', url.toString());
};
