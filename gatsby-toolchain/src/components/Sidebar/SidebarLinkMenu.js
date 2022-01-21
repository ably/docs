import { Link } from 'gatsby';
import React, { useMemo } from 'react';
import { Accordion } from 'react-accessible-accordion';
import { ROOT_LEVEL } from './consts';
import SidebarLinkItem from './SidebarLinkItem';

const SidebarLinkMenu = ({ data }) => {
    const linkMenu = useMemo(() => data.map(({ label, link, level = ROOT_LEVEL, content = false }) => 
        content ?
        <li key={ label }><SidebarLinkItem label={ label } link={ link } level={ level } content={ content } /></li> :
        <li key={ label }><Link to={ link } >{ label }</Link></li>), [data]);
    return <Accordion>
        <ul>
            { linkMenu }
        </ul>
    </Accordion>;
}

export default SidebarLinkMenu;