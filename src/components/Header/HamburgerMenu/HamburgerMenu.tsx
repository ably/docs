import React, { useState } from 'react';
import { EXPAND_MENU, SidebarName } from 'src/components';
import { SessionState } from '../../../contexts/user-context';
import { SidebarDataRetrieval } from '../../StaticQuerySidebar/SidebarDataRetrieval';
import { DisplayMode, SearchBar } from '../SearchBar';
import { HamburgerHasFooterContext } from './hamburger-has-footer-context';
import { HamburgerButton } from './HamburgerButton';
import { HamburgerDropdownFooter, HamburgerSidebarRenderer } from './HamburgerDropdown';
import { hamburgerMenu } from './HamburgerMenu.module.css';

export { type HamburgerMenuProps } from './HamburgerDropdown';

export const HamburgerMenu = ({
  sessionState,
  sidebarName,
}: {
  sessionState: SessionState;
  sidebarName: SidebarName;
}) => {
  const [hasFooter, setHasFooter] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex md:hidden">
      <HamburgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && (
        <div
          id="hamburger-dropdown"
          className="fixed top-64 w-full max-w-full flex-grow right-0 bg-white shadow-container box-border"
        >
          <HamburgerHasFooterContext.Provider
            value={{ boolean: hasFooter, dispatchBooleanChange: (bool: boolean) => setHasFooter(bool) }}
          >
            <SearchBar displayMode={DisplayMode.MOBILE} />
            <div className={hamburgerMenu}>
              <SidebarDataRetrieval
                className="flex flex-col py-12 px-8 flex-grow flex-basis mx-24"
                expandMenu={EXPAND_MENU.COLLAPSED}
                Component={HamburgerSidebarRenderer}
                sidebarName={sidebarName}
              />
            </div>
            {hasFooter && <HamburgerDropdownFooter sessionState={sessionState} />}
          </HamburgerHasFooterContext.Provider>
        </div>
      )}
    </div>
  );
};
