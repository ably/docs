import React, { ReactElement } from 'react';
import cn from 'classnames';

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
}: SidebarProps): ReactElement => {
  return (
    <StickySidebar className={cn('pt-8', className)} data-languages={languages}>
      {title && <SidebarTitle title={title} />}
      {data.map(({ label, content }) => (
        <div key={label} className="mb-32">
          {label && <div className="font-medium uppercase text-menu3 mb-8">{label}</div>}
          <HighlightedMenuContext.Consumer>
            {(highlightedMenuId) =>
              content && (
                <SidebarLinkMenu
                  data={content}
                  expandable={expandableLinkMenu}
                  expandMenu={expandMenu}
                  indentOffset={indentOffset}
                  highlightedMenuId={highlightedMenuId}
                />
              )
            }
          </HighlightedMenuContext.Consumer>
        </div>
      ))}
    </StickySidebar>
  );
};

export default Sidebar;
