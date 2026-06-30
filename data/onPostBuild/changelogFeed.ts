import { GatsbyNode } from 'gatsby';
import * as path from 'path';
import * as fs from 'fs';
import { ChangelogFileNode, nodesToEntries } from '../../src/components/Changelog/entries';
import { sortByDateDesc } from '../../src/components/Changelog/filter-changelog';
import { CHANGELOG_PATH, CHANGELOG_RSS_PATH } from '../../src/components/Changelog/constants';
import { isKnownProductSlug, productTags } from '../../src/components/Changelog/tags';
import { absolutizeUrl } from '../../src/components/Changelog/absolutize-url';

const REPORTER_PREFIX = 'onPostBuild:changelogFeed';

const FEED_TITLE = 'Ably Changelog';
const FEED_DESCRIPTION = 'New features, improvements, and fixes across the Ably platform and SDKs.';

// Cap the feed to the most recent entries, matching the previous
// changelog.ably.com feed and standard RSS practice (readers only surface recent
// items, and an unbounded feed grows without limit). The full history remains
// browsable on the changelog index page.
const FEED_MAX_ITEMS = 20;

interface ChangelogFeedQueryResult {
  site: {
    siteMetadata: {
      siteUrl: string | null;
    };
  };
  entries: {
    nodes: ChangelogFileNode[];
  };
}

// A single feed item, already shaped (absolute URL, blurb) for rendering.
export interface FeedItem {
  title: string;
  description: string;
  date: string;
  products: string[];
  url: string;
}

// Minimal XML escaping for text placed inside elements/attributes.
const escapeXml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

// Build a summary RSS 2.0 feed: one item per entry with a title, the
// meta_description as the blurb, a link/guid back to the entry, a pubDate, and a
// category per product. Deliberately summary-only (no <content:encoded>) — the
// canonical, full entry lives on the changelog page, matching how peer changelogs
// (Supabase, Neon, GitHub) publish. Pure and synchronous so it can be unit-tested.
export const buildFeedXml = (items: FeedItem[], opts: { changelogUrl: string; feedUrl: string }): string => {
  const renderedItems = items
    .map((item) => {
      const categories = item.products.map((product) => `      <category>${escapeXml(product)}</category>`).join('\n');
      return [
        '    <item>',
        `      <title>${escapeXml(item.title)}</title>`,
        `      <link>${escapeXml(item.url)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(item.url)}</guid>`,
        `      <pubDate>${new Date(item.date).toUTCString()}</pubDate>`,
        `      <description>${escapeXml(item.description)}</description>`,
        categories,
        '    </item>',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${escapeXml(opts.changelogUrl)}</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <atom:link href="${escapeXml(opts.feedUrl)}" rel="self" type="application/rss+xml" />
${renderedItems}
  </channel>
</rss>
`;
};

// Generates a summary RSS 2.0 feed from the changelog MDX entries and writes it to
// public/docs/changelog/rss.xml. Mirrors the query/siteUrl handling used by the
// llms.txt and markdown post-build steps; no extra plugin dependency is needed.
export const onPostBuild: GatsbyNode['onPostBuild'] = async ({ graphql, reporter, basePath }) => {
  const query = `
    query {
      site {
        siteMetadata {
          siteUrl
        }
      }
      entries: allFile(
        filter: {
          sourceInstanceName: { eq: "pages" }
          extension: { eq: "mdx" }
          relativeDirectory: { regex: "/^docs/changelog(/|$)/" }
        }
      ) {
        nodes {
          name
          relativeDirectory
          childMdx {
            frontmatter {
              title
              meta_description
              date
              products
            }
          }
        }
      }
    }
  `;

  const { data, errors } = await graphql<ChangelogFeedQueryResult>(query);

  if (errors) {
    reporter.panicOnBuild(`${REPORTER_PREFIX} GraphQL query failed: ${JSON.stringify(errors, null, 2)}`);
    throw errors;
  }

  if (!data) {
    reporter.warn(`${REPORTER_PREFIX} No data returned; skipping changelog feed.`);
    return;
  }

  // All sourced changelog entries (the query is unbounded). Validate product slugs
  // here — before the feed is filtered/capped — so a typo'd or unregistered product
  // in any entry's frontmatter fails the build loudly rather than silently shipping
  // an un-filterable grey badge on the index.
  const allEntries = nodesToEntries(data.entries.nodes);
  const invalidProducts = allEntries.flatMap((entry) =>
    entry.products.filter((product) => !isKnownProductSlug(product)).map((product) => `${entry.link} → "${product}"`),
  );
  if (invalidProducts.length > 0) {
    reporter.panicOnBuild(
      `${REPORTER_PREFIX} Unknown product slug(s) in changelog frontmatter (expected one of: ` +
        `${Object.keys(productTags).join(', ')}):\n  ${invalidProducts.join('\n  ')}`,
    );
    return;
  }

  const siteUrl = data.site.siteMetadata.siteUrl;
  if (!siteUrl) {
    reporter.warn(`${REPORTER_PREFIX} Site URL not found; skipping changelog feed.`);
    return;
  }

  const prefix = `${siteUrl}${basePath ?? ''}`;

  // Shared identification/mapping with the on-page changelog, then feed-specific
  // shaping: drop entries without a date (RSS items need a pubDate), cap to the
  // most recent, and turn each entry's site path into an absolute, prefixed URL.
  const items: FeedItem[] = sortByDateDesc(allEntries)
    .filter((entry) => Boolean(entry.date))
    .slice(0, FEED_MAX_ITEMS)
    .map((entry) => ({
      title: entry.title,
      description: entry.description,
      date: entry.date,
      products: entry.products,
      url: absolutizeUrl(entry.link, prefix),
    }));

  const xml = buildFeedXml(items, {
    changelogUrl: absolutizeUrl(CHANGELOG_PATH, prefix),
    feedUrl: absolutizeUrl(CHANGELOG_RSS_PATH, prefix),
  });

  const outputDir = path.join(process.cwd(), 'public', 'docs', 'changelog');
  try {
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, 'rss.xml'), xml);
    reporter.info(`${REPORTER_PREFIX} Wrote changelog feed: ${items.length} items`);
  } catch (err) {
    reporter.panic(`${REPORTER_PREFIX} Error writing changelog feed`, err as Error);
  }
};
