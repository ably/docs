import React from 'react';
import { Accordion } from 'react-accessible-accordion';
import SidebarLinkItem from './SidebarLinkItem';

const SidebarLinkMenu = ({ data }) => {
    const linkMenu = data.map(({ label, link, level, content }) => 
        <SidebarLinkItem key={ label } label={ label } link={ link } level={ level } content={ content } />);
    return <Accordion>
        { linkMenu }
    </Accordion>;
}

export default SidebarLinkMenu;