import React from 'react';
import { HamburgerSidebarItemContainer } from './HamburgerSidebarItemContainer';

export const HamburgerSidebarLinkItem = ({ link, label }: { link: string; label: string }) => (
  <HamburgerSidebarItemContainer>
    <a className="text-16" href={link} rel="nofollow noopener">
      {label}
    </a>
  </HamburgerSidebarItemContainer>
);
