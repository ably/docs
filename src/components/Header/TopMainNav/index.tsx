import React, { useState } from 'react';
import { keys } from 'lodash/fp';
import { TopHorizontalMenuLight } from '../../Menu/index';
import { DropdownButton } from './TopMainNavIllustration/Dropdown/Button';
import { dropdownData } from './TopMainNavIllustration/Dropdown/Button/dropdown-data';
import { DropdownMenu } from './TopMainNavIllustration/Dropdown/dropdown-menu';
import { Logo } from './TopMainNavIllustration/logo';
import { SearchPlaceholder } from './TopMainNavIllustration/SearchBar';
import { DropdownDataIdentifier } from './TopMainNavIllustration/Dropdown/types';

export const TopMainNav = () => {
  const [dropdownDataID, setDropdownDataID] = useState<DropdownDataIdentifier>(null);
  const setDropdownData = (value: DropdownDataIdentifier) => () => setDropdownDataID(value);
  const clearDropdownData = () => setDropdownDataID(null);
  const titlesFromDropdownData = keys(dropdownData) as Array<keyof typeof dropdownData>;
  return (
    <div className="fixed bg-white h-64 z-50" onMouseLeave={() => setDropdownDataID(null)}>
      <TopHorizontalMenuLight>
        <Logo href="/docs" />
        <SearchPlaceholder />
        {titlesFromDropdownData.map((dropdownDataID, i) => (
          <DropdownButton
            key={i}
            title={dropdownDataID}
            setDropdownData={setDropdownData(dropdownDataID)}
            clearDropdownData={clearDropdownData}
          />
        ))}
        {dropdownDataID && <DropdownMenu {...dropdownData[dropdownDataID]} />}
      </TopHorizontalMenuLight>
    </div>
  );
};
