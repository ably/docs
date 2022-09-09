import React from 'react';
import { SidebarData } from '../../../../../../Sidebar/sidebar-data';
import { DropdownData } from '../../../../Dropdown';
import { HamburgerExpandedMenuContext } from '../hamburger-expanded-menu-context';
import { HamburgerSidebarDropdownButton } from './HamburgerSidebarDropdownButton';

export const HamburgerSidebarDropdownPopulatedItem = (props: SidebarData) => {
  const dropdownData = props.dropdownData as DropdownData;
  const { label, closed } = props;
  return (
    <HamburgerExpandedMenuContext.Consumer>
      {({ handleMenuExpansion }) => (
        <div className="font-medium list-none">
          <HamburgerSidebarDropdownButton
            handleMenuExpansion={handleMenuExpansion}
            label={label}
            closed={closed}
            content={dropdownData}
          />
        </div>
      )}
    </HamburgerExpandedMenuContext.Consumer>
  );
};
