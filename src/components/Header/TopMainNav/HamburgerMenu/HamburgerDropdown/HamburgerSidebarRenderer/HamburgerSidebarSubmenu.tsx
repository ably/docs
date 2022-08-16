import React from 'react';
import { SidebarData } from '../../../../../Sidebar/sidebar-data';
import { DispatchExpandedMenu } from './hamburger-expanded-menu-context';
import { dataToHamburgerSidebarItem } from './HamburgerSidebarRenderer';

export const HamburgerSidebarSubmenu = ({
  addToExpandedMenuPath,
  label,
  closed,
  content,
}: {
  addToExpandedMenuPath: DispatchExpandedMenu;
  label: string;
  closed?: boolean;
  content: SidebarData[];
}) => (
  <>
    <h4 className="cursor-pointer" onClick={() => addToExpandedMenuPath(label)}>
      {label}
    </h4>
    {!closed && content ? <ol>{content.map(dataToHamburgerSidebarItem)}</ol> : null}
  </>
);
