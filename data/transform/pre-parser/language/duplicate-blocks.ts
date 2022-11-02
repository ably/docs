/**
 * Full regex (for Regex101.com etc.):
 * /(bc|p|h[1-6])\[([^\]]+)\](?:\(([^\)]+)\))?\.\s([\s\S]*?\S+?[\s\S]*?$)(?:[\n\r]\s*[\n\r]|\Z)/gm
 */
const CAPTURE_CODE_OR_LANGUAGE_TAG = '(bc|p|h[1-6])';
const LANGUAGE_SELECTOR = '\\[([^\\]]+)\\]';
const CAPTURE_OPTIONAL_CLASSES = '(?:\\(([^\\)]+)\\))?';
const ENDS_WITH_PERIOD = '\\.\\s';
const CAPTURE_BODY = '([\\s\\S]*?\\S+?[\\s\\S]*?$)';
const EMPTY_LINE_BREAK_OR_EOF = '(?:[\\n\\r]\\s*[\\n\\r]|\\Z)';

const MULTI_LANG_BLOCK_REGEX_STRING = `${
  // capture/match[0] is the tag
  CAPTURE_CODE_OR_LANGUAGE_TAG
}${
  // Language selector in format [javascript, ruby] - capture [1] = langs
  LANGUAGE_SELECTOR
}${
  // optional class(es) in format (class) - capture [2] = class(es)
  CAPTURE_OPTIONAL_CLASSES
}${
  // ends with . such as p[ruby].
  ENDS_WITH_PERIOD
}${
  // body - capture [3] = body
  CAPTURE_BODY
}${
  // non-capturing empty line break or EOF
  EMPTY_LINE_BREAK_OR_EOF
}`;

const MULTI_LANG_BLOCK_REGEX = new RegExp(MULTI_LANG_BLOCK_REGEX_STRING, 'gm');

export const duplicateLanguageBlock = (block: string, classes: string, content: string) => (lang: string) =>
  `${block}[${lang}]${classes ? `(${classes})` : ''}. ${content}`;

export const duplicateLanguageBlocks: StringTransformation = (content) => {
  const replacer: (substring: string, ...args: string[]) => string = (match, block, languages, classes, content) => {
    const langs = languages.split(/\s*,/);
    if (langs.length > 1) {
      return langs.map(duplicateLanguageBlock(block, classes, content)).join('\n\n') + '\n\n';
    }
    return match;
  };
  return content.replace(MULTI_LANG_BLOCK_REGEX, replacer);
};
