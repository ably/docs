// Duplicate quote links are gathered GREEDILY, not LAZILY by textile-js when a code section is nested inside quotes.
// The issue here is that the quotes are essentially duplicating the work of the 'code' element, marking out the
// contents as a discrete & specific entity, but textile-js scans all the way until it can find a colon and
// force the element to be an <a href>
export const fixDuplicateQuoteLinks: StringTransformation = (content) => content.replace(/"(@[^"]*@)"[^:]/g, '$1');

// HTML elements immediately after links cause difficulties for the parser, appearing in links.
export const fixHtmlElementsInLinks: StringTransformation = (content) =>
  content.replace(/"([^"<]+)":([^)\]@,\s<>"]+)</gm, '<a href="$2">$1</a><');

// Punctuation immediately after links is interpreted correctly by textile-js; but was not by Nanoc.
// We need to remove it to retain parity.
export const fixPunctuationInLinks: StringTransformation = (content) =>
  content.replace(/"([^"<]+)":([^)\]@,\s<>\d{}}"]+?)(\.?)([)\]@,\s<>{}"])/gm, '<a href="$2">$1</a>$3$4');
