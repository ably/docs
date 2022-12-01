import React from 'react';
import cn from 'classnames';

import { DropdownContentLink } from '../Contents';
import { DropdownDataIdentifier } from '../types';
import { MaybeShowSummaryLink } from './MaybeShowSummaryLink';
import { SummaryTitle } from './SummaryTitle';
import { SummaryDescription } from './SummaryDescription';

import '../../../blocks/external-references/styles.css';
import '../../../blocks/external-references/styles.css';
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
  <div className={cn('max-h-512 w-1/4 flex flex-col bg-extra-light-grey relative', bgEffect)}>
    <SummaryTitle titleText={titleText} />
    <SummaryDescription descriptionText={descriptionText} />
    <MaybeShowSummaryLink summaryLink={summaryLink} />
  </div>
);
