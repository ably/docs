import { absolutizeUrl } from './absolutize-url';

const SITE = 'https://ably.com';

describe('absolutizeUrl', () => {
  it('prefixes site-relative and bare paths', () => {
    expect(absolutizeUrl('/docs/chat', SITE)).toBe('https://ably.com/docs/chat');
    expect(absolutizeUrl('images/x.png', SITE)).toBe('https://ably.com/images/x.png');
  });

  it('leaves absolute, protocol-relative, anchor, and non-http schemes untouched', () => {
    expect(absolutizeUrl('https://x.com/y', SITE)).toBe('https://x.com/y');
    expect(absolutizeUrl('//cdn.com/y', SITE)).toBe('//cdn.com/y');
    expect(absolutizeUrl('#section', SITE)).toBe('#section');
    expect(absolutizeUrl('mailto:a@b.com', SITE)).toBe('mailto:a@b.com');
  });

  it('tolerates a trailing slash on the base URL', () => {
    expect(absolutizeUrl('/docs', 'https://ably.com/')).toBe('https://ably.com/docs');
  });

  it('returns empty input unchanged', () => {
    expect(absolutizeUrl('', SITE)).toBe('');
  });
});
