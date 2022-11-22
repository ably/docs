import React from 'react';
import cn from 'classnames';
import Icon from '@ably/ui/core/Icon';
import FeaturedLink from '@ably/ui/core/FeaturedLink';
import { DropdownContentLink } from '../Contents';

import { container, arrow } from './MaybeShowSummaryLink.module.css';

export const MaybeShowSummaryLink = ({ summaryLink }: { summaryLink?: DropdownContentLink }) =>
  summaryLink ? (
    <div className="h-full px-32 pt-32">
      <FeaturedLink url={summaryLink.href}>
        <span className="text-gui-default text-menu2 font-medium">{summaryLink.text}</span>
      </FeaturedLink>
    </div>
  ) : (
    <div></div>
  );
