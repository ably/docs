import React from 'react';

const MENU_DESCRIPTION = 'Site navigation menu';

export const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) =>
  isOpen ? (
    <img src="/images/icons/hamburger-is-open.svg" alt={MENU_DESCRIPTION} />
  ) : (
    <img alt={MENU_DESCRIPTION} src="/images/icons/hamburger-is-closed.svg" />
  );
