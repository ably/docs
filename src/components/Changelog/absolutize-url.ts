// Single source of truth for turning a possibly-relative URL into an absolute one
// against a site origin. Used by the OG-image meta (MDXWrapper) and the RSS feed's
// item/link URLs (changelogFeed), so changelog URL handling shares one set of rules.

// True for values that already resolve on their own: absolute URLs of any scheme,
// protocol-relative URLs, in-page anchors, and non-navigational schemes (mailto:, …).
export const isSelfResolving = (value: string): boolean =>
  value.startsWith('#') || value.startsWith('//') || /^[a-z][a-z0-9+.-]*:/i.test(value);

// Resolve a possibly-relative URL against a base origin. Self-resolving and empty
// values are returned unchanged; a trailing slash on the base is tolerated.
export const absolutizeUrl = (value: string, base: string): string => {
  if (!value || isSelfResolving(value)) {
    return value;
  }
  const origin = base.replace(/\/$/, '');
  return `${origin}${value.startsWith('/') ? '' : '/'}${value}`;
};
