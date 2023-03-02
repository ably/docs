// Duplicate quote links are gathered GREEDILY, not LAZILY by textile-js when a code section is nested inside quotes.
// The issue here is that the quotes are essentially duplicating the work of the 'code' element, marking out the
// contents as a discrete & specific entity, but textile-js scans all the way until it can find a colon and
// force the element to be an <a href>
export const fixDuplicateQuoteLinks: StringTransformation = (content) => content.replace(/"(@[^"]*@)"[^:]/g, '$1');

/**
 * The regex in this comment block is used throughout to identify valid link content.
 * To avoid errors when parsing code, the heuristic that the link text must contain at
 * least one printable character, not including underscore, has been relied upon.
 * [^">] => identifies non-quote and non-angle-bracket characters
 * [a-zA-Z0-9] => identifies alphanumeric characters
 * "([^">]*[a-zA-Z0-9]+[^">]*)" => identifies valid link text
 *
 * \w has been deliberately avoided because '_', which \w includes, could be part of code.
 */

// HTML elements immediately after links cause difficulties for the parser, appearing in links.
export const fixHtmlElementsInLinks: StringTransformation = (content) =>
  content.replace(/"([^">]*[a-zA-Z0-9]+[^">]*)":([^)\]@,\s<>"]+)</gm, '<a href="$2">$1</a><');

// Punctuation immediately after links is interpreted correctly by textile-js; but was not by Nanoc.
// We need to remove it to retain parity.
export const fixPunctuationInLinks: StringTransformation = (content) =>
  content.replace(
    /"([^">]*[a-zA-Z0-9]+[^">]*)":([^)\]@,\s<>\d{}}"]+?)(\.?)([)\]@,\s<>{}"])/gm,
    '<a href="$2">$1</a>$3$4',
  );
