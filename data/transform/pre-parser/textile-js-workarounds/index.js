const { compose } = require('lodash/fp');
const { fixDuplicateQuoteLinks, fixHtmlElementsInLinks } = require('./fix-links');
const { fixInlineCode } = require('./fix-inline-code');
const { fixTextileDefinitionLists } = require('./fix-textile-definition-lists');
const { addItalicisedText } = require('./add-italicised-text');
const { fixLeadingHtmlTags } = require('./fix-leading-html-tags');
const { addBoldText } = require('./add-bold-text');
const { addHyphenListSupport } = require('./add-hyphen-list-support');

// textile-js, unlike RedCloth, cannot parse multiple new lines between list items
// each list item will instead be wrapped in its own list collection
const compressMultipleNewlinesInLists = (content) => content.replace(/^(-.*)\n{2,}(?![^-])/gm, '$1\n');

// textile-js cannot parse h[1-6]. lines that are located inside another HTML tag, with leading spaces
const manuallyReplaceHTags = (content) => content.replace(/^\s*h([1-6])\.\s+(.*)$/gm, '\n<h$1>$2</h$1>');

const textileJSCompatibility = compose(
  fixLeadingHtmlTags,
  fixTextileDefinitionLists,
  fixInlineCode,
  compressMultipleNewlinesInLists,
  manuallyReplaceHTags,
  fixDuplicateQuoteLinks,
  fixHtmlElementsInLinks,
  addHyphenListSupport,
  addItalicisedText,
  addBoldText,
);

module.exports = {
  compressMultipleNewlinesInLists,
  manuallyReplaceHTags,
  fixInlineCode,
  fixTextileDefinitionLists,
  textileJSCompatibility,
};
