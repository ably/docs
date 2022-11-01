import React from 'react';
import { FooterMenuItemType } from './FooterTopNav/FooterMenu/FooterMenu';
import { FooterBottomNavItem } from './FooterBottomNav/FooterBottomNavItem';

export const FooterBottomNav = ({ bottomLinks }: { bottomLinks: FooterMenuItemType[] }) => (
  <div className="max-w-screen-xl mx-auto py-40 border-t border-mid-grey w-full">
    <div className="inline-flex  justify-center w-full space-x-24">
      {bottomLinks.map((link: FooterMenuItemType) => (
        <FooterBottomNavItem link={link.link} label={link.label} key={link.label} />
      ))}
    </div>
  </div>
);
