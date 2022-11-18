import React, { ReactElement } from 'react';
import { AccordionItem, AccordionItemPanel } from 'react-accessible-accordion';
import { ExpandableAccordionHeading, AccordionHeadingProps } from './ExpandableAccordionHeading';
import { NonExpandableHeading } from './NonExpandableHeading';

const AccordionHeading = ({ label, level, expandable = true, collapsible = true }: AccordionHeadingProps) => {
  return expandable && collapsible ? (
    <ExpandableAccordionHeading label={label} level={level} />
  ) : (
    <NonExpandableHeading label={label} level={level} />
  );
};

type SidebarItemProps = AccordionHeadingProps & {
  uuid: string;
  content: ReactElement;
};

export const SidebarItem = ({
  uuid,
  label,
  level,
  content,
  expandable = true,
  collapsible = true,
}: SidebarItemProps) => {
  return (
    <AccordionItem uuid={uuid}>
      <AccordionHeading label={label} level={level} expandable={expandable} collapsible={collapsible} />
      <AccordionItemPanel>{content}</AccordionItemPanel>
    </AccordionItem>
  );
};
