import { assert, constantFrom, property, tuple, webPath, webUrl } from 'fast-check';
import { checkLinkIsInternal } from './check-link-is-internal';

describe('Check link is internal: unit tests', () => {
  it('Asserts that an internal link is internal', () => {
    expect(checkLinkIsInternal('/docs/api/sse')).toBe(true);
  });
  it('Asserts that an control API link is not internal', () => {
    expect(checkLinkIsInternal('/docs/api/control-api')).toBe(false);
  });
});

const passingRelativeLinks = webPath()
  .filter((webPath) => !!webPath)
  .filter((webPath) => !webPath.includes('/api/control-api'));

const nonAblyAbsoluteLinks = webUrl()
  .filter((webUrl) => !webUrl.startsWith('https://ably.com'))
  .filter((webUrl) => !webUrl.startsWith('https://www.ably.com'));

const controlAPIPath = tuple(
  webPath(),
  constantFrom(
    'https://ably.com/docs/',
    'http://ably.com/docs/',
    'https://www.ably.com/docs/',
    'http://www.ably.com/docs/',
    '/',
  ),
).map(([webPath, validInternalPrefix]) => `${validInternalPrefix}api/control-api${webPath}`);

describe('Check link is internal: Property tests', () => {
  it('Always identifies web paths as internal', () => {
    assert(
      property(passingRelativeLinks, (link) => {
        expect(checkLinkIsInternal(link)).toBe(true);
      }),
    );
  });
  it('Always identifies non-Ably absolute links as not being internal', () => {
    assert(
      property(nonAblyAbsoluteLinks, (link) => {
        expect(checkLinkIsInternal(link)).toBe(false);
      }),
    );
  });
  it('Always identifies an empty link as not being internal', () => {
    expect(checkLinkIsInternal('')).toBe(false);
    expect(checkLinkIsInternal()).toBe(false);
  });
  it('Always identifies the control API link and children as not being internal', () => {
    assert(
      property(controlAPIPath, (link) => {
        expect(checkLinkIsInternal(link)).toBe(false);
      }),
    );
  });
});
