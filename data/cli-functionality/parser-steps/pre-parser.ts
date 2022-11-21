import { removeExternalClassFromLinks } from '../../transform/pre-parser/remove-external-class-from-links';
import { replaceERB } from '../../transform/pre-parser/erbjs';
import { addMinimizedIndent, addMinimizeForHeadings, stripComments } from '../../transform/pre-parser/semantic';
import { removeNewlinesBeforeClosingTags, recursivelyProcessDivs } from '../../transform/pre-parser';
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
    fn: replaceERB,
    description: `Replaces Ruby templating code`,
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
  {
    fn: recursivelyProcessDivs,
    description: `Divs across multiple lines pose an issue for textile-js.\nWe detect these divs and process the internal textile separately, marking it as 'notextile' in the process.`,
  },
];
