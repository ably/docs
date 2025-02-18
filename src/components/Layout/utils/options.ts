import { LayoutOptions } from 'src/contexts/layout-context';

const defaultLayoutOptions: Record<string, LayoutOptions> = {
  '/docs/': { noSidebar: true, hideSearchBar: true },
  '/docs/api/': { noSidebar: true, hideSearchBar: false },
  '/docs/sdks/': { noSidebar: true, hideSearchBar: false },
};

export const getLayoutOptions = (pathname: string) =>
  defaultLayoutOptions[pathname] || { noSidebar: false, hideSearchBar: false };
