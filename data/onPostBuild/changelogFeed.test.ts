import { buildFeedXml, FeedItem } from './changelogFeed';

const OPTS = {
  changelogUrl: 'https://ably.com/docs/changelog',
  feedUrl: 'https://ably.com/docs/changelog/rss.xml',
};

const item = (over: Partial<FeedItem> = {}): FeedItem => ({
  title: 'JS SDK v2.23.0',
  description: 'A short blurb.',
  date: '2026-06-19',
  products: ['pub-sub'],
  url: 'https://ably.com/docs/changelog/2026/06/js-sdk-2-23-0',
  ...over,
});

describe('buildFeedXml', () => {
  it('produces a well-formed RSS 2.0 channel with a self link', () => {
    const xml = buildFeedXml([], OPTS);
    const doc = new DOMParser().parseFromString(xml, 'application/xml');
    expect(doc.querySelector('parsererror')).toBeNull();
    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain('<title>Ably Changelog</title>');
    expect(xml).toContain('<link>https://ably.com/docs/changelog</link>');
    expect(xml).toContain(
      '<atom:link href="https://ably.com/docs/changelog/rss.xml" rel="self" type="application/rss+xml" />',
    );
  });

  it('renders one item per entry with title, link, guid, pubDate, and description', () => {
    const xml = buildFeedXml([item({ title: 'Hello', url: 'https://ably.com/docs/changelog/a' })], OPTS);
    expect(xml).toContain('<title>Hello</title>');
    expect(xml).toContain('<link>https://ably.com/docs/changelog/a</link>');
    expect(xml).toContain('<guid isPermaLink="true">https://ably.com/docs/changelog/a</guid>');
    expect(xml).toContain(`<pubDate>${new Date('2026-06-19').toUTCString()}</pubDate>`);
    expect(xml).toContain('<description>A short blurb.</description>');
  });

  it('is a summary feed — no full-content block', () => {
    const xml = buildFeedXml([item()], OPTS);
    expect(xml).not.toContain('content:encoded');
    expect(xml).not.toContain('CDATA');
    expect(xml).not.toContain('xmlns:content');
  });

  it('emits a category per product', () => {
    const xml = buildFeedXml([item({ products: ['pub-sub', 'chat'] })], OPTS);
    expect(xml).toContain('<category>pub-sub</category>');
    expect(xml).toContain('<category>chat</category>');
  });

  it('escapes XML metacharacters in text content', () => {
    const xml = buildFeedXml([item({ title: `A & B <c> "d" 'e'` })], OPTS);
    expect(xml).toContain('A &amp; B &lt;c&gt; &quot;d&quot; &apos;e&apos;');
    expect(xml).not.toContain('<c>');
    // Still well-formed after escaping.
    expect(new DOMParser().parseFromString(xml, 'application/xml').querySelector('parsererror')).toBeNull();
  });

  it('renders an item per entry in the order given', () => {
    const xml = buildFeedXml([item({ title: 'First' }), item({ title: 'Second' })], OPTS);
    expect(xml.match(/<item>/g) ?? []).toHaveLength(2);
    expect(xml.indexOf('First')).toBeLessThan(xml.indexOf('Second'));
  });
});
