import React from 'react';
import Icon from '@ably/ui/core/Icon';
import { DropdownContentLink } from '../../../../Dropdown/Contents';

export const MaybeShowHamburgerSummaryLink = ({ summaryLink }: { summaryLink?: DropdownContentLink }) =>
  summaryLink ? (
    <div className="h-full docs-link font-medium">
      <a className="mr-4" href={summaryLink.href}>
        {summaryLink.text}
      </a>
      <Icon name="icon-gui-arrow-right" size="1rem" />
    </div>
  ) : (
    <div></div>
  );
