import { fixImgTagsWithNewlines } from '../../../data/transform/pre-parser/textile-js-workarounds/fix-html-tags-with-newlines';
import { fixInlineCode } from '../../../data/transform/pre-parser/textile-js-workarounds/fix-inline-code';
import { fixLeadingHtmlTags } from '../../../data/transform/pre-parser/textile-js-workarounds/fix-leading-html-tags';
import {
  fixDuplicateQuoteLinks,
  fixHtmlElementsInLinks,
  fixPunctuationInLinks,
} from '../../../data/transform/pre-parser/textile-js-workarounds/fix-links';
import { fixTextileDefinitionLists } from '../../../data/transform/pre-parser/textile-js-workarounds/fix-textile-definition-lists';
import { makeImplicitOrderedListExplicit } from '../../../data/transform/pre-parser/textile-js-workarounds/make-implicit-ordered-list-explicit';
import {
  compressMultipleNewlinesInLists,
  manuallyReplaceHTags,
} from '../../../data/transform/pre-parser/textile-js-workarounds';
import { addBoldText } from '../../../data/transform/pre-parser/textile-js-workarounds/add-bold-text';
import { addItalicisedText } from '../../../data/transform/pre-parser/textile-js-workarounds/add-italicised-text';
import { Step } from './pre-parser';

export const textileWorkaroundSteps: Step[] = [
  {
    fn: addBoldText,
  },
  {
    fn: addItalicisedText,
  },
  {
    fn: fixHtmlElementsInLinks,
  },
  {
    fn: fixPunctuationInLinks,
  },
  {
    fn: fixDuplicateQuoteLinks,
  },
  {
    fn: fixImgTagsWithNewlines,
  },
  {
    fn: manuallyReplaceHTags,
  },
  {
    fn: makeImplicitOrderedListExplicit,
  },
  {
    fn: compressMultipleNewlinesInLists,
  },
  {
    fn: fixInlineCode,
  },
  {
    fn: fixTextileDefinitionLists,
  },
  {
    fn: fixLeadingHtmlTags,
  },
];
