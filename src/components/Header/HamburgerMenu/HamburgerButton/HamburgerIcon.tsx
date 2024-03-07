import React from 'react';

import hamburgerOpen from 'src/images/icons/hamburger-is-open.svg';
import hamburgerClosed from 'src/images/icons/hamburger-is-closed.svg';

const MENU_DESCRIPTION = 'Site navigation menu';

export const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
  <img className="min-w-24" src={isOpen ? hamburgerOpen : hamburgerClosed} alt={MENU_DESCRIPTION} />
);
