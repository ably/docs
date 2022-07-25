import React from 'react';
import { TopHorizontalMenuLight } from '../../Menu/index';
import { Logo } from './TopMainNavIllustration/logo';

export const TopMainNav = () => (
  <div className="fixed bg-white">
    <TopHorizontalMenuLight>
      <Logo href="/docs" />
    </TopHorizontalMenuLight>
  </div>
);
