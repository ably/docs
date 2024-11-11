import { ProductData, ProductKey } from 'src/data/types';
import { NavProductPages } from 'src/data/nav/types';

// Determine the active page based on the target link
export const determineActivePage = (data: ProductData, targetLink: string): number[] | null => {
  const strippedTargetLink = stripTrailingSlash(targetLink);
  const determinePagePresence = (pages: NavProductPages[], path: number[]): number[] | null => {
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];

      // If the page is a link and the link matches the target link, return the path
      if ('link' in page && stripTrailingSlash(page.link) === strippedTargetLink) {
        return [...path, i];
      }

      // If the page is a group of pages, recursively check each page
      if ('pages' in page && page.pages) {
        const result = determinePagePresence(page.pages, [...path, i]);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };

  // Iterate through each product and check if the target link is present in the product
  for (const key in data) {
    if (data[key as ProductKey].nav.content) {
      const result = determinePagePresence(data[key as ProductKey].nav.content, []);
      if (result) {
        return [Object.keys(data).indexOf(key), ...result];
      }
    }
  }
  return null;
};

export const stripTrailingSlash = (link: string) => link.replace(/\/$/, '');
