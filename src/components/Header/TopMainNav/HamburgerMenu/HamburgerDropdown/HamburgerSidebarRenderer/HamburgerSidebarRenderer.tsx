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
  const removeFromExpandedMenuPath = (menuItemID: string) => {
    const location = expandedMenu.findIndex((expandedMenuPathSection) => expandedMenuPathSection === menuItemID);
    const expandedMenuWithoutMenuItem = expandedMenu.slice(0, location);
    setExpandedMenu(expandedMenuWithoutMenuItem);
  };
  const addOrRemoveExpandedMenuPath = (menuItemID: string) =>
    expandedMenu.includes(menuItemID) ? removeFromExpandedMenuPath(menuItemID) : addToExpandedMenuPath(menuItemID);
  const dataItems = useMemo(() => closeAndFilterSidebarItems(data, expandedMenu), [data, expandedMenu]);
  return (
    <HamburgerExpandedMenuContext.Provider value={{ expandedMenu, handleMenuExpansion: addOrRemoveExpandedMenuPath }}>
      <ol className={className}>{dataItems.map(dataToHamburgerSidebarItem)}</ol>
    </HamburgerExpandedMenuContext.Provider>
  );
};
