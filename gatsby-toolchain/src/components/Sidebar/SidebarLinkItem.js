import React, { useMemo } from 'react';
import SidebarItem from './SidebarItem';
import SidebarLink from './SidebarLink';
import SidebarLinkMenu from './SidebarLinkMenu';

const SidebarLinkItem = ({ uuid, label, link, content, level, interactable = false, indent = 0 }) => {
    const linkContent = useMemo(() => Array.isArray(content) ?
        <SidebarLinkMenu key={ label } data={ content } indent={indent + 16}/> :
        <SidebarLink to={ link } $leaf={true} indent={indent}>{ content }</SidebarLink>, [content, indent, label, link]);
    return <SidebarItem
        uuid={uuid}
        label={ label }
        content={ linkContent }
        level={ level }
        interactable={interactable} />;
}

export default SidebarLinkItem;