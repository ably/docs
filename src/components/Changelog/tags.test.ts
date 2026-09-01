import { isKnownProductSlug, getProductTag, productTags } from './tags';

describe('isKnownProductSlug', () => {
  it('accepts every registered product slug', () => {
    Object.keys(productTags).forEach((slug) => {
      expect(isKnownProductSlug(slug)).toBe(true);
    });
  });

  it("rejects unregistered or typo'd slugs", () => {
    expect(isKnownProductSlug('live-sync')).toBe(false);
    expect(isKnownProductSlug('kafka')).toBe(false);
    expect(isKnownProductSlug('')).toBe(false);
  });
});

describe('getProductTag', () => {
  it('returns the registered tag for a known slug', () => {
    expect(getProductTag('pub-sub')).toEqual(productTags['pub-sub']);
  });

  it('falls back to a neutral badge labelled with the raw slug', () => {
    expect(getProductTag('unknown')).toEqual({ label: 'unknown', colorClass: 'text-neutral-700' });
  });
});
