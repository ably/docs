import React, { ReactElement } from 'react';
import SidebarLinkMenu from './SidebarLinkMenu';
import SidebarTitle from './SidebarTitle';
import StickySidebar from './StickySidebar';
import { EXPAND_MENU } from './expand-menu-enum';
import { SidebarData } from './sidebar-data';

type SidebarProps = {
  data: SidebarData[];
  className: string;
  title?: string;
  languages: boolean;
  indentOffset?: number;
  interactableLinkMenu: boolean;
  expandMenu?: EXPAND_MENU;
};

const Sidebar = ({
  data,
  className,
  title,
  indentOffset = 0,
  languages = false,
  interactableLinkMenu = false,
  expandMenu = EXPAND_MENU.EXPANDED,
}: SidebarProps): ReactElement => (
  <StickySidebar className={className} data-languages={languages}>
    {title && <SidebarTitle title={title} />}
    <SidebarLinkMenu
      data={data}
      interactable={interactableLinkMenu}
      expandMenu={expandMenu}
      indentOffset={indentOffset}
    />
  </StickySidebar>
);

export default Sidebar;
