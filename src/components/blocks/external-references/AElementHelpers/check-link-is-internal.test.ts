import { assert, constantFrom, property, tuple, webPath, webUrl } from 'fast-check';
import { checkLinkIsInternal } from './check-link-is-internal';

describe('Check link is internal: unit tests', () => {
  it('Asserts that an internal link is internal', () => {
    expect(checkLinkIsInternal('/docs/api/sse')).toBe(true);
  });
});

const passingRelativeLinks = webPath().filter((webPath) => !!webPath);
const nonAblyAbsoluteLinks = webUrl()
  .filter((webUrl) => !webUrl.startsWith('https://ably.com'))
  .filter((webUrl) => !webUrl.startsWith('https://www.ably.com'));

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
});
