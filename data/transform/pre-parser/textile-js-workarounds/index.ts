import { compose } from 'lodash/fp';
import {
  fixDuplicateQuoteLinks,
  fixHtmlElementsInLinks,
  fixLinkElementsInBrackets,
  fixPunctuationInLinks,
} from './fix-links';
import { fixInlineCode } from './fix-inline-code';
import { fixTextileDefinitionLists } from './fix-textile-definition-lists';
import { addItalicisedText } from './add-italicised-text';
import { fixLeadingHtmlTags } from './fix-leading-html-tags';
import { addBoldText } from './add-bold-text';
import { makeImplicitOrderedListExplicit } from './make-implicit-ordered-list-explicit';
import { fixImgTagsWithNewlines } from './fix-html-tags-with-newlines';

// textile-js, unlike RedCloth, cannot parse multiple new lines between list items
// each list item will instead be wrapped in its own list collection
export const compressMultipleNewlinesInLists: StringTransformation = (content) =>
  content.replace(/^(-.*)\n{2,}(?![^-])/gm, '$1\n');

// textile-js cannot parse h[1-6]. lines that are located inside another HTML tag, with leading spaces
export const manuallyReplaceHTags: StringTransformation = (content) =>
  content.replace(/^\s*h([1-6])\.\s+(.*)$/gm, '\n<h$1>$2</h$1>');

export const textileJSCompatibility = compose(
  fixLeadingHtmlTags,
  fixTextileDefinitionLists,
  fixInlineCode,
  compressMultipleNewlinesInLists,
  makeImplicitOrderedListExplicit,
  manuallyReplaceHTags,
  fixImgTagsWithNewlines,
  fixDuplicateQuoteLinks,
  fixPunctuationInLinks,
  fixHtmlElementsInLinks,
  fixLinkElementsInBrackets,
  addItalicisedText,
  addBoldText,
);
