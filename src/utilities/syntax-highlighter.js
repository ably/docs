import hljs from 'highlight.js/lib/core';

// Map certain frameworks, protocols etc to available langauage packs
const languageToHighlightKey = (lang) => {
  let id;

  if (!lang) {
    lang = 'text';
  }

  switch (lang.toLowerCase()) {
    case 'android':
      id = 'java';
      break;

    case '.net':
    case 'net':
    case 'dotnet':
    case 'csharp':
    case 'c#':
      id = 'cs';
      break;

    case 'objc':
    case 'objective c':
      id = 'objectivec';
      break;

    case 'laravel':
      id = 'php';
      break;

    case 'flutter':
      id = 'dart';
      break;

    case 'node.js':
    case 'js':
      id = 'javascript';
      break;

    case 'ts':
      id = 'typescript';
      break;

    case 'kotlin':
    case 'kt':
      id = 'kotlin';
      break;

    case 'shell':
    case 'fh':
    case 'sh':
      id = 'bash';
      break;

    case 'https':
    case 'http':
    case 'txt':
    case 'plaintext':
      id = 'text';
      break;

    case 'cmd':
    case 'bat':
      id = 'dos';
      break;

    case 'yml':
      id = 'yaml';
      break;

    case 'erl':
      id = 'erlang';
      break;

    case 'patch':
      id = 'diff';
      break;

    case 'svg':
      id = 'xml';
      break;

    default:
      break;
  }

  return id || lang;
};

const registerDefaultLanguages = (register) => {
  register.forEach(({ key, module }) => hljs.registerLanguage(key, module));
};

const highlightSnippet = (languageKeyword, snippet) => {
  const language = languageToHighlightKey(languageKeyword);
  if (typeof snippet !== 'string' || !snippet || !language) return;

  return hljs.highlight(snippet, { language }).value;
};

/**
 * Parse line highlight specifications from a meta string.
 *
 * Syntax: `highlight="+1-3,-5,7"`
 *   - `+` prefix: addition (green)
 *   - `-` prefix: removal (red)
 *   - no prefix: neutral highlight (blue)
 *   - `N-M`: inclusive line range
 *   - comma-separated for multiple specs
 *
 * @param {string} languageString - the language, e.g. "javascript"
 * @param {string} [meta] - string containing highlight specs, e.g. 'highlight="+1-3,-5,7"'
 * @returns {{ lang: string, highlights: Record<number, 'addition' | 'removal' | 'highlight'> }}
 */
const parseLineHighlights = (languageString, meta) => {
  if (!meta) {
    return { lang: languageString, highlights: {} };
  }

  const match = meta.match(/highlight=["']?([^"']+)["']?/);
  if (!match) {
    return { lang: languageString, highlights: {} };
  }

  const spec = match[1];
  const highlights = {};

  const tokens = spec.split(',');
  for (const token of tokens) {
    const trimmed = token.trim();
    if (!trimmed) continue;

    let type = 'highlight';
    let rangePart = trimmed;

    if (trimmed.startsWith('+')) {
      type = 'addition';
      rangePart = trimmed.slice(1);
    } else if (trimmed.startsWith('-')) {
      type = 'removal';
      rangePart = trimmed.slice(1);
    }

    const rangeMatch = rangePart.match(/^(\d+)(?:-(\d+))?$/);
    if (!rangeMatch) continue;

    const start = parseInt(rangeMatch[1], 10);
    const end = rangeMatch[2] ? parseInt(rangeMatch[2], 10) : start;

    for (let i = start; i <= end; i++) {
      highlights[i] = type;
    }
  }

  return { lang: languageString, highlights };
};

/**
 * Split highlighted HTML by newlines, repairing any spans that cross
 * line boundaries so each line fragment is valid HTML.
 *
 * @param {string} html - HTML string produced by highlight.js
 * @returns {string[]} one HTML fragment per source line
 */
const splitHtmlLines = (html) => {
  const rawLines = html.split('\n');
  const result = [];
  let openTags = [];

  for (const rawLine of rawLines) {
    let line = openTags.join('') + rawLine;

    // Process open/close tags in document order
    const tagPattern = /<(\/?)span([^>]*)>/g;
    let m;
    while ((m = tagPattern.exec(rawLine)) !== null) {
      if (m[1] === '/') {
        openTags.pop();
      } else {
        openTags.push(m[0]);
      }
    }

    // Close any tags still open so this line is valid HTML
    for (let i = 0; i < openTags.length; i++) {
      line += '</span>';
    }

    result.push(line);
  }

  return result;
};

const LINE_HIGHLIGHT_CLASSES = {
  addition: 'code-line-addition',
  removal: 'code-line-removal',
  highlight: 'code-line-highlight',
};

export {
  highlightSnippet,
  languageToHighlightKey,
  LINE_HIGHLIGHT_CLASSES,
  parseLineHighlights,
  registerDefaultLanguages,
  splitHtmlLines,
};
