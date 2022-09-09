import { SidebarData } from '../../../../../Sidebar/sidebar-data';
import { ExpandedMenu } from './hamburger-expanded-menu-context';

const markSidebarItemAsClosed = (sidebarItem: SidebarData) =>
  sidebarItem.content ? { ...sidebarItem, closed: true } : sidebarItem;

const markNonExpandedSidebarItemAsClosed = (expandedMenu: ExpandedMenu) => (sidebarItem: SidebarData) =>
  expandedMenu.includes(sidebarItem.label) ? sidebarItem : markSidebarItemAsClosed(sidebarItem);

const accumulatorOrNextSidebarItem = (acc: SidebarData, expandedMenuSection: string) =>
  pickNextData(acc.content ?? [], expandedMenuSection) ?? acc;

const pickNextData = (data: SidebarData[], expandedMenuSection: string) =>
  data.find((sidebarItem: SidebarData) => sidebarItem.label === expandedMenuSection);

const addLevelsToSidebarData = (data: SidebarData[], level: number): SidebarData[] =>
  data.map((sidebarItem) => ({
    ...sidebarItem,
    content: sidebarItem.content && addLevelsToSidebarData(sidebarItem.content, level + 1),
    level,
  }));

export const closeAndFilterSidebarItems = (data: SidebarData[], expandedMenu: ExpandedMenu) => {
  const dataWithLevels = addLevelsToSidebarData(data, 0);
  if (expandedMenu.length === 0) {
    return dataWithLevels.map(markSidebarItemAsClosed);
  }
  const firstExpandedMenu = pickNextData(dataWithLevels, expandedMenu[0]) ?? dataWithLevels[0];
  const remainingExpandedMenu = expandedMenu.slice(1, 2);
  const openSidebarItem = remainingExpandedMenu.reduce(accumulatorOrNextSidebarItem, firstExpandedMenu);

  const modifiedContent =
    openSidebarItem.content && openSidebarItem.content.map(markNonExpandedSidebarItemAsClosed(expandedMenu));

  const openSidebarItemWithModifiedContent = {
    ...openSidebarItem,
    content: modifiedContent,
  };
  return [openSidebarItemWithModifiedContent];
};
