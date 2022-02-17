import React, { useMemo } from 'react';
import { Accordion } from 'react-accessible-accordion';
import styled from 'styled-components';
import { ROOT_LEVEL } from './consts';
import SidebarLabel from './SidebarLabel';
import SidebarLink from './SidebarLink';
import SidebarLinkItem from './SidebarLinkItem';

const OrderedList = styled.ol`
    margin: 0;
    padding:0;
`;

const SidebarLinkMenu = ({ data, interactable = false, indent = 0 }) => {
    const preExpanded = useMemo(() => [], []);
    const linkMenu = useMemo(() => data.map(({ label, link, level = ROOT_LEVEL, content = false }) => {
        const uuid = encodeURIComponent(`${label}${link}`);

        const labelMaybeWithLink = interactable ?
            <SidebarLink $leaf={false} indent={indent} level={level} to={ link } >{ label }</SidebarLink> :
            <SidebarLabel $leaf={false} indent={indent} level={level}>{label}</SidebarLabel>;

        preExpanded.push(uuid);
        return content ?
            <li key={ label }>
                <SidebarLinkItem
                    uuid={ uuid }
                    label={ labelMaybeWithLink }
                    link={ link }
                    level={ level }
                    content={ content }
                    interactable={interactable}
                    indent={indent} />
                </li> :
            <li key={ label }><SidebarLink to={ link } $leaf={indent > 0}>{ label }</SidebarLink></li>
        }), [data, interactable, indent, preExpanded]);
    return <Accordion allowMultipleExpanded={true} allowZeroExpanded={true} preExpanded={preExpanded}>
        <OrderedList>
            { linkMenu }
        </OrderedList>
    </Accordion>;
};

export default SidebarLinkMenu;