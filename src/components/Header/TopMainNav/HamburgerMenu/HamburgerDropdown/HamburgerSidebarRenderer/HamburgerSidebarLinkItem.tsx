import React from 'react';
import { HamburgerSidebarItemContainer } from '.';

export const HamburgerSidebarLinkItem = ({ link, label }: { link: string; label: string }) => (
  <HamburgerSidebarItemContainer>
    <a
      className="text-16
                focus-within:outline-none focus-within:text-gui-focus"
      href={link}
      rel="nofollow noopener"
    >
      {label}
    </a>
  </HamburgerSidebarItemContainer>
);
