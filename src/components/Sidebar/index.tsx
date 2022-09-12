import React, { ReactElement } from 'react';
import SidebarLinkMenu from './SidebarLinkMenu';
import SidebarTitle from './SidebarTitle';
import StickySidebar from './StickySidebar';
import { EXPAND_MENU } from './expand-menu-enum';
import { SidebarData } from './sidebar-data';
import { HighlightedMenuContext } from '../../contexts/highlighted-menu-context';

export type SidebarProps = {
  data: SidebarData[];
  className?: string;
  title?: string;
  indentOffset?: number;
  expandableLinkMenu?: boolean;
  languages?: boolean;
  expandMenu?: EXPAND_MENU;
};

const Sidebar = ({
  data,
  className = '',
  title,
  indentOffset = 0,
  languages = false,
  expandableLinkMenu = true,
  expandMenu = EXPAND_MENU.EXPANDED,
}: SidebarProps): ReactElement => (
  <StickySidebar className={className} data-languages={languages}>
    {title && <SidebarTitle title={title} />}
    <HighlightedMenuContext.Consumer>
      {(highlightedMenuId) => (
        <SidebarLinkMenu
          data={data}
          expandable={expandableLinkMenu}
          expandMenu={expandMenu}
          indentOffset={indentOffset}
          highlightedMenuId={highlightedMenuId}
        />
      )}
    </HighlightedMenuContext.Consumer>
  </StickySidebar>
);

export default Sidebar;
