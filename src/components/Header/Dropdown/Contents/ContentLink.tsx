import React from 'react';
import { DropdownContentLink } from './types';
import { ExternalLinkIndicator } from './ExternalLinkIndicator';

export const ContentLink = ({ href, rel, text, external }: DropdownContentLink) => (
  // Tailwind 'text-sm' class does not apply
  <a
    className="font-medium flex flex-row group-hover:text-gui-default"
    href={href}
    rel={rel}
    style={{ fontSize: '0.875rem', lineHeight: '0.875rem' }}
    tabIndex={-1}
  >
    {text}
    {external && <ExternalLinkIndicator />}
  </a>
);
