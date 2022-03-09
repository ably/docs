// Duplicate quote links are gathered GREEDILY, not LAZILY by textile-js when a code section is nested inside quotes.
const fixDuplicateQuoteLinks = (content) => content.replace(/"(@[^"]*@)"[^:]/g, '$1');

module.exports = {
  fixDuplicateQuoteLinks,
};
