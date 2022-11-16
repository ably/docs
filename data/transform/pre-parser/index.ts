import { compose } from 'lodash/fp';
import textile from 'textile-js';
import { replaceERB } from './erbjs';
import {
  convertJSAllToNodeAndJavaScript,
  convertBlangBlocksToTokens,
  addLanguageSupportForGithubStyleCode,
  duplicateLanguageBlocks,
  enforceWhiteSpaceLevelsBetweenLanguageElements,
  addLanguageSupportForBlockQuotes,
  addLanguageSupportForHeadings,
} from './language';
import { removeExternalClassFromLinks } from './remove-external-class-from-links';
import { stripComments, addMinimizeForHeadings, addMinimizedIndent } from './semantic';
import { textileJSCompatibility } from './textile-js-workarounds';

// Newlines before closing tags inhibit textile-js' ability to correctly parse HTML
const removeNewlinesBeforeClosingTags: StringTransformation = (content) => content.replace(/\n+(<\/\w+>)/g, '$1');

// Jest has difficulty with resolving recursively-composed functions from different files
// so we define this textile-js-workaround here.
export const recursivelyProcessDivs: StringTransformation = (content) =>
  content.replace(/\n<div(.*?)>\n((?:.*?\n)+)<\/div>/g, (_match, p1, p2) => {
    return `\n<div${p1}>${textile(preParser(p2))}</div>`;
  });

export const preParser = compose(
  // Textile compatibility must follow all other changes
  textileJSCompatibility,
  recursivelyProcessDivs,
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
  removeExternalClassFromLinks,
);
