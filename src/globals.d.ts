declare module '*.png';

// highlightjs-curl ships no types; it's a highlight.js LanguageFn.
declare module 'highlightjs-curl/src/languages/curl' {
  import type { LanguageFn } from 'highlight.js';
  const curl: LanguageFn;
  export default curl;
}
