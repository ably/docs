import React, { ReactElement } from 'react';
import cn from 'classnames';

import { HighlightedMenuContext } from 'src/contexts/highlighted-menu-context';
import { SidebarLinkMenu, SectionTitle } from './';
import { SidebarData, EXPAND_MENU } from './types';

import { stickySidebar } from './Sidebar.module.css';

export type SidebarProps = {
  data: SidebarData[];
  className?: string;
  title?: string;
  indentOffset?: number;
  expandableLinkMenu?: boolean;
  languages?: boolean;
  expandMenu?: EXPAND_MENU;
};

export const Sidebar = ({
  data,
  className = '',
  indentOffset = 0,
  languages = false,
  expandableLinkMenu = true,
  expandMenu = EXPAND_MENU.EXPANDED,
}: SidebarProps): ReactElement => {
  return (
    <aside className={cn(stickySidebar, className)} data-languages={languages}>
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
    </aside>
  );
};
