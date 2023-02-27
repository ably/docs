const DOCS_URLS_BUT_EXTERNAL = [/^(\/|https?:\/\/(?:www\.)?ably.com\/docs)(\/)*api\/control-api.*/];

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
  if (/^(\/|https?:\/\/(?:www\.)?ably.com\/docs).*/.test(link)) {
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
