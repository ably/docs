import React from 'react';
import { dropdownData } from '../Button/dropdown-data';
import { DropdownContentLink } from '../Contents/types';

export const Summary = ({
  titleText,
  descriptionText,
  summaryLink,
}: {
  titleText: keyof typeof dropdownData;
  descriptionText: string;
  summaryLink?: DropdownContentLink;
}) => (
  /* Tailwind 'text-sm', 'shadow-sm' and 'tracking-widest' classes do not apply */
  <div
    className="bg-extra-light-grey top-64 left-0 h-256 w-1/4 fixed flex flex-col"
    style={{ boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}
  >
    <strong
      className="uppercase pt-32 px-32"
      style={{ fontSize: '0.875rem', lineHeight: '1.25rem', letterSpacing: '0.1em' }}
    >
      {titleText}
    </strong>
    <p className="px-32 pt-32" style={{ fontSize: '0.875rem', lineHeight: '1.25rem' }}>
      {descriptionText}
    </p>
    {summaryLink ? <a href={summaryLink.href}>{summaryLink.text}</a> : <div></div>}
  </div>
);
