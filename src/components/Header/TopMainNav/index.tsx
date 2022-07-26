import React from 'react';
import { TopHorizontalMenuLight } from '../../Menu/index';
import { dropdownData } from './TopMainNavIllustration/Dropdown/Button/dropdown-data';
import { DropdownMenu } from './TopMainNavIllustration/Dropdown/dropdown-menu';
import { Logo } from './TopMainNavIllustration/logo';
import { SearchPlaceholder } from './TopMainNavIllustration/SearchBar';

export const TopMainNav = () => (
  <div className="fixed bg-white h-64 z-50">
    <TopHorizontalMenuLight>
      <Logo href="/docs" />
      <SearchPlaceholder />
      <DropdownMenu {...dropdownData['API References']} />
    </TopHorizontalMenuLight>
  </div>
);
