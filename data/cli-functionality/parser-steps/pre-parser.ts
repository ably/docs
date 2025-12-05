import { removeExternalClassFromLinks } from '../../transform/pre-parser/remove-external-class-from-links';
import { addMinimizedIndent, addMinimizeForHeadings, stripComments } from '../../transform/pre-parser/semantic';
import { removeNewlinesBeforeClosingTags } from '../../transform/pre-parser';
import {
  addLanguageSupportForBlockQuotes,
  addLanguageSupportForGithubStyleCode,
  addLanguageSupportForHeadings,
  convertBlangBlocksToTokens,
  convertJSAllToNodeAndJavaScript,
  duplicateLanguageBlocks,
  enforceWhiteSpaceLevelsBetweenLanguageElements,
} from '../../transform/pre-parser/language';

export type Step = { fn: StringTransformation; description?: string };
export const preParserSteps: Step[] = [
  {
    fn: removeExternalClassFromLinks,
  },
  {
    fn: stripComments,
  },
  {
    fn: removeNewlinesBeforeClosingTags,
  },
  {
    fn: addMinimizeForHeadings,
  },
  {
    fn: addMinimizedIndent,
  },
  {
    fn: convertJSAllToNodeAndJavaScript,
    description: `Expands language tags containing 'jsall' so they contain 'nodejs, javascript'`,
  },
  {
    fn: convertBlangBlocksToTokens,
    description: `Blang blocks are defined by blang[]. sections introducing, then any number of indented lines`,
  },
  {
    fn: addLanguageSupportForGithubStyleCode,
  },
  {
    fn: duplicateLanguageBlocks,
  },
  {
    fn: enforceWhiteSpaceLevelsBetweenLanguageElements,
  },
  {
    fn: addLanguageSupportForBlockQuotes,
  },
  {
    fn: addLanguageSupportForHeadings,
  },
];
