import React, { useState } from 'react';
import { SessionState } from '../../../contexts/user-context';
import { DisplayMode, SearchBar } from '../SearchBar';
import { HamburgerHasFooterContext } from './hamburger-has-footer-context';
import { HamburgerButton } from './HamburgerButton';
import { HamburgerDropdownFooter } from './HamburgerDropdown';

export const HamburgerMenu = ({ sessionState }: { sessionState: SessionState }) => {
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
            {hasFooter && <HamburgerDropdownFooter sessionState={sessionState} />}
          </HamburgerHasFooterContext.Provider>
        </div>
      )}
    </div>
  );
};
