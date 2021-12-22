import React from 'react';
import SidebarLinkMenu from './SidebarLinkMenu';
import StickySidebar from './StickySidebar';

const Sidebar = ({data, className}) => {
    return <StickySidebar className={ className }>
        <SidebarLinkMenu data={ data } />
    </StickySidebar>;
}

export default Sidebar;