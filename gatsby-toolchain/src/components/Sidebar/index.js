import React from 'react';
import SidebarLinkMenu from './SidebarLinkMenu';

const Sidebar = ({data, Type = SidebarLinkMenu}) => {
    return <aside>
        <Type data={ data } />
    </aside>;
}

export default Sidebar;