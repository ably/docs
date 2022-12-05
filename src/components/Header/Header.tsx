import React, { useReducer, useRef } from 'react';

import { DropdownButtonAndMenu } from './Dropdown/Button/DropdownButton';
import { dropdownData } from './Dropdown/Button';
import { initialState, mainNavReducer } from './main-nav-reducer';
import { useOnClickOutside } from 'src/hooks';
import { TopMainNavAblyLogo } from './TopMainNavIllustration/TopMainNavAblyLogo';
import { DisplayMode, SearchBar } from './SearchBar';
import { TopMainNavUserMenu } from './TopMainNavUser';
import UserContext from '../../contexts/user-context';
import { DOCUMENTATION_PATH } from '../../../data/transform/constants';
import { HamburgerMenu } from './HamburgerMenu';
import { TopMainNavStateContext } from './top-main-nav-state-context';
import { HorizontalMenu, HorizontalMenuVariant } from 'src/components/HorizontalMenu';

export const Header = () => {
  const [topMainNavState, dispatch] = useReducer(mainNavReducer, initialState);
  const menuItems: (keyof typeof dropdownData)[] = ['API References', 'Resources'];
  const ref = useRef(null);

  useOnClickOutside(() => dispatch({ type: 'deactivateAll' }), ref);

  return (
    <header
      ref={ref}
      className="sticky top-0 bg-white h-64 z-50 flex w-full border-b border-mid-grey"
      id="top-main-nav"
    >
      <HorizontalMenu variant={HorizontalMenuVariant.light}>
        <div className="flex items-center">
          <TopMainNavAblyLogo href={DOCUMENTATION_PATH} />
          <SearchBar displayMode={DisplayMode.FULL_SCREEN} />
        </div>
        <div className="flex flex-row md:min-w-610">
          {menuItems.map((buttonDropdownDataID, i) => (
            <DropdownButtonAndMenu
              key={i}
              dropdownDataID={buttonDropdownDataID}
              isOpen={topMainNavState[buttonDropdownDataID].isOpen}
              onActivated={(id) => dispatch({ type: 'activate', dropdownId: id })}
              onMouseOver={(dataId) => dispatch({ type: 'mouse-over', dropdownId: dataId })}
              onMouseOut={(dataId) => dispatch({ type: 'mouse-out', dropdownId: dataId })}
            />
          ))}
          <UserContext.Consumer>
            {({ sessionState }) => (
              <TopMainNavStateContext.Provider value={{ topMainNavState: topMainNavState, dispatch }}>
                <TopMainNavUserMenu sessionState={sessionState} />
                <HamburgerMenu sessionState={sessionState} />
              </TopMainNavStateContext.Provider>
            )}
          </UserContext.Consumer>
        </div>
      </HorizontalMenu>
    </header>
  );
};
