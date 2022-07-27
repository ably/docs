import React from 'react';
import { DropdownContentLink } from './types';

export const ContentLink = ({ href, rel, text }: DropdownContentLink) => (
  <a href={href} rel={rel}>
    {text}
  </a>
);
