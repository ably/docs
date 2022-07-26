import React from 'react';
import { TopHorizontalMenuLight } from '../../Menu/index';
import { Summary } from './TopMainNavIllustration/Dropdown/Summary';
import { Logo } from './TopMainNavIllustration/logo';
import { SearchPlaceholder } from './TopMainNavIllustration/SearchBar';

export const TopMainNav = () => (
  <div className="fixed bg-white h-64 z-50">
    <TopHorizontalMenuLight>
      <Logo href="/docs" />
      <SearchPlaceholder />
      <Summary titleText="Example" descriptionText="More example" />
    </TopHorizontalMenuLight>
  </div>
);
