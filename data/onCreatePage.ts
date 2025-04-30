import { GatsbyNode } from 'gatsby';

export type LayoutOptions = { sidebar: boolean; searchBar: boolean; template: string };

const pageLayoutOptions: Record<string, LayoutOptions> = {
  '/docs': { sidebar: false, searchBar: false, template: 'index' },
  '/docs/api/control-api': { sidebar: false, searchBar: true, template: 'control-api' },
  '/docs/sdks': { sidebar: false, searchBar: true, template: 'sdk' },
  '/examples': { sidebar: false, searchBar: true, template: 'examples' },
  '/docs/how-to/pub-sub': { sidebar: true, searchBar: true, template: 'how-to' },
  '/docs/404': { sidebar: false, searchBar: false, template: '404' },
};

export const onCreatePage: GatsbyNode['onCreatePage'] = ({ page, actions }) => {
  const { createPage } = actions;

  const pathOptions = Object.entries(pageLayoutOptions).find(([path]) => page.path === path);

  if (pathOptions) {
    page.context = {
      ...page.context,
      layout: pathOptions[1],
    };

    createPage(page);
  }
};
