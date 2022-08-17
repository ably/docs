import React, { useState } from 'react';
import { SessionState } from '../../../../contexts/user-context';
import { EXPAND_MENU } from '../../../Sidebar/expand-menu-enum';
import { SidebarDataRetrieval } from '../../../StaticQuerySidebar/SidebarDataRetrieval';
import { displayModes, SearchBar } from '../SearchBar';
import { HamburgerButton } from './HamburgerButton';
import { HamburgerDropdownContainer, HamburgerDropdownFooter, HamburgerSidebarRenderer } from './HamburgerDropdown';

export const HamburgerMenu = ({ sessionState }: { sessionState: SessionState }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="flex md:hidden">
      <HamburgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && (
        <HamburgerDropdownContainer id="hamburger-dropdown">
          <SearchBar displayMode={displayModes.MOBILE} />
          <SidebarDataRetrieval
            className="flex flex-col py-12 px-8 flex-grow flex-basis mx-24"
            expandMenu={EXPAND_MENU.COLLAPSED}
            Component={HamburgerSidebarRenderer}
          />
          <HamburgerDropdownFooter sessionState={sessionState} />
        </HamburgerDropdownContainer>
      )}
    </div>
  );
};
