import React from 'react';
import { DropdownData } from '../../../../Dropdown';
import { DispatchExpandedMenu } from '../hamburger-expanded-menu-context';
import { HamburgerSidebarItemContainer } from '../HamburgerSidebarItemContainer';
import { HamburgerSidebarDropdownContents } from './HamburgerSidebarDropdownContents';

export const HamburgerSidebarDropdownButton = ({
  handleMenuExpansion,
  label,
  closed,
  content,
}: {
  handleMenuExpansion: DispatchExpandedMenu;
  label: string;
  closed?: boolean;
  content: DropdownData;
}) => {
  return closed ? (
    <HamburgerSidebarItemContainer>
      <h4
        className="cursor-pointer max-w-full mr-24 flex flex-grow justify-between text-16"
        onClick={() => handleMenuExpansion(label)}
        tabIndex={0}
      >
        <span>{label}</span>
        <img className="transform rotate-270" src="/images/icons/chevron-down.svg" />
      </h4>
    </HamburgerSidebarItemContainer>
  ) : (
    <HamburgerSidebarDropdownContents handleMenuExpansion={handleMenuExpansion} {...content} />
  );
};
