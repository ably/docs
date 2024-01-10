import React, { useMemo, useState } from 'react';
import { SidebarData, SidebarName } from 'src/components';
import { closeAndFilterSidebarItems } from './close-and-filter-sidebar-items';
import { ExpandedMenu, HamburgerExpandedMenuContext } from './hamburger-expanded-menu-context';
import { HamburgerSidebarItem } from '.';
import { addAdhocSidebarItems } from './add-adhoc-sidebar-items';
import { removeAdhocSidebarItems } from './remove-adhoc-sidebar-items';
import { HamburgerSidebarDropdownPopulatedItem } from './HamburgerSidebarDropdownPopulatedItem/HamburgerSidebarDropdownPopulatedItem';
import { MAX_NESTING_LEVEL } from './constants';

export type HamburgerMenuProps = {
  data: SidebarData[];
  className?: string;
  sidebarName: SidebarName;
};

const SDKsLinkData = {
  link: '/sdks',
  label: 'SDKs',
  level: 0,
};

export const dataToHamburgerSidebarItem = (sidebarItemData: SidebarData) =>
  sidebarItemData.dropdownData ? (
    <HamburgerSidebarDropdownPopulatedItem key={sidebarItemData.label} {...sidebarItemData} />
  ) : (
    <HamburgerSidebarItem key={sidebarItemData.label} {...sidebarItemData} />
  );

export const HamburgerSidebarRenderer = ({ className, data, sidebarName }: HamburgerMenuProps) => {
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
    () => addAdhocSidebarItems(removeAdhocSidebarItems(data), sidebarName),
    [data, sidebarName],
  );

  const dataItems = useMemo(
    () => closeAndFilterSidebarItems(dataItemsWithAdHocReplacements, expandedMenu),
    [dataItemsWithAdHocReplacements, expandedMenu],
  );

  // if dataItems length is 1 it means user has entered in deeper level of list, SDKs should be only on level 0
  const dataWithSDKsLink = dataItems.length === 1 ? dataItems : [...dataItems, SDKsLinkData];

  const sidebarContents =
    dataItems.length === 1 && !!dataItems[0].dropdownData ? (
      <HamburgerSidebarDropdownPopulatedItem key={0} {...dataItems[0]} />
    ) : (
      <ol className={className}>{dataWithSDKsLink.map(dataToHamburgerSidebarItem)}</ol>
    );

  return (
    <HamburgerExpandedMenuContext.Provider value={{ expandedMenu, handleMenuExpansion: addOrRemoveExpandedMenuPath }}>
      {sidebarContents}
    </HamburgerExpandedMenuContext.Provider>
  );
};
