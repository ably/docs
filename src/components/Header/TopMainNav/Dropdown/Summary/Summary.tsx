import React from 'react';
import { DropdownContentLink } from '../Contents';
import '../../../../blocks/external-references/styles.css';
import { DropdownDataIdentifier } from '../types';
import { MaybeShowSummaryLink } from './MaybeShowSummaryLink';
import { SummaryTitle } from './SummaryTitle';
import { SummaryDescription } from './SummaryDescription';

export const Summary = ({
  titleText,
  descriptionText,
  summaryLink,
}: {
  titleText: DropdownDataIdentifier;
  descriptionText: string;
  summaryLink?: DropdownContentLink;
}) => (
  <div className="bg-extra-light-grey top-64 left-0 h-256 w-1/4 fixed flex flex-col shadow-container-avoid-left">
    <SummaryTitle titleText={titleText} />
    <SummaryDescription descriptionText={descriptionText} />
    <MaybeShowSummaryLink summaryLink={summaryLink} />
  </div>
);
