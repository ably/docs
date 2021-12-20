import { Link } from 'gatsby';
import React, { useMemo } from 'react';
import { Accordion } from 'react-accessible-accordion';
import SidebarLinkItem from './SidebarLinkItem';

const SidebarLinkMenu = ({ data }) => {
    const linkMenu = useMemo(() => data.map(({ label, link, level, content }) => 
        content ?
        <SidebarLinkItem key={ label } label={ label } link={ link } level={ level } content={ content } /> :
        <Link to={ link } >{ label }</Link>), [data]);
    return <Accordion>
        { linkMenu }
    </Accordion>;
}

export default SidebarLinkMenu;