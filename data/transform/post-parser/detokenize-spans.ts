/*
Elements of the same type cannot be nested inside each other, textile-js will match the first closing tag rather than the matching closing tag.
We tokenize these spans and then rehydrate them after textile is done.
*/
import { compose } from 'lodash/fp';

const detokenizeSpanStart: StringTransformation = (content) => content.replace(/{{span\[([^\]]*)\]}}/g, '<span$1>');
const detokenizeSpanEnd: StringTransformation = (content) => content.replace(/{{\/span}}/g, '</span>');
const cleanSpans: StringTransformation = (content) =>
  content.replace(/<span([^>]*)>/g, (_match, p1) => {
    return `<span${p1.replaceAll('|', '"')}>`;
  });
export const detokenizeSpans: StringTransformation = compose(cleanSpans, detokenizeSpanStart, detokenizeSpanEnd);
