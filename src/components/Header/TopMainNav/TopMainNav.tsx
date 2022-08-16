import React, { useState } from 'react';
import { TopHorizontalMenuLight } from '../../Menu/index';
import { DropdownButton, dropdownData } from './Dropdown/Button';
import { DropdownMenu, DropdownDataIdentifier } from './Dropdown';
import { TopMainNavAblyLogo } from './TopMainNavIllustration/TopMainNavAblyLogo';
import { displayModes, SearchBar } from './SearchBar';
import { TopMainNavUserMenu } from './TopMainNavUser';
import UserContext from '../../../contexts/user-context';
import { HorizontalMenuItemGroup } from '../../Menu/HorizontalMenuItemGroup';
import { DOCUMENTATION_PATH } from '../../../../data/transform/constants';
import { HamburgerMenu } from './HamburgerMenu/HamburgerMenu';

export const TopMainNav = () => {
  const [dropdownDataID, setDropdownDataID] = useState<DropdownDataIdentifier>(null);
  const setDropdownData = (value: DropdownDataIdentifier) => () => setDropdownDataID(value);
  const clearDropdownData = () => setDropdownDataID(null);
  const menuItems: (keyof typeof dropdownData)[] = ['API References', 'Resources'];
  return (
    <div className="fixed bg-white h-64 z-50 flex w-full border-b border-mid-grey" onMouseLeave={clearDropdownData}>
      <TopHorizontalMenuLight>
        <HorizontalMenuItemGroup>
          <TopMainNavAblyLogo href={DOCUMENTATION_PATH} />
          <SearchBar displayMode={displayModes.FULL_SCREEN} />
        </HorizontalMenuItemGroup>
        <HorizontalMenuItemGroup>
          {menuItems.map((dropdownDataID, i) => (
            <DropdownButton key={i} title={dropdownDataID} setDropdownData={setDropdownData(dropdownDataID)} />
          ))}
          <UserContext.Consumer>
            {({ sessionState }) => (
              <>
                <TopMainNavUserMenu sessionState={sessionState} setDropdownData={setDropdownDataID} />
                <HamburgerMenu sessionState={sessionState} />
              </>
            )}
          </UserContext.Consumer>
        </HorizontalMenuItemGroup>
      </TopHorizontalMenuLight>
      {dropdownDataID && <DropdownMenu {...dropdownData[dropdownDataID]} />}
    </div>
  );
};
