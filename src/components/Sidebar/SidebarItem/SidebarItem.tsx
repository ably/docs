import React, { ReactElement } from 'react';
import { AccordionItem, AccordionItemPanel } from 'react-accessible-accordion';
import { ExpandableAccordionHeading, AccordionHeadingProps } from './ExpandableAccordionHeading';
import { NonExpandableHeading } from './NonExpandableHeading';
import { TutorialSidebarItem } from './TutorialSidebarItem';

const AccordionHeading = ({ label, level, expandable = true, collapsible = true }: AccordionHeadingProps) => {
  return expandable && collapsible ? (
    <ExpandableAccordionHeading label={label} level={level} />
  ) : (
    <NonExpandableHeading label={label} level={level} />
  );
};

export const SidebarItem = ({
  uuid,
  label,
  level,
  content,
  expandable = true,
  collapsible = true,
  isTutorial = false,
}: AccordionHeadingProps & {
  uuid: string;
  content: ReactElement;
}) => {
  console.log(content);
  return (
    <>
      {isTutorial ? (
        <TutorialSidebarItem label={label} content={content} />
      ) : (
        <AccordionItem uuid={uuid}>
          <AccordionHeading
            label={label}
            level={level}
            expandable={expandable}
            collapsible={collapsible}
            isTutorial={isTutorial}
          />
          <AccordionItemPanel>{content}</AccordionItemPanel>
        </AccordionItem>
      )}
    </>
  );
};
