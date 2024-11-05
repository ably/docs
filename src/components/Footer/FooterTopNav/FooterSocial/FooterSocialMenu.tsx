import React from 'react';
import { FooterSocialMenuIcons } from './FooterSocialMenuIcons';
import { ablySocialLinks } from '../../data';

export const FooterSocialMenu = () => (
  <>
    <p className="mt-24 ui-text-p3">Find us on:</p>
    <div className="pt-16 flex items-center">
      {ablySocialLinks.map((social: { label: string; link: string }) => (
        <FooterSocialMenuIcons label={social.label} link={social.link} key={social.label} />
      ))}
    </div>
  </>
);
