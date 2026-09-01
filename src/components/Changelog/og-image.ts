// Default social/Open Graph image for changelog pages that don't set their own
// `meta_image`. This mirrors the site's generic meta image used on the docs
// homepage; swap it for a changelog-specific card (≈1200×630 raster) when one
// exists. Note: social scrapers don't reliably render SVG, so this is a raster URL.
export const CHANGELOG_DEFAULT_OG_IMAGE = 'https://files.ably.io/website/images/meta-tags/ably-generic%402x.jpg';

export const CHANGELOG_DEFAULT_OG_IMAGE_ALT = 'Ably changelog';

// A frontmatter `meta_image` is turned into an absolute URL (social scrapers
// require it) via the shared `absolutizeUrl` helper at the point of use.
