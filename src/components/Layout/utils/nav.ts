import { ProductData, ProductKey } from 'src/data/types';
import { NavProductContent, NavProductPage, NavProductPages } from 'src/data/nav/types';
import { LanguageKey } from 'src/data/languages/types';
import { DEFAULT_LANGUAGE } from 'src/contexts/layout-context';

export type PageTreeNode = { index: number; page: NavProductPage };

export type PageTemplate = 'mdx' | null;

export type ActivePage = {
  tree: PageTreeNode[];
  page: NavProductPage;
  languages: LanguageKey[];
  language: LanguageKey | null;
  product: ProductKey | null;
  template: PageTemplate;
};

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
    if (!data[key].nav) {
      continue;
    }

    if (data[key].nav.link === strippedTargetLink) {
      const { name, link } = data[key].nav;
      return {
        tree: [{ index: Object.keys(data).indexOf(key), page: { name, link } }],
        page: { name, link },
        languages: [],
        language: DEFAULT_LANGUAGE,
        product: key,
        template: null,
      };
    }

    /* 
      If not, attempt to calculate page tree hierarchies as both content and API pages
      and return the first valid tree result along with an object containing details
      on the matched page
    */
    if (data[key].nav.content) {
      const { content, api } = data[key].nav;
      const allContent = [...content, ...api];
      const contentResult = determinePagePresence(allContent, []);

      if (contentResult) {
        const tree = [
          {
            index: Object.keys(data).indexOf(key),
            page: { ...data[key].nav, link: data[key].nav.link ?? '#' },
          },
          ...(contentResult ?? []),
        ];
        const page = tree.slice(1).reduce<NavProductPages[]>((acc, curr) => {
          if (acc[curr.index] && 'pages' in acc[curr.index]) {
            return (acc[curr.index] as NavProductContent).pages;
          }

          return [acc[curr.index]];
        }, allContent);

        return {
          tree,
          page: page?.[0] as NavProductPage,
          languages: [],
          language: DEFAULT_LANGUAGE,
          product: key,
          template: null,
        };
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

  // Strip out query params
  link = link.split('?')[0];

  return link.replace(/\/$/, '');
};

export const hierarchicalKey = (id: string, depth: number, tree?: PageTreeNode[]) =>
  [...(tree ? tree.slice(0, depth).map((node) => node.index) : []), id].join('-');
