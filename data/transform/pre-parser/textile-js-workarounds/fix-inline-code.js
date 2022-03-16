// textile-js, unlike RedCloth, does not interpret @...@ sections as <code> elements
// if they are preceded by a non-space character
const fixInlineCode = (content) => content.replace(/@(.+?)@/gm, '<code>$1</code>');

module.exports = {
  fixInlineCode,
};
