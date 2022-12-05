import React from 'react';
import { DispatchBooleanChange } from '../../../../../../contexts/boolean-state-context';
import { DropdownData } from '../../../../Dropdown';
import { DispatchExpandedMenu } from '../hamburger-expanded-menu-context';
import { BackButton } from './BackButton';
import { HamburgerSidebarDropdownContents } from './HamburgerSidebarDropdownContents';
import { HamburgerSidebarDropdownSummary } from './HamburgerSidebarDropdownSummary';

type HamburgerSidebarDropdownMenuFunctionProps = {
  handleMenuExpansion: DispatchExpandedMenu;
  showFooter: DispatchBooleanChange;
};

export const HamburgerSidebarDropdownMenu = ({
  summaryTitle,
  summaryDescription,
  summaryLink,
  contents,
  title,
  handleMenuExpansion,
  showFooter,
}: DropdownData & HamburgerSidebarDropdownMenuFunctionProps) => (
  <menu className="p-0">
    <BackButton
      toggle={() => {
        handleMenuExpansion(summaryTitle);
        showFooter(true);
      }}
    />
    <HamburgerSidebarDropdownSummary
      titleText={summaryTitle}
      descriptionText={summaryDescription}
      summaryLink={summaryLink}
    />
    <HamburgerSidebarDropdownContents title={title} contents={contents} />
  </menu>
);
