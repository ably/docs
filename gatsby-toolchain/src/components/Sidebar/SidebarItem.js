import React from 'react';
import { AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel, AccordionItemState } from 'react-accessible-accordion';
import { ROOT_LEVEL } from './consts';
import AIChevronDown from '../../styles/svg/ai-chevron-down.js';
import AIChevronUp from '../../styles/svg/ai-chevron-up';

const InteractableAccordionHeading = ({ label, level }) =>
<div className={`flex justify-between`}>
    { label }
    <AccordionItemHeading aria-level={ level || ROOT_LEVEL }>
        <AccordionItemButton>
            <AccordionItemState>
                {
                    ({ expanded }) => expanded ? <AIChevronUp /> : <AIChevronDown />
                }
            </AccordionItemState>
        </AccordionItemButton>
    </AccordionItemHeading>
</div>;

const NonInteractableAccordionHeading = ({ label, level }) =>
<AccordionItemHeading aria-level={ level || ROOT_LEVEL }>
    <AccordionItemButton>
        { label }
    </AccordionItemButton>
</AccordionItemHeading>;

const AccordionHeading = ({ label, level, interactable = false }) => interactable ?
    <InteractableAccordionHeading label={label} level={level} /> :
    <NonInteractableAccordionHeading label={label} level={level} />;

const SidebarItem = ({ uuid, label, level, content, interactable = false }) => <AccordionItem uuid={uuid}>
    <AccordionHeading label={label} level={level} interactable={interactable} />
    <AccordionItemPanel>
       { content }
    </AccordionItemPanel>
</AccordionItem>;

export default SidebarItem;