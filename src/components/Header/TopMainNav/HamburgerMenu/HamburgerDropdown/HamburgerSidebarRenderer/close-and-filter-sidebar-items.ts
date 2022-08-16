import { SidebarData } from '../../../../../Sidebar/sidebar-data';
import { ExpandedMenu } from './hamburger-expanded-menu-context';

const markSidebarItemAsClosed = (sidebarItem: SidebarData) =>
  sidebarItem.content ? { ...sidebarItem, closed: true } : sidebarItem;

const pickNextData = (data: SidebarData[], expandedMenuSection: string) =>
  data.find((sidebarItem: SidebarData) => sidebarItem.label === expandedMenuSection);

export const closeAndFilterSidebarItems = (data: SidebarData[], expandedMenu: ExpandedMenu) => {
  if (expandedMenu.length === 0) {
    return data.map(markSidebarItemAsClosed);
  }
  const firstExpandedMenu = pickNextData(data, expandedMenu[0]) ?? data[0];
  const remainingExpandedMenu = expandedMenu.slice(1);
  return [
    remainingExpandedMenu.reduce(
      (acc: SidebarData, expandedMenuSection: string) => pickNextData(acc.content ?? [], expandedMenuSection) ?? acc,
      firstExpandedMenu,
    ),
  ];
};
