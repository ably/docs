import React from 'react';
import { ContentDescription } from './ContentDescription';
import { ContentLink } from './ContentLink';
import { Content } from './types';

export const DropdownItemContent = ({ content: { link, description } }: { content: Content }) => (
  <li className="flex flex-col">
    <ContentLink href={link.href} rel={link.rel} text={link.text} />
    <ContentDescription>{description}</ContentDescription>
  </li>
);
