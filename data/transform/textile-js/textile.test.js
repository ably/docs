const { textile } = require('.');
const { TextileTestString } = require('./test-string');

describe('Tests that textile parser works correctly', () => {
  it('Operates on the test string and provides the expected results', () => {
    expect(textile(TextileTestString)).toBe();
  });
});
