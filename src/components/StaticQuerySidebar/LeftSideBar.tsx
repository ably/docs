import React from 'react';
import { ArticleTypeContext } from 'src/contexts/article-type-context';
import { Sidebar, EXPAND_MENU } from 'src/components';
import { SidebarDataRetrieval } from './SidebarDataRetrieval';

export type LeftSidebarProps = {
  className?: string;
  languages?: boolean;
};

const LeftSideBar = ({ className = '', languages = false }: LeftSidebarProps) => (
  <ArticleTypeContext.Consumer>
    {(value) => (
      <SidebarDataRetrieval
        className={className}
        languages={languages}
        expandMenu={EXPAND_MENU.SECTION_MATCH}
        articleType={value}
        Component={Sidebar}
      />
    )}
  </ArticleTypeContext.Consumer>
);

export { LeftSideBar };
