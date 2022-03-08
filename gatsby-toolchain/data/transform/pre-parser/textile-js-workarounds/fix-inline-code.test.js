import { fixInlineCode } from './fix-inline-code';

describe('Fixes inline code for textile-js', () => {
  it('Correctly fixes inline code', () => {
    expect(
      fixInlineCode(
        `* If the connection state becomes @SUSPENDED@, all previously-@ATTACHED@ or @ATTACHING@ channels will become @SUSPENDED@`,
      ),
    ).toBe(
      `* If the connection state becomes <code>SUSPENDED</code>, all previously-<code>ATTACHED</code> or <code>ATTACHING</code> channels will become <code>SUSPENDED</code>`,
    );
  });
});
