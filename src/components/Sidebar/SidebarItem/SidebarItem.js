import React from 'react';
import PropTypes from 'prop-types';
import { AccordionItem, AccordionItemPanel } from 'react-accessible-accordion';
import { ChildPropTypes } from '../../../react-utilities';
import { ExpandableAccordionHeading } from './ExpandableAccordionHeading';
import { NonExpandableHeading } from './NonExpandableHeading';

const AccordionHeadingPropTypes = {
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  level: PropTypes.number,
  expandable: PropTypes.bool,
};

const AccordionHeading = ({ label, level, expandable = true }) =>
  expandable ? (
    <ExpandableAccordionHeading label={label} level={level} />
  ) : (
    <NonExpandableHeading label={label} level={level} />
  );

AccordionHeading.propTypes = AccordionHeadingPropTypes;

export const SidebarItem = ({ uuid, label, level, content, expandable = true }) => (
  <AccordionItem uuid={uuid}>
    <AccordionHeading label={label} level={level} expandable={expandable} />
    <AccordionItemPanel>{content}</AccordionItemPanel>
  </AccordionItem>
);

SidebarItem.propTypes = {
  ...AccordionHeadingPropTypes,
  uuid: PropTypes.string,
  content: ChildPropTypes,
};
