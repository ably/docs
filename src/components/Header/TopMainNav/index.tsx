import React from 'react';
import { TopHorizontalMenuLight } from '../../Menu/index';
import { AblyDocsLogo } from './TopMainNavIllustration/AblyDocsLogo/ably-docs-logo';
import { Logo } from './TopMainNavIllustration/logo';

export const TopMainNav = () => (
  <TopHorizontalMenuLight>
    <Logo href="" />
    <AblyDocsLogo />
  </TopHorizontalMenuLight>
);
