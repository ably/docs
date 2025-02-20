import { LayoutOptions } from 'src/contexts/layout-context';

const defaultLayoutOptions: Record<string, LayoutOptions> = {
  '/docs': { noSidebar: true, hideSearchBar: true, template: 'index' },
  '/docs/api/control-api': { noSidebar: true, hideSearchBar: false, template: 'control-api' },
  '/docs/sdks': { noSidebar: true, hideSearchBar: false, template: 'sdk' },
  '/docs/examples': { noSidebar: true, hideSearchBar: false, template: 'examples' },
};

export const getLayoutOptions = (pathname: string) => {
  const cleanPathname = pathname.replace(/\/+$/, '');
  return defaultLayoutOptions[cleanPathname] || { noSidebar: false, hideSearchBar: false, template: 'base' };
};
