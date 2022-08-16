import { SidebarData } from '../../../../../Sidebar/sidebar-data';
import { ExpandedMenu } from './hamburger-expanded-menu-context';

const markSidebarItemAsClosed = (sidebarItem: SidebarData) =>
  sidebarItem.content ? { ...sidebarItem, closed: true } : sidebarItem;

export const closeAndFilterSidebarItems = (data: SidebarData[], expandedMenu: ExpandedMenu) => {
  if (expandedMenu.length === 0) {
    return data.map(markSidebarItemAsClosed);
  }

  return data;
};
