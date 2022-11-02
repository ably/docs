import React from 'react';
import Icon from '@ably/ui/core/Icon';
import { FooterMenuItemType } from '../FooterMenu/FooterMenu';

export const FooterSocialMenuIcons = ({ label, link }: FooterMenuItemType) => {
  return (
    <a className="h-24 pr-24 text-cool-black hover:text-active-orange" href={link}>
      <Icon name={label} size="1.5rem" />
    </a>
  );
};
