import { NavData, NavProductPages, NavProductKey } from './types';

// Determine the active page based on the target link
export const determineActivePage = (data: NavData, targetLink: string): number[] | null => {
  const determinePagePresence = (pages: NavProductPages[], path: number[]): number[] | null => {
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];

      // If the page is a link and the link matches the target link, return the path
      if ('link' in page && page.link === targetLink) {
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
    if (data[key as NavProductKey].content) {
      const result = determinePagePresence(data[key as NavProductKey].content, []);
      if (result) {
        return [Object.keys(data).indexOf(key), ...result];
      }
    }
  }
  return null;
};
