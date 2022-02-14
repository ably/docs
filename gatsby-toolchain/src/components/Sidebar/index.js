import React from 'react';
import SidebarLinkMenu from './SidebarLinkMenu';
import SidebarTitle from './SidebarTitle';
import StickySidebar from './StickySidebar';

const Sidebar = ({data, className, interactableLinkMenu=false, title = null}) => {
    return <StickySidebar className={ className }>
        { title && <SidebarTitle title={title} />}
        <SidebarLinkMenu data={ data } interactable={interactableLinkMenu}/>
    </StickySidebar>;
}

export default Sidebar;