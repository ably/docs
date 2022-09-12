import React from 'react';
import { AccordionItemButton, AccordionItemHeading, AccordionItemState } from 'react-accessible-accordion';
import { ROOT_LEVEL } from '../consts';
import { ExpandableIndicator } from '../ExpandableIndicator';
import { AccordionHeadingProps } from './accordion-heading-props';

export const ExpandableAccordionHeading = ({ label, level }: AccordionHeadingProps) => (
  <AccordionItemHeading aria-level={level || ROOT_LEVEL}>
    <AccordionItemButton className="flex items-center justify-between">
      {label}
      <AccordionItemState>{({ expanded }) => <ExpandableIndicator expanded={expanded} />}</AccordionItemState>
    </AccordionItemButton>
  </AccordionItemHeading>
);
