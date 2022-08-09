import React, { useState } from 'react';
import { TopHorizontalMenuLight } from '../../Menu/index';
import { DropdownButton } from './Dropdown/Button';
import { dropdownData } from './Dropdown/Button/dropdown-data';
import { DropdownMenu } from './Dropdown/dropdown-menu';
import { Logo } from './TopMainNavIllustration/logo';
import { SearchBar } from './SearchBar/SearchBar';
import { DropdownDataIdentifier } from './Dropdown/types';
import { TopMainNavUserMenu } from './TopMainNavUser';
import UserContext from '../../../contexts/user-context';
import { HorizontalMenuItemGroup } from '../../Menu/HorizontalMenuItemGroup';

export const TopMainNav = () => {
  const [dropdownDataID, setDropdownDataID] = useState<DropdownDataIdentifier>(null);
  const setDropdownData = (value: DropdownDataIdentifier) => () => setDropdownDataID(value);
  const clearDropdownData = () => setDropdownDataID(null);
  const menuItems: (keyof typeof dropdownData)[] = ['API References', 'Resources'];
  return (
    <div className="fixed bg-white h-64 z-50 flex w-full border-b border-mid-grey" onMouseLeave={clearDropdownData}>
      <TopHorizontalMenuLight>
        <HorizontalMenuItemGroup>
          <Logo href="/docs" />
          <SearchBar />
        </HorizontalMenuItemGroup>
        <HorizontalMenuItemGroup>
          {menuItems.map((dropdownDataID, i) => (
            <DropdownButton key={i} title={dropdownDataID} setDropdownData={setDropdownData(dropdownDataID)} />
          ))}
          <UserContext.Consumer>
            {({ sessionState }) => (
              <TopMainNavUserMenu sessionState={sessionState} setDropdownData={setDropdownDataID} />
            )}
          </UserContext.Consumer>
        </HorizontalMenuItemGroup>
      </TopHorizontalMenuLight>
      {dropdownDataID && <DropdownMenu {...dropdownData[dropdownDataID]} />}
    </div>
  );
};
