import React from 'react';
import { DropdownDataIdentifier } from '../types';

export const SummaryTitle = ({ titleText }: { titleText: DropdownDataIdentifier }) => (
  <strong className="uppercase pt-32 mb-16 px-32 relative z-1 text-p3 tracking-widen-0.1 font-bold">{titleText}</strong>
);
