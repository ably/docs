import React, { useState } from 'react';
import { TopHorizontalMenuLight } from '../../Menu/index';
import { DropdownButton } from './Dropdown/Button';
import { dropdownData } from './Dropdown/Button/dropdown-data';
import { DropdownMenu } from './Dropdown/dropdown-menu';
import { Logo } from './TopMainNavIllustration/logo';
import { SearchBar } from './SearchBar';
import { DropdownDataIdentifier } from './Dropdown/types';
import { TopMainNavUserMenu } from './TopMainNavUser';
import UserContext from '../../../contexts/user-context';

export const TopMainNav = () => {
  const [dropdownDataID, setDropdownDataID] = useState<DropdownDataIdentifier>(null);
  const setDropdownData = (value: DropdownDataIdentifier) => () => setDropdownDataID(value);
  const clearDropdownData = () => setDropdownDataID(null);
  const menuItems: (keyof typeof dropdownData)[] = ['API References', 'Resources'];
  return (
    <div className="fixed bg-white h-64 z-50 flex w-full" onMouseLeave={clearDropdownData}>
      <TopHorizontalMenuLight>
        <Logo href="/docs" />
        <SearchBar />
        {menuItems.map((dropdownDataID, i) => (
          <DropdownButton key={i} title={dropdownDataID} setDropdownData={setDropdownData(dropdownDataID)} />
        ))}
        <UserContext.Consumer>
          {({ sessionState }) => <TopMainNavUserMenu sessionState={sessionState} setDropdownData={setDropdownDataID} />}
        </UserContext.Consumer>
      </TopHorizontalMenuLight>
      {dropdownDataID && <DropdownMenu {...dropdownData[dropdownDataID]} />}
    </div>
  );
};
