import React from 'react';
import { DropdownDataIdentifier } from '../../../../Dropdown';
import { DropdownContentLink } from '../../../../Dropdown/Contents';
import { MaybeShowHamburgerSummaryLink } from './MaybeShowHamburgerSummaryLink';

export const HamburgerSidebarDropdownSummary = ({
  titleText,
  descriptionText,
  summaryLink,
}: {
  titleText: DropdownDataIdentifier;
  descriptionText: string;
  summaryLink?: DropdownContentLink;
}) => (
  <div className="bg-extra-light-grey flex flex-col py-32 px-24">
    <h3 className="pb-24 ui-text-h3">{titleText}</h3>
    <p className="pb-24 font-light">{descriptionText}</p>
    <MaybeShowHamburgerSummaryLink summaryLink={summaryLink} />
  </div>
);
