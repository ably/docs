/**
 * Textile JS does not support hyphen-led unordered lists
 */
const addHyphenListSupport = (content) => content.replace(/^- (?!.*:=)(.*)$/gm, '* $1');

module.exports = { addHyphenListSupport };
