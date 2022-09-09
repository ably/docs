import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../Sidebar';
import { SidebarDataRetrieval } from './SidebarDataRetrieval';
import { EXPAND_MENU } from '../Sidebar/expand-menu-enum';
import { LeftSidebarContainer } from './LeftSidebarContainer';

export type LeftSidebarProps = {
  className?: string;
  languages?: boolean;
};

const LeftSideBar = ({ className = '', languages = false }: LeftSidebarProps) => (
  <LeftSidebarContainer className={className}>
    <SidebarDataRetrieval languages={languages} expandMenu={EXPAND_MENU.SECTION_MATCH} Component={Sidebar} />
  </LeftSidebarContainer>
);

LeftSideBar.propTypes = {
  className: PropTypes.string,
  languages: PropTypes.bool,
};

export { LeftSideBar };
