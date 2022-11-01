import React from 'react';
import { FooterLogo } from './FooterTopNav/FooterLogo';
import { FooterMenuItemType } from './FooterTopNav/FooterMenu/FooterMenu';
import { FooterSocialMenu } from './FooterTopNav/FooterSocial/FooterSocialMenu';
import { FooterMenuWrapper } from './FooterTopNav/FooterMenu/FooterMenuWrapper';
import { FooterStatus } from './FooterTopNav/FooterStatus';

export const FooterTopNav = ({
  ablySocialLinks,
  menuDataItems,
}: {
  ablySocialLinks: FooterMenuItemType[];
  menuDataItems: { items: FooterMenuItemType[]; label: string }[];
}) => (
  <div className="max-w-screen-xl mx-auto py-64 ui-grid-gap grid ui-grid-px grid-cols-6">
    <div className="col-span-full md:col-span-2 mb-30 md:mb-0">
      <FooterLogo />
      <FooterStatus />
      <FooterSocialMenu ablySocialLinks={ablySocialLinks} />
    </div>
    <FooterMenuWrapper menuDataItems={menuDataItems} />
  </div>
);
