import { LayoutOptions } from 'src/contexts/layout-context';

const defaultLayoutOptions: Record<string, LayoutOptions> = {
  '/docs': { sidebar: false, searchBar: false, template: 'index' },
  '/docs/api/control-api': { sidebar: false, searchBar: true, template: 'control-api' },
  '/docs/sdks': { sidebar: false, searchBar: true, template: 'sdk' },
  '/docs/examples': { sidebar: false, searchBar: true, template: 'examples' },
};

export const getLayoutOptions = (pathname: string) => {
  const cleanPathname = pathname.replace(/\/+$/, '');
  return defaultLayoutOptions[cleanPathname] || { sidebar: true, searchBar: true, template: 'base' };
};
