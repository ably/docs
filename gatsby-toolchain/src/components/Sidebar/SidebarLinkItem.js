import { Link } from 'gatsby';
import React from 'react';
import { AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';
import SidebarLinkMenu from './SidebarLinkMenu';

const SidebarLinkItem = ({ label, link, content, level}) => <AccordionItem>
    <AccordionItemHeading aria-level={ level || 3 }>
        <AccordionItemButton>
            { label }
        </AccordionItemButton>
    </AccordionItemHeading>
    <AccordionItemPanel>
       { Array.isArray(content) ? <SidebarLinkMenu key={ label } data={ content } /> : <Link to={ link }>content</Link> }
    </AccordionItemPanel>
</AccordionItem>;

export default SidebarLinkItem;