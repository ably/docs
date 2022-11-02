import React from 'react';
import { FooterMenuItemType } from './FooterMenu';

export const FooterMenuItem = ({ label, link }: FooterMenuItemType) => (
  <li className="p-menu-row-snug pb-8">
    <a href={link} className="ui-footer-menu-row-link">
      {label}
    </a>
  </li>
);
