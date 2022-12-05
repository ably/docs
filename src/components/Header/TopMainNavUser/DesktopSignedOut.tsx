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
    <div className="hidden md:block">
      <a href="/sign-up" data-id="meganav-sign-up-btn" className="ui-btn p-btn-small my-8 min-w-140">
        Sign up free
      </a>
    </div>
  </>
);
