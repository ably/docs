import cn from '@ably/ui/core/utils/cn';
import { AccordionProps } from '@ably/ui/core/Accordion';
import { ProductData, ProductKey } from 'src/data/types';
import { NavProductContent, NavProductPage, NavProductPages } from 'src/data/nav/types';

export type PageTreeNode = { index: number; page: NavProductPage };

type ActivePage = { tree: PageTreeNode[]; page: NavProductPage };

/**
 * Determines the active page based on the provided target link.
 *
 * This function iterates through the product data to find a page that matches the target link.
 * It checks both direct links and nested pages within groups. If a match is found, it returns
 * the index tree of the page in the navigation data and the page details.
 *
 * @param data - The product data containing navigation information.
 * @param targetLink - The link to be matched against the product data.
 * @returns The active page details including its tree and page information, or null if no match is found.
 */
export const determineActivePage = (data: ProductData, targetLink: string): ActivePage | null => {
  const strippedTargetLink = formatNavLink(targetLink);

  /**
   * Recursively determines the presence of a page in a list of pages.
   *
   * This function iterates through the list of pages and checks if the target link is present.
   * If a match is found, it returns the index of the link in its pages array.
   * If not, it attempts to search for the link in nested pages.
   */
  const determinePagePresence = (pages: NavProductPages[], path: PageTreeNode[]): PageTreeNode[] | null => {
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];

      // If the page is a link and the link matches the target link, return the path
      if ('link' in page && formatNavLink(page.link) === strippedTargetLink) {
        return [...path, { index: i, page }];
      }

      // If the page is a group of pages, recursively check each page
      if ('pages' in page && page.pages) {
        const result = determinePagePresence(page.pages, [...path, { index: i, page: { ...page, link: '#' } }]);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };

  for (const key of Object.keys(data) as ProductKey[]) {
    /* 
      If the page matches a product index link, return details for the product
    */
    if (data[key].nav.link === strippedTargetLink) {
      const { name, link } = data[key].nav;
      return { tree: [{ index: Object.keys(data).indexOf(key), page: { name, link } }], page: { name, link } };
    }

    /* 
      If not, attempt to calculate page tree hierarchies as both content and API pages
      and return the first valid tree result along with an object containing details
      on the matched page
    */
    if (data[key].nav.content) {
      const contentResult = determinePagePresence(data[key].nav.content, []);
      const apiResult = determinePagePresence(data[key].nav.api, []);
      if (contentResult || apiResult) {
        const tree = [
          {
            index: Object.keys(data).indexOf(key),
            page: { ...data[key].nav, link: data[key].nav.link ?? '#' },
          },
          ...((contentResult || apiResult) ?? []),
        ];
        const page = tree.slice(1).reduce<NavProductPages[]>(
          (acc, curr) => {
            if (acc[curr.index] && 'pages' in acc[curr.index]) {
              return (acc[curr.index] as NavProductContent).pages;
            }

            return [acc[curr.index]];
          },
          data[key].nav[apiResult ? 'api' : 'content'],
        );

        return { tree, page: page?.[0] as NavProductPage };
      }
    }
  }

  return null;
};

export const formatNavLink = (link: string) => {
  if (!link) {
    return '';
  }

  if (link.startsWith('/docs')) {
    link = link.replace('/docs', '');
  }

  return link.replace(/\/$/, '');
};

export const commonAccordionOptions = (
  currentPage: NavProductContent | null,
  openIndex: number | undefined,
  topLevel: boolean,
  inHeader: boolean,
): Omit<AccordionProps, 'data'> => ({
  icons: { open: { name: 'icon-gui-chevron-up' }, closed: { name: 'icon-gui-chevron-down' } },
  options: {
    autoClose: topLevel,
    headerCSS: cn(
      'text-neutral-1000 dark:text-neutral-300 md:text-neutral-900 dark:md:text-neutral-400 hover:text-neutral-1100 active:text-neutral-1000 !py-0 pl-0 !mb-0 transition-colors [&_svg]:!w-24 [&_svg]:!h-24 md:[&_svg]:!w-20 md:[&_svg]:!h-20',
      {
        'my-12': topLevel && inHeader,
        'h-40 ui-text-menu1 font-bold md:ui-text-menu4 px-16': topLevel,
        'h-[1rem] ui-text-menu2 font-semibold md:ui-text-menu4': !topLevel,
      },
    ),
    selectedHeaderCSS: 'text-neutral-1300 mb-8',
    contentCSS: cn('[&>div]:pb-0'),
    rowIconSize: '20px',
    defaultOpenIndexes: !inHeader && openIndex !== undefined ? [openIndex] : [],
    hideBorders: true,
    fullyOpen: !topLevel && currentPage?.expand,
  },
});

export const sidebarAlignmentClasses = 'absolute md:sticky w-240 md:pb-128 top-[88px] h-[calc(100vh-88px)]';

export const composeNavLinkId = (link: string) => `nav-link-${formatNavLink(link).replaceAll('/', '-')}`;

export const hierarchicalKey = (id: string, depth: number, tree?: PageTreeNode[]) =>
  [...(tree ? tree.slice(0, depth).map((node) => node.index) : []), id].join('-');

export const pathWithBase = (path: string) => {
  const strippedPath = path.replace(/^\/+/, '');
  return `/${process.env.NODE_ENV === 'development' ? '' : 'docs/'}${strippedPath}`;
};
