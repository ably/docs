import React, { useState } from 'react';
import { SessionState } from '../../../../contexts/user-context';
import { EXPAND_MENU } from '../../../Sidebar/expand-menu-enum';
import { SidebarDataRetrieval } from '../../../StaticQuerySidebar/SidebarDataRetrieval';
import { DisplayMode, SearchBar } from '../SearchBar';
import { HamburgerHasFooterContext } from './hamburger-has-footer-context';
import { HamburgerButton } from './HamburgerButton';
import { HamburgerDropdownContainer, HamburgerDropdownFooter, HamburgerSidebarRenderer } from './HamburgerDropdown';

export const HamburgerMenu = ({ sessionState }: { sessionState: SessionState }) => {
  const [hasFooter, setHasFooter] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex md:hidden">
      <HamburgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && (
        <HamburgerDropdownContainer id="hamburger-dropdown">
          <HamburgerHasFooterContext.Provider
            value={{ boolean: hasFooter, dispatchBooleanChange: (boolean) => setHasFooter(boolean) }}
          >
            <SearchBar displayMode={DisplayMode.MOBILE} />
            <SidebarDataRetrieval
              className="flex flex-col py-12 px-8 flex-grow flex-basis mx-24"
              expandMenu={EXPAND_MENU.COLLAPSED}
              Component={HamburgerSidebarRenderer}
            />
            {hasFooter && <HamburgerDropdownFooter sessionState={sessionState} />}
          </HamburgerHasFooterContext.Provider>
        </HamburgerDropdownContainer>
      )}
    </div>
  );
};
