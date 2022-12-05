import React from 'react';
import { TopMainNavLink } from './TopMainNavLink';

export const MobileSignedOut = () => (
  <menu className="flex list-none md:hidden items-center right-0">
    <TopMainNavLink href="/login" dataId="meganav-link">
      Login
    </TopMainNavLink>
  </menu>
);
