import React from 'react';
import { Sidebar, EXPAND_MENU } from 'src/components';
import { SidebarDataRetrieval } from './SidebarDataRetrieval';
import { SidebarName } from './types';

export type LeftSidebarProps = {
  className?: string;
  languages?: boolean;
  sidebarName: SidebarName;
};

const LeftSideBar = ({ sidebarName, className = '', languages = false }: LeftSidebarProps) => (
  <SidebarDataRetrieval
    className={className}
    languages={languages}
    expandMenu={EXPAND_MENU.SECTION_MATCH}
    sidebarName={sidebarName}
    Component={Sidebar}
  />
);

export { LeftSideBar };
