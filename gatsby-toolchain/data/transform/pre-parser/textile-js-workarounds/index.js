const { compose } = require('lodash/fp');
const { fixDuplicateQuoteLinks } = require('./fix-duplicate-quote-links');
const { fixInlineCode } = require('./fix-inline-code');
const { fixTextileDefinitionLists } = require('./fix-textile-definition-lists');

// textile-js, unlike RedCloth, cannot parse multiple new lines between list items
// each list item will instead be wrapped in its own list collection
const compressMultipleNewlinesInLists = (content) => content.replace(/^(-.*)\n{2,}(?![^-])/gm, '$1\n');

// textile-js cannot parse h[1-6]. lines that are located inside another HTML tag, with leading spaces
const manuallyReplaceHTags = (content) => content.replace(/^\s*h([1-6])\.\s+(.*)$/gm, '<h$1>$2</h$1>');

const textileJSCompatibility = compose(
  fixTextileDefinitionLists,
  fixInlineCode,
  compressMultipleNewlinesInLists,
  manuallyReplaceHTags,
  fixDuplicateQuoteLinks,
);

module.exports = {
  compressMultipleNewlinesInLists,
  manuallyReplaceHTags,
  fixInlineCode,
  fixTextileDefinitionLists,
  textileJSCompatibility,
};
