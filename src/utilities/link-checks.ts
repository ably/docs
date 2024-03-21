const DOCS_URLS_BUT_EXTERNAL = [/.*\/api\/control-api.*/, /.*\/sdk\/.*/];

/**
 * This regex only matches old hard-coded docs links
 */
const legacyDocsUrlPattern = /^(https?:\/\/(?:www\.)?ably.com\/docs).*/;

/**
 * This function will drop the protocol, host & `/docs` path from legacy
 * docs links that might have been hard coded somewhere in the content
 */
export const normalizeLegacyDocsLink = (link: string) => {
  const match = legacyDocsUrlPattern.exec(link);

  if (match !== null) {
    return link.replace(match[1], '');
  }

  if (link.startsWith('/docs/')) {
    return link.replace('/docs/', '/');
  }

  return link;
};

/**
 * This function is used to identify if a link should be handled by Gatsby
 * as though part of a SPA (which will involve pre-fetching the link in question)
 * or should be treated as a normal ahref.
 *
 * This can have important consequences; Gatsby handling a link will only
 * have the effect of improving performance (the page is pre-fetched, so loads
 * faster), but it might have the negative consequence of fetching a page that
 * does not really exist in the Gatsby site if used in the incorrect place,
 * which will return an empty page to the user when navigating in the app.
 */
export const checkLinkIsInternal = (link?: string): link is string => {
  // This function doubles as a type guard to ensure that a given link is at least a string
  if (!link) {
    return false;
  }

  if ((link.startsWith('/') && !link.startsWith('//')) || legacyDocsUrlPattern.test(link)) {
    // The regex immediately above, /^(\/|https?:\/\/(?:www\.)?ably.com\/docs).*/,
    // only checks if something is a relative URL starting with a slash, or the Ably domain name
    // followed by an explicit path to the /docs subsite.
    // Special case matching:
    for (const regex of DOCS_URLS_BUT_EXTERNAL) {
      if (regex.test(link)) {
        return false;
      }
    }

    return true;
  }

  return false;
};

export const isExternalLink = (link: string): link is string =>
  link.startsWith('https://') || link.startsWith('http://') || link.includes('://');
