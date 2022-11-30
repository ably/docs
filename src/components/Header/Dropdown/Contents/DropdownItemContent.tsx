import React from 'react';
import { ContentDescription } from './ContentDescription';
import { ContentLink } from './ContentLink';
import { Content } from './types';

export const DropdownItemContent = ({ content: { link, description } }: { content: Content }) => (
  <li
    className="flex flex-col hover:bg-light-grey p-8 mr-16 -ml-8 rounded-md cursor-pointer group"
    onClick={() => (window.location.href = link.href)}
    onKeyDown={(event) => event.key === 'Enter' && (window.location.href = link.href)}
    tabIndex={0}
  >
    <ContentLink href={link.href} rel={link.rel} text={link.text} external={link.external} />
    <ContentDescription>{description}</ContentDescription>
  </li>
);
