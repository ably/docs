import { Link } from 'gatsby';
import React, { useMemo } from 'react';
import SidebarItem from './SidebarItem';
import SidebarLinkMenu from './SidebarLinkMenu';

const SidebarLinkItem = ({ label, link, content, level }) => {
    const linkContent = useMemo(() => Array.isArray(content) ?
        <SidebarLinkMenu key={ label } data={ content } /> :
        <Link to={ link }>{ content }</Link>, [content, label, link]);
    return <SidebarItem
        label={ label }
        content={ linkContent }
        level={ level } />;
}

export default SidebarLinkItem;