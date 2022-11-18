import React from 'react';
import PropTypes from 'prop-types';
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
      <div className="bg-extra-light-grey h-screen hidden md:block md:sticky top-0 z-20 left-0 w-244">
        <SidebarDataRetrieval
          className={className}
          languages={languages}
          expandMenu={EXPAND_MENU.SECTION_MATCH}
          articleType={value}
          Component={Sidebar}
        />
      </div>
    )}
  </ArticleTypeContext.Consumer>
);

LeftSideBar.propTypes = {
  className: PropTypes.string,
  languages: PropTypes.bool,
};

export { LeftSideBar };
