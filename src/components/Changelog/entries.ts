import { ChangelogEntry } from './types';

// Shared mapping from sourced MDX file nodes to changelog entries. Used by the
// index page, the homepage widget, and the RSS post-build step so the three stay
// in lock-step (same identification rules, same link construction).

// Root directory (relative to the `pages` filesystem source) that holds changelog
// entry MDX files. Entries are nested by year/month, e.g. `docs/changelog/2026/06`.
export const CHANGELOG_ROOT = 'docs/changelog';

// The `allFile` queries that back the changelog should scope to changelog MDX files
// only — rather than pulling every MDX node site-wide and filtering in JS — using
// this filter (inlined per query, as `graphql` requires a static literal):
//
//   filter: {
//     sourceInstanceName: { eq: "pages" }
//     extension: { eq: "mdx" }
//     relativeDirectory: { regex: "/^docs\\/changelog(\\/|$)/" }
//   }
//
// `isChangelogEntryNode` still re-checks the directory below so the consumers can't
// drift from the query.

// Minimal shape of a sourced changelog file node, as returned by the `allFile` →
// `childMdx` queries. Kept deliberately loose so each consumer can request only
// the frontmatter fields it needs on top of this.
export type ChangelogFileNode = {
  name: string;
  relativeDirectory: string;
  childMdx: {
    frontmatter: {
      title: string | null;
      meta_description: string | null;
      date: string | null;
      products: string[] | null;
    };
  } | null;
};

// True for files that are changelog entries: under `docs/changelog/` (at any depth),
// not a directory `index`, and carrying a title. The directory check is redundant
// with `CHANGELOG_FILE_FILTER` but guards against a consumer querying a wider set.
export const isChangelogEntryNode = (node: ChangelogFileNode): boolean =>
  node.childMdx != null &&
  node.name !== 'index' &&
  (node.relativeDirectory === CHANGELOG_ROOT || node.relativeDirectory.startsWith(`${CHANGELOG_ROOT}/`)) &&
  Boolean(node.childMdx.frontmatter.title);

// Filters a list of sourced file nodes to changelog entries and maps each to a
// `ChangelogEntry`. The site path is derived from the file's location, e.g.
// `docs/changelog/2026/06` + `js-sdk-2-23-0` → `/docs/changelog/2026/06/js-sdk-2-23-0`.
export const nodesToEntries = (nodes: ChangelogFileNode[]): ChangelogEntry[] =>
  nodes.flatMap((node) => {
    if (!isChangelogEntryNode(node) || !node.childMdx) {
      return [];
    }
    const { frontmatter } = node.childMdx;
    return [
      {
        link: `/${node.relativeDirectory}/${node.name}`,
        title: frontmatter.title as string,
        description: frontmatter.meta_description ?? '',
        date: frontmatter.date ?? '',
        products: frontmatter.products ?? [],
      },
    ];
  });
