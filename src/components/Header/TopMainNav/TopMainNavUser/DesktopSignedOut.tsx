import React from 'react';
import { TopMainNavLink } from './TopMainNavLink';

export const DesktopSignedOut = () => (
  <>
    <TopMainNavLink href="/contact" dataId="meganav-link">
      Contact us
    </TopMainNavLink>
    <TopMainNavLink href="/login" dataId="meganav-link">
      Login
    </TopMainNavLink>
    <a href="/sign-up" data-id="meganav-sign-up-btn" className="ui-btn p-btn-small bg-cool-black text-white my-8">
      Sign up free
    </a>
  </>
);
