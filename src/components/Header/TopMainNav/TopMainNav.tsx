import React, { useReducer, useRef } from 'react';
import { TopHorizontalMenuLight } from '../../Menu/index';
import { dropdownData } from './Dropdown/Button';
import { DropdownButtonAndMenu } from './Dropdown/Button/DropdownButton';
import { TopMainNavAblyLogo } from './TopMainNavIllustration/TopMainNavAblyLogo';
import { SearchBar } from './SearchBar';
import { HorizontalMenuItemGroup } from '../../Menu/HorizontalMenuItemGroup';
import { DOCUMENTATION_PATH } from '../../../../data/transform/constants';
import { initialState, mainNavReducer } from './main-nav-reducer';
import { useFunctionOnOutsideClick } from '../../../hooks/useFunctionOnOutsideClick';
import UserContext from '../../../contexts/user-context';
import { TopMainNavUserMenu } from './TopMainNavUser';
import { TopMainNavStateContext } from './top-main-nav-state-context';

export const TopMainNav = () => {
  const [topMainNavState, dispatch] = useReducer(mainNavReducer, initialState);

  const menuItems: (keyof typeof dropdownData)[] = ['API References', 'Resources'];

  const ref = useRef(null);
  useFunctionOnOutsideClick(() => dispatch({ type: 'deactivateAll' }), ref);

  return (
    <div ref={ref} className="fixed bg-white h-64 z-50 flex w-full border-b border-mid-grey" id="top-main-nav">
      <TopHorizontalMenuLight>
        <HorizontalMenuItemGroup additionalStyles="flex-grow">
          <TopMainNavAblyLogo href={DOCUMENTATION_PATH} />
          <SearchBar />
        </HorizontalMenuItemGroup>
        <HorizontalMenuItemGroup>
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
              </TopMainNavStateContext.Provider>
            )}
          </UserContext.Consumer>
        </HorizontalMenuItemGroup>
      </TopHorizontalMenuLight>
    </div>
  );
};
