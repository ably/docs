import React from 'react';
import { AccordionItem, AccordionItemPanel } from 'react-accessible-accordion';
import { ExpandableAccordionHeading } from './ExpandableAccordionHeading';
import { NonExpandableHeading } from './NonExpandableHeading';

type AccordionHeadingProps = {
  label: React.ReactNode;
  level: number;
  expandable?: boolean;
};

const AccordionHeading = ({ label, level, expandable = true }: AccordionHeadingProps) =>
  expandable ? (
    <ExpandableAccordionHeading label={label} level={level} />
  ) : (
    <NonExpandableHeading label={label} level={level} />
  );

type SidebarItemProps = AccordionHeadingProps & {
  uuid: string;
  content: React.ReactNode[];
};

export const SidebarItem = ({ uuid, label, level, content, expandable = true }: SidebarItemProps) => (
  <AccordionItem uuid={uuid}>
    <AccordionHeading label={label} level={level} expandable={expandable} />
    <AccordionItemPanel>{content}</AccordionItemPanel>
  </AccordionItem>
);
