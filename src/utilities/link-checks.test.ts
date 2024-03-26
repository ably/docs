import { checkLinkIsInternal, normalizeLegacyDocsLink } from 'src/utilities/link-checks';

describe('normalizeLegacyDocsLink', () => {
  it('strips the protocol, host & path from old links', () => {
    expect(normalizeLegacyDocsLink('http://ably.com/docs/a')).toBe('/a');
    expect(normalizeLegacyDocsLink('https://ably.com/docs/b')).toBe('/b');
    expect(normalizeLegacyDocsLink('http://www.ably.com/docs/c')).toBe('/c');
    expect(normalizeLegacyDocsLink('https://www.ably.com/docs/d')).toBe('/d');
  });

  it('strips the path from old links', () => {
    expect(normalizeLegacyDocsLink('/docs/a')).toBe('/a');
  });

  it('ignores other absolute links', () => {
    expect(normalizeLegacyDocsLink('/a')).toBe('/a');
  });

  it('ignores other hosts', () => {
    expect(normalizeLegacyDocsLink('http://example.com')).toBe('http://example.com');
  });
});

describe('checkLinkIsInternal', () => {
  it('returns false without a link', () => {
    expect(checkLinkIsInternal()).toBeFalsy();
  });

  it('returns true for relative links', () => {
    expect(checkLinkIsInternal('/')).toBeTruthy();
    expect(checkLinkIsInternal('/api')).toBeTruthy();
    expect(checkLinkIsInternal('/api/realtime-sdk')).toBeTruthy();
  });

  it('returns true for relative links with anchors', () => {
    expect(checkLinkIsInternal('/api/rest-sdk/authentication#token-request')).toBeTruthy();
  });

  it('returns false for ably.com links outside of docs', () => {
    expect(checkLinkIsInternal('https://ably.com/download')).toBeFalsy();
  });

  it('returns true for ably.com links to docs', () => {
    expect(checkLinkIsInternal('https://ably.com/docs')).toBeTruthy();
    expect(checkLinkIsInternal('http://ably.com/docs/sse')).toBeTruthy();
    expect(checkLinkIsInternal('https://www.ably.com/docs')).toBeTruthy();
    expect(checkLinkIsInternal('https://ably.com/docs/api')).toBeTruthy();
  });

  it('respects exclusion list for docs links', () => {
    expect(checkLinkIsInternal('https://ably.com/docs/api/control-api')).toBeFalsy();
    expect(checkLinkIsInternal('/api/control-api')).toBeFalsy();
    expect(checkLinkIsInternal('/api/control-api/')).toBeFalsy();

    expect(checkLinkIsInternal('https://ably.com/docs/sdk/cocoa')).toBeFalsy();
    expect(checkLinkIsInternal('/docs/sdk/cocoa')).toBeFalsy();

    expect(checkLinkIsInternal('https://ably.com/tutorials/reactor-event-google')).toBeFalsy();
    expect(checkLinkIsInternal('/tutorials/reactor-event-google')).toBeFalsy();
    expect(checkLinkIsInternal('/tutorials')).toBeFalsy();
  });
});
