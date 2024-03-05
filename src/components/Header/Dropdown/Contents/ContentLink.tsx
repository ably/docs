import React from 'react';
import Link from 'src/components/Link';
import { DropdownContentLink } from './types';
import { ExternalLinkIndicator } from './ExternalLinkIndicator';

export const ContentLink = ({ href, rel, text, external }: DropdownContentLink) => (
  // Tailwind 'text-sm' class does not apply
  <Link
    className="font-medium flex flex-row group-hover:text-gui-default"
    to={href}
    rel={rel}
    style={{ fontSize: '0.875rem', lineHeight: '0.875rem' }}
    tabIndex={-1}
    external={external}
  >
    {text}
    {external && <ExternalLinkIndicator />}
  </Link>
);
