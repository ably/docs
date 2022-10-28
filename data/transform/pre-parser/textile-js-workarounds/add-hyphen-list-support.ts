/**
 * Textile JS does not support hyphen-led unordered lists
 */
export const addHyphenListSupport: StringTransformation = (content) => content.replace(/^- (?!.*:=)(.*)$/gm, '* $1');
