import React from 'react';
import cn from '@ably/ui/core/utils/cn';

import { DropdownContentLink } from '../Contents';
import { DropdownDataIdentifier } from '../types';
import { MaybeShowSummaryLink } from './MaybeShowSummaryLink';
import { SummaryTitle } from './SummaryTitle';
import { SummaryDescription } from './SummaryDescription';

import { bgEffect } from './Summary.module.css';

export const Summary = ({
  titleText,
  descriptionText,
  summaryLink,
}: {
  titleText: DropdownDataIdentifier;
  descriptionText: string;
  summaryLink?: DropdownContentLink;
}) => (
  <div className={cn('max-h-512 flex flex-col bg-extra-light-grey relative', bgEffect)}>
    <SummaryTitle titleText={titleText} />
    <SummaryDescription descriptionText={descriptionText} />
    <MaybeShowSummaryLink summaryLink={summaryLink} />
  </div>
);
