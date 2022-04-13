import React from 'react';
import PropTypes from 'prop-types';
import {
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemState,
} from 'react-accessible-accordion';
import { ROOT_LEVEL } from './consts';
import AIChevronDown from '../../styles/svg/ai-chevron-down.js';
import AIChevronUp from '../../styles/svg/ai-chevron-up';
import { ChildPropTypes } from '../../react-utilities';

const ExpandableIndicator = ({ expanded, className = '' }) =>
  expanded ? (
    <AIChevronUp className={`flex-shrink-0 ${className}`} />
  ) : (
    <AIChevronDown className={`flex-shrink-0 ${className}`} />
  );

ExpandableIndicator.propTypes = {
  expanded: PropTypes.bool,
  className: PropTypes.string,
};

const AccordionHeadingPropTypes = {
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  level: PropTypes.number,
  interactable: PropTypes.bool,
};

const InteractableAccordionHeading = ({ label, level }) => (
  <div className={`flex justify-between`}>
    {label}
    <AccordionItemHeading aria-level={level || ROOT_LEVEL}>
      <AccordionItemButton>
        <AccordionItemState>
          {({ expanded }) => <ExpandableIndicator className={'h-full mx-8'} expanded={expanded} />}
        </AccordionItemState>
      </AccordionItemButton>
    </AccordionItemHeading>
  </div>
);

InteractableAccordionHeading.propTypes = AccordionHeadingPropTypes;

const NonInteractableAccordionHeading = ({ label, level }) => (
  <AccordionItemHeading aria-level={level || ROOT_LEVEL}>
    <AccordionItemButton className="flex items-center">
      {label}
      <AccordionItemState>{({ expanded }) => <ExpandableIndicator expanded={expanded} />}</AccordionItemState>
    </AccordionItemButton>
  </AccordionItemHeading>
);

NonInteractableAccordionHeading.propTypes = AccordionHeadingPropTypes;

const AccordionHeading = ({ label, level, interactable = false }) =>
  interactable ? (
    <InteractableAccordionHeading label={label} level={level} />
  ) : (
    <NonInteractableAccordionHeading label={label} level={level} />
  );

AccordionHeading.propTypes = AccordionHeadingPropTypes;

const SidebarItem = ({ uuid, label, level, content, interactable = false }) => (
  <AccordionItem uuid={uuid}>
    <AccordionHeading label={label} level={level} interactable={interactable} />
    <AccordionItemPanel>{content}</AccordionItemPanel>
  </AccordionItem>
);

SidebarItem.propTypes = {
  ...AccordionHeadingPropTypes,
  uuid: PropTypes.string,
  content: ChildPropTypes,
};

export default SidebarItem;
