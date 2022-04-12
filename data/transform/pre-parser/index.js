const { compose } = require('lodash/fp');
const { replaceERB } = require('./erbjs');
const {
  convertJSAllToNodeAndJavaScript,
  convertBlangBlocksToTokens,
  addLanguageSupportForGithubStyleCode,
  duplicateLanguageBlocks,
  enforceWhiteSpaceLevelsBetweenLanguageElements,
  addLanguageSupportForBlockQuotes,
  addLanguageSupportForHeadings,
} = require('./language');
const { stripComments, addMinimizeForHeadings, addMinimizedIndent } = require('./semantic');
const { textileJSCompatibility } = require('./textile-js-workarounds');

// Newlines before closing tags inhibit textile-js' ability to correctly parse HTML
const removeNewlinesBeforeClosingTags = (content) => content.replace(/\n+(<\/\w+>)/g, '$1');

const preParser = compose(
  // Textile compatibility must follow all other changes
  textileJSCompatibility,
  // Language operations
  addLanguageSupportForHeadings,
  addLanguageSupportForBlockQuotes,
  enforceWhiteSpaceLevelsBetweenLanguageElements,
  duplicateLanguageBlocks,
  addLanguageSupportForGithubStyleCode,
  convertBlangBlocksToTokens,
  convertJSAllToNodeAndJavaScript,
  // Readability/Semantic operations
  addMinimizedIndent,
  addMinimizeForHeadings,
  removeNewlinesBeforeClosingTags,
  stripComments,
  // ERB to JS
  replaceERB,
);

module.exports = {
  preParser,
};