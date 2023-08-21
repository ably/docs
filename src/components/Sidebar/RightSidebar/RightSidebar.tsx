import React, { useEffect, useRef, useState } from 'react';
import { flattenDeep, throttle } from 'lodash/fp';
import cn from 'classnames';

import { useGetCurrentHeader } from 'src/hooks/get-current-header-id';
import { HighlightedMenuContext } from 'src/contexts/highlighted-menu-context';
import { SidebarData, SectionTitle, EXPAND_MENU, SidebarLinkMenu } from 'src/components';

import { MenuData } from './menu-data';

import { stickySidebar } from './RightSidebar.module.css';

const mapMenuItemToSidebarItem = ({ name, id, level }: MenuData): SidebarData => ({
  label: name,
  link: `#${id}`,
  level,
});

type RightSidebarProps = {
  menuData: MenuData[];
  languages: boolean;
};

const MANUAL_SCROLL_DELAY_BEFORE_AUTOSCROLL_ACTIVE_MILLISECONDS = 2000;

export const RightSidebar = ({ menuData, languages }: RightSidebarProps) => {
  const rightSidebarRef = useRef<HTMLBaseElement>(null);

  const [lastManualScrollTime, setLastManualScrollTime] = useState(0);

  let parent;
  let previous;
  const menuLength = menuData.length;
  const sidebarData: SidebarData[] = [];

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

  const flatTableOfContents = flattenDeep(
    sidebarData.map((sidebarData: SidebarData) =>
      sidebarData.content ? [sidebarData, ...sidebarData.content] : sidebarData,
    ),
  );

  const highlightedMenuItem = useGetCurrentHeader(flatTableOfContents);

  useEffect(() => {
    if (Date.now() - lastManualScrollTime < MANUAL_SCROLL_DELAY_BEFORE_AUTOSCROLL_ACTIVE_MILLISECONDS) {
      // Prevent autoscrolling the right sidebar if the sidebar was deliberately/manually scrolled recently.
      return;
    }
    const rightSidebarHighlightedElement = document?.getElementById(
      `sidebar-heading-${highlightedMenuItem?.replaceAll('#', '')}`,
    );
    if (rightSidebarHighlightedElement && rightSidebarRef?.current) {
      if (rightSidebarHighlightedElement.offsetTop) {
        rightSidebarRef.current.scrollTo({
          left: 0,
          top: rightSidebarHighlightedElement.offsetTop - rightSidebarRef.current.offsetHeight / 2,
          behavior: 'smooth',
        });
      }
    }
  }, [highlightedMenuItem, lastManualScrollTime]);

  if (menuLength <= 1) {
    return null;
  }

  // We throttle this update as well, so in practice there will usually be between 2-4 seconds of delay before autoscroll is reactivated
  // after a manual scroll on the right sidebar
  const onWheel = throttle(MANUAL_SCROLL_DELAY_BEFORE_AUTOSCROLL_ACTIVE_MILLISECONDS, () =>
    setLastManualScrollTime(Date.now()),
  );
  return (
    <HighlightedMenuContext.Provider value={highlightedMenuItem}>
      <aside
        className={cn('transition-all hidden md:block md:mr-20 w-full flex-grow', stickySidebar)}
        onWheel={onWheel}
        data-languages={languages}
        ref={rightSidebarRef}
      >
        <SectionTitle className="py-12 px-8 bg-white">On this page</SectionTitle>
        <HighlightedMenuContext.Consumer>
          {(highlightedMenuId) => (
            <SidebarLinkMenu
              data={sidebarData}
              expandable={false}
              expandMenu={EXPAND_MENU.EXPANDED}
              highlightedMenuId={highlightedMenuId}
            />
          )}
        </HighlightedMenuContext.Consumer>
      </aside>
    </HighlightedMenuContext.Provider>
  );
};
