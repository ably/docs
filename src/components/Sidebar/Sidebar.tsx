import cn from 'classnames';
import { ReactElement } from 'react';

import { HighlightedMenuContext } from 'src/contexts/highlighted-menu-context';

import { SectionTitle, SidebarLinkMenu } from './';
import { EXPAND_MENU, SidebarData } from './types';

type SidebarProps = {
  data: SidebarData[];
  className?: string;
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
    <aside
      className={cn(
        'transition-all fixed hidden h-screen md:block overflow-y-auto bg-extra-light-grey z-20 pt-24 pb-128 left-0 w-244',
        className,
      )}
      data-languages={languages}
    >
      {data.map(({ label, content }) => (
        <div key={label} className="px-24 mb-128">
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
