import React from 'react';
import { dropdownData } from '../Button/dropdown-data';

export const Summary = ({
  titleText,
  descriptionText,
  summaryLink,
}: {
  titleText: keyof typeof dropdownData;
  descriptionText: string;
  summaryLink?: { href: string; text: string };
}) => (
  <div className="bg-extra-light-grey top-64 left-0 h-256 w-1/4 fixed flex flex-col">
    {/* Tailwind 'text-sm' and 'tracking-widest' classes are overwritten by other styles */}
    <strong
      className="uppercase pt-32 px-32 h-8"
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
