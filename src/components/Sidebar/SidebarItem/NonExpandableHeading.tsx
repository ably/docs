import React from 'react';
import { ROOT_LEVEL } from '../consts';
import { AccordionHeadingProps } from './accordion-heading-props';

export const NonExpandableHeading = ({ label, level }: AccordionHeadingProps) => (
  <div aria-level={level || ROOT_LEVEL}>{label}</div>
);
