import React from 'react';
import { StaticImage } from 'src/components/StaticImage';

const MENU_DESCRIPTION = 'Site navigation menu';

export const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) =>
  isOpen ? (
    <StaticImage src={'/images/icons/hamburger-is-open.svg'} alt={MENU_DESCRIPTION} />
  ) : (
    <StaticImage alt={MENU_DESCRIPTION} src="/images/icons/hamburger-is-closed.svg" />
  );
