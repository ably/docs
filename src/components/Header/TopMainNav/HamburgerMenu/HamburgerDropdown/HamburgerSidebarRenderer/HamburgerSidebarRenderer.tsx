import React, { useMemo, useState } from 'react';
import { SidebarProps } from '../../../../../Sidebar';
import { SidebarData } from '../../../../../Sidebar/sidebar-data';
import { closeAndFilterSidebarItems } from './close-and-filter-sidebar-items';
import { ExpandedMenu, HamburgerExpandedMenuContext } from './hamburger-expanded-menu-context';
import { HamburgerSidebarItem } from './HamburgerSidebarItem';

export const dataToHamburgerSidebarItem = (sidebarItemData: SidebarData, index: number) => (
  <HamburgerSidebarItem key={index} {...sidebarItemData} />
);

export const HamburgerSidebarRenderer = ({ className, data }: SidebarProps) => {
  const [expandedMenu, setExpandedMenu] = useState<ExpandedMenu>([]);
  const addToExpandedMenuPath = (menuItemID: string) => setExpandedMenu(expandedMenu.concat([menuItemID]));
  const dataItems = useMemo(() => closeAndFilterSidebarItems(data, expandedMenu), [data, expandedMenu]);
  return (
    <HamburgerExpandedMenuContext.Provider value={{ expandedMenu, addToExpandedMenuPath }}>
      <ol className={className}>{dataItems.map(dataToHamburgerSidebarItem)}</ol>
    </HamburgerExpandedMenuContext.Provider>
  );
};
