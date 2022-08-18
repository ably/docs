import React from 'react';
import { DropdownData } from '../../../../Dropdown';
import { DispatchExpandedMenu } from '../hamburger-expanded-menu-context';
import { BackButton } from './BackButton';
import { HamburgerSidebarDropdownContents } from './HamburgerSidebarDropdownContents';
import { HamburgerSidebarSummary } from './HamburgerSidebarSummary';

export const HamburgerSidebarDropdownMenu = ({
  summaryTitle,
  summaryDescription,
  summaryLink,
  contents,
  title,
  handleMenuExpansion,
}: DropdownData & { handleMenuExpansion: DispatchExpandedMenu }) => (
  <menu className="p-0">
    <BackButton onClick={() => handleMenuExpansion(summaryTitle)} />
    <HamburgerSidebarSummary titleText={summaryTitle} descriptionText={summaryDescription} summaryLink={summaryLink} />
    <HamburgerSidebarDropdownContents title={title} contents={contents} />
  </menu>
);
