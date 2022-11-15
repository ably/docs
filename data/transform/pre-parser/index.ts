import { compose } from 'lodash/fp';
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

export const preParser = compose(
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
  removeExternalClassFromLinks,
);
