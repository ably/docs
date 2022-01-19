const { identity } = require("lodash");

/**
 * Begins with bq(definition...)
 * bq\(definition
 * Finds an optional named `anchor` group like (definition#myAnchorGroup)
 * (?<anchor>\#[^\)]+)?
 * Followed by a mandatory period, then any number of spaces, then a newline.
 * \.\s*\n
 * Then lazily match any number of any character...
 * .*?
 * ...until we find a newline that is empty
 * \n\s*\n
 */
const BLOCKQUOTE_REGEX = /^bq\(definition(?<anchor>\#[^\)]+)?\)\.\s*\n.*?\n\s*\n/mg;

/**
 * Any number of spaces
 * \s*
 * First capture group: at least one of any character, matched lazily
 * (.+?)
 * Any number of spaces, followed by a colon, followed by any number of spaces
 * \s*:\s*
 * Second capture group: same as the first
 * (.+?)
 * Any number of spaces, followed by a newline, circumflex/hat, or pipe symbol
 * \s*[\n|^]
 * Examples:
 * "   (one) :  (two)|"
 * "(first):(second)
 * "
 * " (primary) : (secondary) ^"
 */
const LANGUAGE_DEFINITIONS_REGEX = /\s*(.+?)\s*:\s*(.+?)\s*[\n|^]/;

const blockQuoteReplacer = (matchText, anchor) => {
    const langDefinitions = matchText.match(LANGUAGE_DEFINITIONS_REGEX).slice(1);
    const langs = langDefinitions.filter((_v, i) => i % 2 === 0);
    const definitions = langDefinitions.filter((_v, i) => i % 2 !== 0);

    const langSpans = langs.map((lang, i) =>
        lang === 'jsall' ?
            `<span lang='javascript,nodejs'>${definitions[i]}</span>` :
            `<span lang='${lang}'>${definitions[i]}</span>`
    ).join('');
    return `bq(definition${anchor ?? ''}). ${langSpans}\n\n`;
}
const addLanguageSupportForBlockQuotes = content => content.replace(BLOCKQUOTE_REGEX, blockQuoteReplacer);

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
const HEADING_REGEX = /^[^\S\r\n]*(h[1-6])(\(#[^\)]+\))?(\([^(\)|#)]+\))?\.\s*\n(?:.+?\n)*/mg

const headingReplacer = (matchText, hTag, anchor, _option) => {
    const langDefinitions = Array.from(matchText.matchAll(/^\s*(.+?)\s*:\s*(.+?)\s*$/mg));
    const langSpans = langDefinitions.map(langDefinition =>
        langDefinition[1] === 'jsall' ?
            `<span lang='javascript,nodejs'>${langDefinition[2]}</span>` :
            `<span lang='${langDefinition[1]}'>${langDefinition[2]}</span>`
    ).join('');
    return `${hTag}${anchor}. ${langSpans}`
}
const addLanguageSupportForHeadings = content => content.replace(HEADING_REGEX, headingReplacer);

module.exports = {
    addLanguageSupportForBlockQuotes,
    addLanguageSupportForHeadings
}