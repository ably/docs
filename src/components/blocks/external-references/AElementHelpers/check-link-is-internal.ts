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
export const checkLinkIsInternal = (link: string): boolean => {
  return true;
};
