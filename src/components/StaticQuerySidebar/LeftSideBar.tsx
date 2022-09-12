import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../Sidebar';
import { SidebarDataRetrieval } from './SidebarDataRetrieval';
import { EXPAND_MENU } from '../Sidebar/expand-menu-enum';
import { LeftSidebarContainer } from './LeftSidebarContainer';
import { AblySidebarIconContainer } from './AblySidebarIconContainer';

export type LeftSidebarProps = {
  className?: string;
  languages?: boolean;
};

const LeftSideBar = ({ className = '', languages = false }: LeftSidebarProps) => (
  <LeftSidebarContainer>
    <SidebarDataRetrieval
      className={className}
      languages={languages}
      expandMenu={EXPAND_MENU.SECTION_MATCH}
      Component={Sidebar}
    />
    <AblySidebarIconContainer />
  </LeftSidebarContainer>
);

LeftSideBar.propTypes = {
  className: PropTypes.string,
  languages: PropTypes.bool,
};

export { LeftSideBar };
