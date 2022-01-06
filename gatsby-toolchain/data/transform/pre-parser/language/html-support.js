const { identity } = require("lodash");

const BLOCKQUOTE_REGEX = /^bq\(definition(?<anchor>\#[^\)]+)?\)\.\s*\n.*?\n\s*\n/mg;
const blockQuoteReplacer = (matchText, anchor) => {
    const langDefinitions = matchText.match(/\s*(.+?)\s*:\s*(.+?)\s*[\n|^]/).slice(1);
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

const HEADING_REGEX = /^(h[1-6])(\(#[^\)]+\))?(\([^(\)|#)]+\))?\.\s*\n.+?\n\s*\n/mg
const headingReplacer = (matchText, hTag, anchor, _option) => {
    const langDefinitions =matchText.match(/\s*(.+?)\s*:\s*(.+?)\s*[\n|^]/);
    const langs = langDefinitions.filter((_v, i) => i % 2 === 0);
    const definitions = langDefinitions.filter((_v, i) => i % 2 !== 0);
    const langSpans = langs.map((lang, i) =>
        lang === 'jsall' ?
            `<span lang='javascript,nodejs'>${definitions[i]}</span>` :
            `<span lang='${lang}'>${definitions[i]}</span>`
    ).join('');
    return `${hTag}${anchor}. ${langSpans}`
}
const addLanguageSupportForHeadings = content => content.replace(HEADING_REGEX, headingReplacer);

module.exports = {
    addLanguageSupportForBlockQuotes,
    addLanguageSupportForHeadings
}