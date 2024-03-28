import React from 'react';
import Link from 'src/components/Link';
import { FooterMenuItemType } from './FooterTopNav/FooterMenu/FooterMenu';

export const FooterBottomNav = ({ bottomLinks }: { bottomLinks: FooterMenuItemType[] }) => (
  <div className="max-w-screen-xl mx-auto py-40 border-t border-mid-grey w-full">
    <div className="inline-flex  justify-center w-full space-x-24">
      {bottomLinks.map(({ link, label, external }: FooterMenuItemType) => (
        <Link to={link} key={label} external={external} className="ui-footer-link">
          {label}
        </Link>
      ))}
    </div>
  </div>
);
