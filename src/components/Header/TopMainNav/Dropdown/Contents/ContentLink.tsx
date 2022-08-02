import React from 'react';
import { DropdownContentLink } from './types';

export const ContentLink = ({ href, rel, text }: DropdownContentLink) => (
  // Tailwind 'text-sm' class does not apply
  <a className="font-medium" href={href} rel={rel} style={{ fontSize: '0.875rem', lineHeight: '0.875rem' }}>
    {text}
  </a>
);
