import React from 'react';
import FeaturedLink from '@ably/ui/core/FeaturedLink';
import { DropdownContentLink } from '../Contents';

export const MaybeShowSummaryLink = ({ summaryLink }: { summaryLink?: DropdownContentLink }) =>
  summaryLink ? (
    <div className="h-full px-32 pt-32 relative z-1">
      <FeaturedLink url={summaryLink.href}>
        <span className="text-gui-default text-menu2 font-medium">{summaryLink.text}</span>
      </FeaturedLink>
    </div>
  ) : (
    <div></div>
  );
