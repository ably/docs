import { compose } from 'lodash/fp';
import {
  convertJSAllToNodeAndJavaScript,
  convertBlangBlocksToTokens,
  addLanguageSupportForGithubStyleCode,
  duplicateLanguageBlocks,
  enforceWhiteSpaceLevelsBetweenLanguageElements,
  addLanguageSupportForBlockQuotes,
  addLanguageSupportForHeadings,
} from './language';
import { stripComments, addMinimizeForHeadings, addMinimizedIndent } from './semantic';

// Newlines before closing tags can affect HTML parsing
export const removeNewlinesBeforeClosingTags: StringTransformation = (content) =>
  content.replace(/\n+(<\/\w+>)/g, '$1');

export const preParser = compose(
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
);
