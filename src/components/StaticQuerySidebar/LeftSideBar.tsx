import React from 'react';
import PropTypes from 'prop-types';
import { Sidebar, EXPAND_MENU } from 'src/components';
import { SidebarDataRetrieval } from './SidebarDataRetrieval';

export type LeftSidebarProps = {
  className?: string;
  languages?: boolean;
};

const LeftSideBar = ({ className = '', languages = false }: LeftSidebarProps) => (
  <div className="h-screen hidden md:block md:sticky top-0 z-20 bg-extra-light-grey">
    <SidebarDataRetrieval
      className={className}
      languages={languages}
      expandMenu={EXPAND_MENU.SECTION_MATCH}
      Component={Sidebar}
    />
  </div>
);

LeftSideBar.propTypes = {
  className: PropTypes.string,
  languages: PropTypes.bool,
};

export { LeftSideBar };
