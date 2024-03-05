import React from 'react';
import Link from 'src/components/Link';
import { HamburgerSidebarItemContainer } from '.';

export const HamburgerSidebarLinkItem = ({ link, label }: { link: string; label: string }) => (
  <HamburgerSidebarItemContainer>
    <Link
      className="text-16 font-medium
                focus-within:outline-none focus-within:text-gui-focus"
      to={link}
      rel="nofollow noopener"
    >
      {label}
    </Link>
  </HamburgerSidebarItemContainer>
);
