import React from 'react';
import { StaticImage } from 'src/components/StaticImage';
import { DropdownData } from '../../../../Dropdown';
import { HamburgerHasFooterContext } from '../../../hamburger-has-footer-context';
import { DispatchExpandedMenu } from '../hamburger-expanded-menu-context';
import { HamburgerSidebarItemContainer } from '../HamburgerSidebarItemContainer';
import { HamburgerSidebarDropdownMenu } from './HamburgerSidebarDropdownMenu';

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
  return (
    <HamburgerHasFooterContext.Consumer>
      {({ dispatchBooleanChange }) =>
        closed ? (
          <HamburgerSidebarItemContainer>
            <h4
              className="cursor-pointer max-w-full flex flex-grow justify-between text-16 focus-within:outline-none focus-within:text-gui-focus"
              onClick={() => {
                handleMenuExpansion(label);
                dispatchBooleanChange(false);
              }}
              onKeyDown={({ key }) => key === 'Enter' && handleMenuExpansion(label)}
              tabIndex={0}
            >
              <span>{label}</span>
              <StaticImage className="transform rotate-270" src="/images/icons/chevron-down.svg" />
            </h4>
          </HamburgerSidebarItemContainer>
        ) : (
          <HamburgerSidebarDropdownMenu
            handleMenuExpansion={handleMenuExpansion}
            showFooter={dispatchBooleanChange}
            {...content}
          />
        )
      }
    </HamburgerHasFooterContext.Consumer>
  );
};
