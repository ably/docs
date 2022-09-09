import React from 'react';
import { DropdownContentLink } from '../Contents';
import { SummaryLinkIcon } from './SummaryLinkIcon';

export const MaybeShowSummaryLink = ({ summaryLink }: { summaryLink?: DropdownContentLink }) =>
  summaryLink ? (
    <div className="h-full px-32 pt-32 docs-link font-medium">
      <a className="mr-4" style={{ fontSize: '0.875rem', lineHeight: '1.25rem' }} href={summaryLink.href}>
        {summaryLink.text}
      </a>
      <SummaryLinkIcon />
    </div>
  ) : (
    <div></div>
  );
