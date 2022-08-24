import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import Sidebar from '..';
import { SidebarData } from '../sidebar-data';
import { MenuData } from './menu-data';
import { EXPAND_MENU } from '../expand-menu-enum';
import { flattenDeep } from 'lodash/fp';
import { useGetCurrentHeader } from '../../../hooks/get-current-header-id';
import { HighlightedMenuContext } from '../../../contexts/highlighted-menu-context';

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

const RightSidebar = ({ menuData, languages, className }: RightSidebarProps): ReactElement => {
  let parent;
  let previous;
  const menuLength = menuData.length;
  const sidebarData = [];

  for (let i = 0; i < menuLength; ++i) {
    const menuItem = {
      ...mapMenuItemToSidebarItem(menuData[i]),
    };
    if (previous && menuItem.level && previous.level && menuItem.level > previous.level && previous.parent) {
      menuItem.parent = previous.parent;
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
      <Sidebar
        title="On this page"
        languages={languages}
        data={sidebarData}
        className={className}
        expandableLinkMenu={false}
        expandMenu={EXPAND_MENU.EXPANDED}
      />
    </HighlightedMenuContext.Provider>
  );
};

RightSidebar.propTypes = {
  menuData: PropTypes.array,
  className: PropTypes.string,
  languages: PropTypes.bool,
};

export default RightSidebar;
