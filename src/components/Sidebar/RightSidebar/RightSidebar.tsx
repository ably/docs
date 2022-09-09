import React, { ReactElement } from 'react';
import Sidebar from '..';
import { SidebarData } from '../sidebar-data';
import { MenuData } from './menu-data';

const mapMenuItemToSidebarItem = ({ name, id, level }: MenuData): SidebarData => ({
  label: name,
  link: `#${id}`,
  level,
});

type RightSidebarProps = {
  menuData: MenuData[];
  languages: boolean;
  className: string;
};

export const RightSidebar = ({ menuData, languages, className }: RightSidebarProps): ReactElement => {
  let parent;
  let previous;
  const menuLength = menuData.length;
  const sidebarData = [];
  for (let i = 0; i < menuLength; ++i) {
    const menuItem = {
      ...mapMenuItemToSidebarItem(menuData[i]),
    };
    const [previousLevel, previousParent] = previous ? [previous.level, previous.parent] : [false, false];
    const previousItemsExist = previousLevel && previousParent;
    if (previous && previousItemsExist && menuItem.level && menuItem.level > previousLevel) {
      menuItem.parent = previousParent as SidebarData;
      previous.content = previous.content ? previous.content.concat([menuItem]) : [menuItem];
    } else if (parent && menuItem.level && parent.level && menuItem.level > parent.level) {
      menuItem.parent = parent;
      parent.content = parent.content ? parent.content.concat([menuItem]) : [menuItem];
    } else {
      sidebarData.push(menuItem);
      parent = menuItem;
    }
    previous = menuItem;
  }
  return (
    <Sidebar
      title="On this page"
      languages={languages}
      data={sidebarData}
      className={className}
      interactableLinkMenu={true}
    />
  );
};
