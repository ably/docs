import cn from '@ably/ui/core/utils/cn';
import { AccordionProps } from '@ably/ui/core/Accordion';
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
      const contentResult = determinePagePresence(data[key as ProductKey].nav.content, []);
      const apiResult = determinePagePresence(data[key as ProductKey].nav.api, []);
      if (contentResult || apiResult) {
        return [Object.keys(data).indexOf(key), ...((contentResult || apiResult) ?? [])];
      }
    }
  }
  return null;
};

export const stripTrailingSlash = (link: string) => link.replace(/\/$/, '');

export const commonAccordionOptions = (openIndex?: number, topLevel?: boolean): Omit<AccordionProps, 'data'> => ({
  icons: { open: { name: 'icon-gui-chevron-up' }, closed: { name: 'icon-gui-chevron-down' } },
  options: {
    autoClose: topLevel,
    headerCSS: cn(
      'text-neutral-1000 md:text-neutral-900 hover:text-neutral-1100 active:text-neutral-1000 !py-0 pl-0 !mb-0 transition-colors',
      {
        'h-40 ui-text-menu1 font-bold md:ui-text-menu4': topLevel,
        'h-[1rem] ui-text-menu2 font-semibold md:ui-text-menu4': !topLevel,
      },
    ),
    selectedHeaderCSS: 'text-neutral-1300 mb-8',
    contentCSS: cn('[&>div]:pb-0'),
    rowIconSize: '20px',
    iconSize: '20px',
    defaultOpenIndexes: openIndex !== undefined ? [openIndex] : [],
    hideBorders: true,
  },
});

export const sidebarAlignmentClasses =
  'absolute right-[80px] md:right-0 md:sticky w-240 md:pb-16 top-[104px] h-[calc(100vh-104px)] overflow-y-scroll';
