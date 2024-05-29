import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { AccordionItemButton, AccordionItemHeading, AccordionItemState } from 'react-accessible-accordion';

import { ROOT_LEVEL } from '../consts';
import { ExpandableIndicator } from '../ExpandableIndicator';

import { expanded } from './ExpandableAccordionHeading.module.css';

export type AccordionHeadingProps = {
  label: React.ReactNode;
  level: number;
  expandable?: boolean;
  collapsible?: boolean;
};

const Indicator = ({
  expanded,
  setIsExpanded,
}: {
  expanded?: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    setIsExpanded(!!expanded);
  }, [expanded, setIsExpanded]);

  return <ExpandableIndicator expanded={expanded} />;
};

export const ExpandableAccordionHeading = ({ label, level }: AccordionHeadingProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <AccordionItemHeading aria-level={level || ROOT_LEVEL}>
      <AccordionItemButton
        className={cn('flex items-center justify-between', {
          [expanded]: isExpanded,
        })}
      >
        {label}
        <AccordionItemState>
          {({ expanded }) => <Indicator expanded={expanded} setIsExpanded={setIsExpanded} />}
        </AccordionItemState>
      </AccordionItemButton>
    </AccordionItemHeading>
  );
};
