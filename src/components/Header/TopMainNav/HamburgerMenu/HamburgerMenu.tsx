import React, { useState } from 'react';
import { SessionState } from '../../../../contexts/user-context';
import { SidebarDataRetrieval } from '../../../StaticQuerySidebar/SidebarDataRetrieval';
import { DropdownDataIdentifier } from '../Dropdown';
import { displayModes, SearchBar } from '../SearchBar';
import { HamburgerButton } from './HamburgerButton';
import { HamburgerDropdownContainer } from './HamburgerDropdown/HamburgerDropdownContainer';
import { HamburgerSidebarRenderer } from './HamburgerDropdown/HamburgerSidebarRenderer/HamburgerSidebarRenderer';

export const HamburgerMenu = ({
  sessionState,
  dropdownDataID,
  setDropdownData,
  clearDropdownData,
}: {
  sessionState: SessionState;
  dropdownDataID: DropdownDataIdentifier;
  setDropdownData: (value: DropdownDataIdentifier) => () => void;
  clearDropdownData: () => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="flex md:hidden">
      <HamburgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && (
        <HamburgerDropdownContainer id="hamburger-dropdown">
          <SearchBar displayMode={displayModes.MOBILE} />
          <SidebarDataRetrieval className="flex flex-grow" Component={HamburgerSidebarRenderer} />
        </HamburgerDropdownContainer>
      )}
    </div>
  );
};
