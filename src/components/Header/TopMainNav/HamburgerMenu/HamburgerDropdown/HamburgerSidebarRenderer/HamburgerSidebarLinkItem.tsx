import React from 'react';

export const HamburgerSidebarLinkItem = ({ link, label }: { link: string; label: string }) => (
  <a href={link} rel="nofollow noopener">
    {label}
  </a>
);
