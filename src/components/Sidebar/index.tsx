import React, { ReactElement } from 'react';
import SidebarLinkMenu from './SidebarLinkMenu';
import SidebarTitle from './SidebarTitle';
import StickySidebar from './StickySidebar';
import { EXPAND_MENU } from './expand-menu-enum';
import { SidebarProps } from './sidebar-props';

const Sidebar = ({
  data,
  className,
  languages = false,
  interactableLinkMenu = false,
  title = null,
  expandMenu = EXPAND_MENU.EXPANDED,
}: SidebarProps): ReactElement => (
  <StickySidebar className={className} data-languages={languages}>
    {title && <SidebarTitle title={title} />}
    <SidebarLinkMenu data={data} interactable={interactableLinkMenu} expandMenu={expandMenu} />
  </StickySidebar>
);

export default Sidebar;
