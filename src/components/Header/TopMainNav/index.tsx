import React from 'react';
import { TopHorizontalMenuLight } from '../../Menu/index';
import { Logo } from './TopMainNavIllustration/logo';
import { SearchPlaceholder } from './TopMainNavIllustration/SearchBar';

export const TopMainNav = () => (
  <div className="fixed bg-white h-64">
    <TopHorizontalMenuLight>
      <Logo href="/docs" />
      <SearchPlaceholder />
    </TopHorizontalMenuLight>
  </div>
);
