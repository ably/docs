import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from '..';

const mapMenuItemToSidebarItem = ({ name, id, level }) => ({
  label: name,
  link: `#${id}`,
  level,
});

const RightSidebar = ({ menuData, className }) => {
  let parent;
  let previous;
  const menuLength = menuData.length;
  const sidebarData = [];
  for (let i = 0; i < menuLength; ++i) {
    const menuItem = {
      ...mapMenuItemToSidebarItem(menuData[i]),
    };
    if (previous && menuItem.level > previous.level && previous.parent) {
      menuItem.parent = previous.parent;
      previous.content = previous.content ? previous.content.concat([menuItem]) : [menuItem];
    } else if (parent && menuItem.level > parent.level) {
      menuItem.parent = parent;
      parent.content = parent.content ? parent.content.concat([menuItem]) : [menuItem];
    } else {
      sidebarData.push(menuItem);
      parent = menuItem;
    }
    previous = menuItem;
  }
  return <Sidebar title="On this page" data={sidebarData} className={className} interactableLinkMenu={true} />;
};

RightSidebar.propTypes = {
  menuData: PropTypes.array,
  className: PropTypes.string,
};

export default RightSidebar;
