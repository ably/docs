// Single source of truth for the changelog's product tags.
//
// Tags are currently product-only. The structure (a keyed record with a label and
// a Badge colour) is intentionally generic so a second facet — e.g. a "Type" facet
// of New / Improved / Fixed — can be added later as a sibling record without
// reworking the filter or display components.

// `colorClass` is a Tailwind text-colour utility applied to a default `@ably/ui`
// `Badge` (neutral background, coloured uppercase label). These mirror the per-
// product colours used on the Examples grid (see ExamplesGrid `badgeColorForProduct`)
// so product tags read consistently across the site.
export type ProductTag = {
  label: string;
  colorClass: string;
};

export const productTags = {
  'pub-sub': { label: 'Pub/Sub', colorClass: 'text-orange-700' },
  chat: { label: 'Chat', colorClass: 'text-violet-400' },
  spaces: { label: 'Spaces', colorClass: 'text-pink-500' },
  liveobjects: { label: 'LiveObjects', colorClass: 'text-green-600' },
  livesync: { label: 'LiveSync', colorClass: 'text-blue-600' },
  'ai-transport': { label: 'AI Transport', colorClass: 'text-cyan-500' },
  platform: { label: 'Platform', colorClass: 'text-neutral-700' },
} satisfies Record<string, ProductTag>;

export type ProductSlug = keyof typeof productTags;

// True for a slug that has a registered tag. The changelog feed build asserts every
// entry's `products` against this so a typo'd/unregistered slug fails the build
// rather than silently rendering an un-filterable grey fallback badge.
export const isKnownProductSlug = (slug: string): slug is ProductSlug => slug in productTags;

const fallbackTag = (slug: string): ProductTag => ({ label: slug, colorClass: 'text-neutral-700' });

export const getProductTag = (slug: string): ProductTag =>
  (productTags as Record<string, ProductTag>)[slug] ?? fallbackTag(slug);
