import React from 'react';
import Link from 'src/components/Link';
import { DropdownContentLink } from './types';
import { ExternalLinkIndicator } from './ExternalLinkIndicator';

export const ContentLink = ({ href, rel, text, external }: DropdownContentLink) => (
  <Link
    className="ui-text-p2 flex flex-row items-center group-hover:text-gui-default"
    to={href}
    rel={rel}
    tabIndex={-1}
    external={external}
  >
    {text}
    {external && <ExternalLinkIndicator />}
  </Link>
);
