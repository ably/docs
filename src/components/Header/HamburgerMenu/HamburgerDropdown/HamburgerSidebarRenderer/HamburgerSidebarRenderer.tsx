import React, { useMemo, useState } from 'react';
import { SidebarData, SidebarProps } from 'src/components';
import { closeAndFilterSidebarItems } from './close-and-filter-sidebar-items';
import { ExpandedMenu, HamburgerExpandedMenuContext } from './hamburger-expanded-menu-context';
import { HamburgerSidebarItem } from '.';
import { addAdhocSidebarItems } from './add-adhoc-sidebar-items';
import { removeAdhocSidebarItems } from './remove-adhoc-sidebar-items';
import { HamburgerSidebarDropdownPopulatedItem } from './HamburgerSidebarDropdownPopulatedItem/HamburgerSidebarDropdownPopulatedItem';
import { MAX_NESTING_LEVEL } from './constants';

export const dataToHamburgerSidebarItem = (sidebarItemData: SidebarData) =>
  sidebarItemData.dropdownData ? (
    <HamburgerSidebarDropdownPopulatedItem key={sidebarItemData.label} {...sidebarItemData} />
  ) : (
    <HamburgerSidebarItem key={sidebarItemData.label} {...sidebarItemData} />
  );

export const HamburgerSidebarRenderer = ({ className, data, articleType }: SidebarProps) => {
  const [expandedMenu, setExpandedMenu] = useState<ExpandedMenu>([]);
  const addToExpandedMenuPath = (menuItemID: string) => setExpandedMenu(expandedMenu.concat([menuItemID]));
  const removeFromExpandedMenuPath = (menuItemID: string) => {
    const location = expandedMenu.findIndex((expandedMenuPathSection) => expandedMenuPathSection === menuItemID);
    const shouldRemoveAllChildren = location <= MAX_NESTING_LEVEL;
    const expandedMenuWithoutMenuItem = shouldRemoveAllChildren
      ? expandedMenu.slice(0, location)
      : expandedMenu.filter((expandedMenuPathSection) => expandedMenuPathSection !== menuItemID);
    setExpandedMenu(expandedMenuWithoutMenuItem);
  };
  const addOrRemoveExpandedMenuPath = (menuItemID: string) =>
    expandedMenu.includes(menuItemID) ? removeFromExpandedMenuPath(menuItemID) : addToExpandedMenuPath(menuItemID);

  const dataItemsWithAdHocReplacements = useMemo(
    () => addAdhocSidebarItems(removeAdhocSidebarItems(data), articleType),
    [data],
  );

  const dataItems = useMemo(
    () => closeAndFilterSidebarItems(dataItemsWithAdHocReplacements, expandedMenu),
    [dataItemsWithAdHocReplacements, expandedMenu],
  );

  const sidebarContents =
    dataItems.length === 1 && !!dataItems[0].dropdownData ? (
      <HamburgerSidebarDropdownPopulatedItem key={0} {...dataItems[0]} />
    ) : (
      <ol className={className}>{dataItems.map(dataToHamburgerSidebarItem)}</ol>
    );

  return (
    <HamburgerExpandedMenuContext.Provider value={{ expandedMenu, handleMenuExpansion: addOrRemoveExpandedMenuPath }}>
      {sidebarContents}
    </HamburgerExpandedMenuContext.Provider>
  );
};
