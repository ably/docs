const { default: fc } = require('fast-check');
const { addBoldText } = require('./add-bold-text');

const stringWithoutAsterisks = fc.string().map((s) => s.replace('*', ''));

describe('Textile bold text is replaced correctly with a <strong> element', () => {
  it('Wraps textile bold text in a <strong> element', () => {
    expect(addBoldText(`**Type: String**`)).toBe(`<strong>Type: String</strong>`);
  });
  it('Wraps any text that has no asterisks in a <strong> element', () => {
    fc.assert(
      fc.property(stringWithoutAsterisks, (a) => expect(addBoldText(`**${a}**`)).toBe(`<strong>${a}</strong>`)),
    );
  });
});
