import React from 'react';
import SidebarLinkMenu from './SidebarLinkMenu';

const SidebarRoot = ({data}) => {
    return <aside>
        <SidebarLinkMenu data={ data } />
    </aside>;
}

export default SidebarRoot;