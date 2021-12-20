import React from 'react';
import { AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';

const SidebarItem = ({ label, level, content }) => <AccordionItem>
    <AccordionItemHeading aria-level={ level || 3 }>
        <AccordionItemButton>
            { label }
        </AccordionItemButton>
    </AccordionItemHeading>
    <AccordionItemPanel>
       { content }
    </AccordionItemPanel>
</AccordionItem>;

export default SidebarItem;