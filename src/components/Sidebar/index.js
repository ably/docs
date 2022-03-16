import React from 'react';
import PropTypes from 'prop-types';
import SidebarLinkMenu from './SidebarLinkMenu';
import SidebarTitle from './SidebarTitle';
import StickySidebar from './StickySidebar';
import { EXPAND_MENU } from './consts';

const Sidebar = ({
  data,
  className,
  interactableLinkMenu = false,
  title = null,
  expandMenu = EXPAND_MENU.EXPANDED,
}) => {
  return (
    <StickySidebar className={className}>
      {title && <SidebarTitle title={title} />}
      <SidebarLinkMenu data={data} interactable={interactableLinkMenu} expandMenu={expandMenu} />
    </StickySidebar>
  );
};

Sidebar.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string,
  interactableLinkMenu: PropTypes.bool,
  title: PropTypes.string,
  expandMenu: PropTypes.oneOf(Object.values(EXPAND_MENU)),
};

export default Sidebar;
