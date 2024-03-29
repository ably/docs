import { addItalicisedText } from './add-italicised-text';

describe('Textile italicised text is replaced correctly with an <em> block', () => {
  it('Wraps textile italicised text in an <em> block', () => {
    expect(addItalicisedText(`__Type: String__`)).toBe(`<em class="italics">Type: String</em>`);
  });
});
