/*
  Elements of the same type cannot be nested inside each other, textile-js will match the first closing tag rather than the matching closing tag.
  We tokenize these spans and then rehydrate them after textile is done.
*/
import { compose } from 'lodash/fp';

const tokenizeSpanStart: StringTransformation = (content) => content.replace(/<span([\s"\w])*?>/g, '{{SPAN[$1]}}');
const tokenizeSpanEnd: StringTransformation = (content) => content.replace(/<\/\w*?span/g, '{{/SPAN}}');
export const tokenizeSpans: StringTransformation = compose(tokenizeSpanStart, tokenizeSpanEnd);
