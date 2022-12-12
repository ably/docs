import React from 'react';
import { DropdownDataIdentifier } from '../types';

export const SummaryTitle = ({ titleText }: { titleText: DropdownDataIdentifier }) => (
  <strong
    className="uppercase pt-32 px-32 relative z-1"
    style={{ fontSize: '0.875rem', lineHeight: '1.25rem', letterSpacing: '0.1em' }}
  >
    {titleText}
  </strong>
);
