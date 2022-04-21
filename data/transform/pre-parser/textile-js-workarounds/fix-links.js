// Duplicate quote links are gathered GREEDILY, not LAZILY by textile-js when a code section is nested inside quotes.
// The issue here is that the quotes are essentially duplicating the work of the 'code' element, marking out the
// contents as a discrete & specific entity, but textile-js scans all the way until it can find a colon and
// force the element to be an <a href>
const fixDuplicateQuoteLinks = (content) => content.replace(/"(@[^"]*@)"[^:]/g, '$1');

// HTML elements immediately after links cause difficulties for the parser, appearing in links.
const fixHtmlElementsInLinks = (content) => content.replace(/"([^"<]+)":([^<\s]+)</gm, '<a href="$2">$1</a><');

module.exports = {
  fixDuplicateQuoteLinks,
  fixHtmlElementsInLinks,
};
