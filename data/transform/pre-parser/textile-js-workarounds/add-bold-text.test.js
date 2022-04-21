const { addBoldText } = require('./add-bold-text');

describe('Textile bold text is replaced correctly with a <strong> element', () => {
  it('Wraps textile bold text in a <strong> element', () => {
    expect(addBoldText(`**Type: String**`)).toBe(`<strong>Type: String</strong>`);
  });
});
