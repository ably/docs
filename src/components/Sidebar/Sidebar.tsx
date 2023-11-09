import cn from 'classnames';
import { ReactElement, useEffect } from 'react';

import { HighlightedMenuContext } from 'src/contexts/highlighted-menu-context';

import { SectionTitle, SidebarLinkMenu } from './';
import { EXPAND_MENU, SidebarData } from './types';

import { useSidebar } from 'src/contexts/SidebarContext';

import ExpandLeftIcon from './icons/ExpandLeftIcon';
import ExpandRightIcon from './icons/ExpandRightIcon';

export type SidebarProps = {
  data: SidebarData[];
  className?: string;
  indentOffset?: number;
  expandableLinkMenu?: boolean;
  languages?: boolean;
  expandMenu?: EXPAND_MENU;
  collapsible?: boolean;
};

export const Sidebar = ({
  data,
  className = '',
  indentOffset = 0,
  languages = false,
  expandableLinkMenu = true,
  expandMenu = EXPAND_MENU.EXPANDED,
  collapsible = false,
}: SidebarProps): ReactElement => {
  const { collapsed, setCollapsed } = useSidebar();

  // if we navigate from a page where collapsible is true
  // then collapsed could be true when we re-render
  useEffect(() => {
    if (!collapsible) {
      setCollapsed(false);
    }
  }, [collapsible, setCollapsed]);

  const handleToggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <aside
      className={cn(
        'transition-all duration-300 fixed hidden h-screen md:block overflow-y-auto bg-extra-light-grey z-20 left-0 w-244 pb-128',
        { '-left-200': collapsed },
        { 'pt-24': !collapsible },
        className,
      )}
      data-languages={languages}
    >
      {collapsible && (
        <div className="pt-12 pr-8 text-right bg-extra-light-grey w-244">
          <button className="inline-block" onClick={handleToggleSidebar}>
            {collapsed ? <ExpandRightIcon /> : <ExpandLeftIcon />}
          </button>
        </div>
      )}
      {data.map(({ label, content }) => (
        <div key={label} className={cn("px-24 mb-32 transition-all", { "opacity-0": collapsed })}>
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
