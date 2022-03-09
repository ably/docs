// Duplicate quote links are gathered GREEDILY, not LAZILY by textile-js
const fixDuplicateQuoteLinks = (content) =>
  content.replace(/"([^"]+?)":([/#\w-]+)/g, (_match, text, href) => `<a href="${href}">${text}</a>`);

module.exports = {
  fixDuplicateQuoteLinks,
};
