import React from 'react';
import Icon from '@ably/ui/core/Icon';
import Link from 'src/components/Link';
import { DropdownContentLink } from '../../../../Dropdown/Contents';

export const MaybeShowHamburgerSummaryLink = ({ summaryLink }: { summaryLink?: DropdownContentLink }) =>
  summaryLink ? (
    <div className="h-full ui-link font-medium">
      <Link className="mr-4" href={summaryLink.href}>
        {summaryLink.text}
      </Link>
      <Icon name="icon-gui-arrow-long-right-micro" size="1rem" />
    </div>
  ) : (
    <div></div>
  );
