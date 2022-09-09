import React from 'react';
import { DropdownContentLink } from '../../../../Dropdown/Contents';
import { SummaryLinkIcon } from '../../../../Dropdown/Summary';

export const MaybeShowHamburgerSummaryLink = ({ summaryLink }: { summaryLink?: DropdownContentLink }) =>
  summaryLink ? (
    <div className="h-full docs-link font-medium">
      <a className="mr-4" href={summaryLink.href}>
        {summaryLink.text}
      </a>
      <SummaryLinkIcon />
    </div>
  ) : (
    <div></div>
  );
