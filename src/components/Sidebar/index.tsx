import React, { ReactElement } from 'react';
import cn from 'classnames';

import { HighlightedMenuContext } from 'src/contexts/highlighted-menu-context';
import SidebarLinkMenu from './SidebarLinkMenu';
import StickySidebar from './StickySidebar';
import { EXPAND_MENU } from './expand-menu-enum';
import { SidebarData } from './sidebar-data';
import { SectionTitle } from './SectionTitle';

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
  indentOffset = 0,
  languages = false,
  expandableLinkMenu = true,
  expandMenu = EXPAND_MENU.EXPANDED,
}: SidebarProps): ReactElement => {
  return (
    <StickySidebar className={cn('pt-8', className)} data-languages={languages}>
      {data.map(({ label, content }) => (
        <div key={label} className="mb-32">
          {label && <SectionTitle className="mb-8">{label}</SectionTitle>}
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
