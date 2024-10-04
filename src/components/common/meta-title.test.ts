import { getMetaTitle } from './meta-title';

describe('getMetaTitle', () => {
  it('Returns the meta title for each product', () => {
    const pageMappings = [
      ['channels', 'Channels', 'Intro'],
      ['spaces', 'Ably Spaces', 'Setup'],
      ['livesync', 'Ably LiveSync', 'Begin'],
      ['chat', 'Ably Chat', 'Emojis'],
      ['asset-tracking', 'Ably Asset Tracking', 'Examples'],
      ['api-reference', 'API References', 'Setup'],
      ['pub_sub', 'Ably Pub/Sub', 'Authentication'],
    ];

    pageMappings.forEach((product) => {
      const [productName, productTitle, pageTitle] = product;
      const metaTitle = getMetaTitle(pageTitle, productName);

      expect(metaTitle).toBe(`${productTitle} | ${pageTitle}`);
    });
  });

  it('Returns a default product for unknown product names', () => {
    const metaTitle = getMetaTitle('Getting Started', 'unknown');

    expect(metaTitle).toBe('Ably Realtime | Getting Started');
  });
});
