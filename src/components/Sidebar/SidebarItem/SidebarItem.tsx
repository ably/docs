import React, { ReactElement } from 'react';
import { AccordionItem, AccordionItemPanel } from 'react-accessible-accordion';
import { ExpandableAccordionHeading } from './ExpandableAccordionHeading';
import { NonExpandableHeading } from './NonExpandableHeading';

type AccordionHeadingProps = {
  label: React.ReactNode;
  level: number;
  expandable?: boolean;
  collapsible?: boolean;
};

const AccordionHeading = ({ label, level, expandable = true, collapsible = true }: AccordionHeadingProps) =>
  expandable && collapsible ? (
    <ExpandableAccordionHeading label={label} level={level} />
  ) : (
    <NonExpandableHeading label={label} level={level} />
  );

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
}: SidebarItemProps) => (
  <AccordionItem uuid={uuid}>
    <AccordionHeading label={label} level={level} expandable={expandable} collapsible={collapsible} />
    <AccordionItemPanel>{content}</AccordionItemPanel>
  </AccordionItem>
);
