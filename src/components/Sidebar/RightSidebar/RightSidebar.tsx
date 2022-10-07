import React, { ReactElement } from 'react';
import { flattenDeep } from 'lodash/fp';
import cn from 'classnames';

import { useGetCurrentHeader } from 'src/hooks/get-current-header-id';
import { HighlightedMenuContext } from 'src/contexts/highlighted-menu-context';
import { SidebarData, SectionTitle, EXPAND_MENU, SidebarLinkMenu } from 'src/components';

import { MenuData } from './menu-data';

import { stickySidebar, withLanguageNavBar } from './RightSidebar.module.css';

const mapMenuItemToSidebarItem = ({ name, id, level }: MenuData): SidebarData => ({
  label: name,
  link: `#${id}`,
  level,
});

type RightSidebarProps = {
  menuData: MenuData[];
  languages: boolean;
  className: string;
};

export const RightSidebar = ({ menuData, languages, className }: RightSidebarProps): ReactElement => {
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

  return (
    <HighlightedMenuContext.Provider value={highlightedMenuItem}>
      <aside
        className={cn(
          stickySidebar,
          {
            [withLanguageNavBar]: languages,
          },
          className,
        )}
        data-languages={languages}
      >
        <SectionTitle className="py-12 px-8">On this page</SectionTitle>
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
