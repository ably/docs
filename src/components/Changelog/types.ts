// A single changelog entry, as consumed by the index page and its child components.
export type ChangelogEntry = {
  // Absolute site path to the entry page, e.g. `/docs/changelog/2026-06-19-js-sdk-2-23-0`.
  link: string;
  title: string;
  description: string;
  // ISO date string from frontmatter, e.g. `2026-06-19`.
  date: string;
  // Product tag slugs (keys of `productTags`).
  products: string[];
};
