import React from 'react';
import { dropdownData } from '../Button/dropdown-data';
import { DropdownContentLink } from '../Contents';
import '../../../../blocks/external-references/styles.css';
import { SummaryLinkIcon } from '.';

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
  <div className="bg-extra-light-grey left-0 max-h-512 w-1/4 flex flex-col shadow-container-avoid-left">
    <strong
      className="uppercase pt-32 px-32"
      style={{ fontSize: '0.875rem', lineHeight: '1.25rem', letterSpacing: '0.1em' }}
    >
      {titleText}
    </strong>
    <p className="px-32 pt-32" style={{ fontSize: '0.875rem', lineHeight: '1.25rem' }}>
      {descriptionText}
    </p>
    {summaryLink ? (
      <div className="h-full px-32 pt-32 docs-link font-medium">
        <a className="mr-4" style={{ fontSize: '0.875rem', lineHeight: '1.25rem' }} href={summaryLink.href}>
          {summaryLink.text}
        </a>
        <SummaryLinkIcon />
      </div>
    ) : (
      <div></div>
    )}
  </div>
);
