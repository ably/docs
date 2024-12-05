import React from 'react';
import { FooterLogo } from './FooterTopNav/FooterLogo';
import { FooterMenuItemType } from './FooterTopNav/FooterMenu/FooterMenu';
import { FooterSocialMenu } from './FooterTopNav/FooterSocial/FooterSocialMenu';
import { FooterMenuContainer } from './FooterTopNav/FooterMenu/FooterMenuContainer';
import { FooterStatus } from './FooterTopNav/FooterStatus';

export const FooterTopNav = ({
  menuDataItems,
}: {
  menuDataItems: { items: FooterMenuItemType[]; label: string }[];
}) => (
  <div className="max-w-screen-xl mx-auto py-64 ui-grid-gap grid ui-grid-px grid-cols-6 justify-between">
    <div className="col-span-full md:col-span-2 mb-30 md:mb-0">
      <FooterLogo />
      <FooterStatus />
      <FooterSocialMenu />
    </div>
    <FooterMenuContainer menuDataItems={menuDataItems} />
  </div>
);
