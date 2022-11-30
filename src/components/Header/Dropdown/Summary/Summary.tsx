import React from 'react';
import { DropdownContentLink } from '../Contents';
import '../../../blocks/external-references/styles.css';
import { DropdownDataIdentifier } from '../types';
import { MaybeShowSummaryLink } from './MaybeShowSummaryLink';
import { SummaryTitle } from './SummaryTitle';
import { SummaryDescription } from './SummaryDescription';
import '../../../blocks/external-references/styles.css';

export const Summary = ({
  titleText,
  descriptionText,
  summaryLink,
}: {
  titleText: DropdownDataIdentifier;
  descriptionText: string;
  summaryLink?: DropdownContentLink;
}) => (
  <div className="bg-extra-light-grey left-0 max-h-512 w-1/4 flex flex-col shadow-container-avoid-left">
    <SummaryTitle titleText={titleText} />
    <SummaryDescription descriptionText={descriptionText} />
    <MaybeShowSummaryLink summaryLink={summaryLink} />
  </div>
);
