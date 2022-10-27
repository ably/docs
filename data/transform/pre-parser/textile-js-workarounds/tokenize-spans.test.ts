import { tokenizeSpans } from './tokenize-spans';

describe('Tokenize spans tests', () => {
  it('Works on a simple example as expected', () => {
    expect(tokenizeSpans('<span class="custom-class">Content</span>')).toBe(
      `{{span[ class=|custom-class|]}}Content{{/span}}`,
    );
  });
  it('Works on a nested example as expected', () => {
    expect(tokenizeSpans('<span class="custom-class">Content &amp; <span>Nested Content</span></span>')).toBe(
      `{{span[ class=|custom-class|]}}Content &amp; {{span[]}}Nested Content{{/span}}{{/span}}`,
    );
  });
});
