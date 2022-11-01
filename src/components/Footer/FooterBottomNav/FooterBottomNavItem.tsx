import React from 'react';
import { FooterMenuItemType } from '../FooterTopNav/FooterMenu/FooterMenu';

export const FooterBottomNavItem = ({ label, link }: FooterMenuItemType) => (
  <a key={label} className="ui-footer-link" href={link}>
    {label}
  </a>
);
