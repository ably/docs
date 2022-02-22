import React from 'react';
import PropTypes from 'prop-types';
import SidebarLinkMenu from './SidebarLinkMenu';
import SidebarTitle from './SidebarTitle';
import StickySidebar from './StickySidebar';

const Sidebar = ({ data, className, interactableLinkMenu = false, title = null }) => {
  return (
    <StickySidebar className={className}>
      {title && <SidebarTitle title={title} />}
      <SidebarLinkMenu data={data} interactable={interactableLinkMenu} />
    </StickySidebar>
  );
};

Sidebar.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string,
  interactableLinkMenu: PropTypes.bool,
  title: PropTypes.string,
};

export default Sidebar;
