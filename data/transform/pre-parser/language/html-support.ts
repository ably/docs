/**
 * Begins with bq(definition...)
 * bq\(definition
 * Finds an optional named `anchor` group like (definition#myAnchorGroup)
 * (?<anchor>\#[^\)]+)?
 * Followed by a mandatory period, then any number of spaces, then a newline.
 * \.\s*\n
 * Any number of lines of content that eventually terminate
 * (?:.+?\n)*
 */
const BLOCKQUOTE_REGEX = /^bq\(definition(?<anchor>#[^)]+)?\)\.\s*\n(?:.+?\n)*/gm;

const blockQuoteReplacer = (matchText: string, anchor: string) => {
  const langDefinitions = Array.from(matchText.matchAll(/^\s*(.+?)\s*:\s*(.+?)\s*$/gm));
  const langSpans = langDefinitions
    .map((langDefinition) =>
      langDefinition[1] === 'jsall'
        ? `<span lang='javascript,nodejs'>${langDefinition[2]}</span>`
        : `<span lang='${langDefinition[1]}'>${langDefinition[2]}</span>`,
    )
    .join('');
  return `bq(definition${anchor ?? ''}). ${langSpans}\n\n`;
};
export const addLanguageSupportForBlockQuotes = (content: string) =>
  content.replace(BLOCKQUOTE_REGEX, blockQuoteReplacer);

/**
 * After any number of non-newline whitespaces
 * ^[^\S\r\n]
 * First capture: Starts with h1,h2,h3,h4,h5,h6
 * (h[1-6])
 * Second capture: optionally match (#someText), e.g. h1(#someText)
 * (\(#[^\)]+\))?
 * Third capture: optionally match (moreText), e.g. h1(#someText)(moreText) explicitly without a hash
 * (\([^(\)|#)]+\))?
 * New line (using multiline regex):
 * \.\s*\n
 * Any number of lines of content that eventually terminate
 * (?:.+?\n)*
 * Example:
 *
 * h2(#channels-object).
 *  default: Channels
 */
const HEADING_REGEX = /^[^\S\r\n]*(h[1-6])(\(#[^)]+\))?(\([^()|#)]+\))?\.\s*\n(?:.+?\n)*/gm;

const headingReplacer = (matchText: string, hTag: string, anchor: string) => {
  const langDefinitions = Array.from(matchText.matchAll(/^\s*(.+?)\s*:\s*(.+?)\s*$/gm));
  const langSpans = langDefinitions
    .map((langDefinition) =>
      langDefinition[1] === 'jsall'
        ? `<span lang='javascript,nodejs'>${langDefinition[2].trim()}</span>`
        : `<span lang='${langDefinition[1]}'>${langDefinition[2].trim()}</span>`,
    )
    .join('');
  return `\n${hTag}${anchor ?? ''}. ${langSpans}\n`;
};

export const addLanguageSupportForHeadings = (content: string) => content.replace(HEADING_REGEX, headingReplacer);
