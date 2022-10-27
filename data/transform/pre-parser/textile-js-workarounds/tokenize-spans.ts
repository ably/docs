/*
  Elements of the same type cannot be nested inside each other, textile-js will match the first closing tag rather than the matching closing tag.
  We tokenize these spans and then rehydrate them after textile is done.
*/
import { compose } from 'lodash/fp';

// Do not use capital letters for new tokens. textile-js will wrap them in <span class="caps"> elements.
const tokenizeSpanStart: StringTransformation = (content) =>
  content.replace(/<span([^>]*)>/g, (_match, p1) => {
    return `{{span[${p1.replaceAll('"', '|')}]}}`;
  });
const tokenizeSpanEnd: StringTransformation = (content) => content.replace(/<\/\w*?span>/g, '{{/span}}');
export const tokenizeSpans: StringTransformation = compose(tokenizeSpanStart, tokenizeSpanEnd);
