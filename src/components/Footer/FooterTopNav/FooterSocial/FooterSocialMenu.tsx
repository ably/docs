import React from 'react';
import { FooterSocialMenuIcons } from './FooterSocialMenuIcons';
import { FooterMenuItemType } from '../FooterMenu/FooterMenu';

export const FooterSocialMenu = ({ ablySocialLinks }: { ablySocialLinks: FooterMenuItemType[] }) => (
  <>
    <p className="mt-24 ui-text-p3">Connect with us on:</p>
    <div className="pt-16 flex items-center">
      {ablySocialLinks.map((social: { label: string; link: string }) => (
        <FooterSocialMenuIcons label={social.label} link={social.link} key={social.label} />
      ))}
    </div>
  </>
);
