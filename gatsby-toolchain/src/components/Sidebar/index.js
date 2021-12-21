import React from 'react';
import SidebarLinkMenu from './SidebarLinkMenu';
import StickySidebar from './StickySidebar';

const Sidebar = ({data, MenuType = SidebarLinkMenu, Type = StickySidebar}) => {
    return <Type>
        <MenuType data={ data } />
    </Type>;
}

export default Sidebar;