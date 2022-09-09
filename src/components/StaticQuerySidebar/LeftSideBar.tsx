import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../Sidebar';
import { SidebarDataRetrieval } from './SidebarDataRetrieval';
import { EXPAND_MENU } from '../Sidebar/expand-menu-enum';

export type LeftSidebarProps = {
  className?: string;
  languages?: boolean;
};

const LeftSideBar = ({ className = '', languages = false }: LeftSidebarProps) => (
  <SidebarDataRetrieval
    className={className}
    languages={languages}
    expandMenu={EXPAND_MENU.SECTION_MATCH}
    Component={Sidebar}
  />
);

LeftSideBar.propTypes = {
  className: PropTypes.string,
  languages: PropTypes.bool,
};

export { LeftSideBar };
