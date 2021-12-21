import React from 'react';
import { AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';
import { ROOT_LEVEL } from './consts';

const SidebarItem = ({ label, level, content }) => <AccordionItem>
    <AccordionItemHeading aria-level={ level || ROOT_LEVEL }>
        <AccordionItemButton>
            { label }
        </AccordionItemButton>
    </AccordionItemHeading>
    <AccordionItemPanel>
       { content }
    </AccordionItemPanel>
</AccordionItem>;

export default SidebarItem;