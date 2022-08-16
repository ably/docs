import React, { useState } from 'react';
import { SidebarProps } from '../../../../../Sidebar';
import { SidebarData } from '../../../../../Sidebar/sidebar-data';
import { ExpandedMenu, HamburgerExpandedMenuContext } from './hamburger-expanded-menu-context';
import { HamburgerSidebarItem } from './HamburgerSidebarItem';

export const dataToHamburgerSidebarItem = (sidebarItemData: SidebarData, index: number) => (
  <HamburgerSidebarItem key={index} {...sidebarItemData} />
);

export const HamburgerSidebarRenderer = ({ className, data }: SidebarProps) => {
  const [expandedMenu, setExpandedMenu] = useState<ExpandedMenu>([]);
  const addToExpandedMenuPath = (menuItemID: string) => setExpandedMenu(expandedMenu.concat([menuItemID]));

  return (
    <HamburgerExpandedMenuContext.Provider value={{ addToExpandedMenuPath }}>
      <ol className={className}>{data.map(dataToHamburgerSidebarItem)}</ol>
    </HamburgerExpandedMenuContext.Provider>
  );
};
