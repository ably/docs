import React from 'react';
import { TopMainNavLink } from './TopMainNavLink';

export const SignedOut = () => (
  <menu className="hidden list-none md:flex items-center right-0">
    <TopMainNavLink href="/contact" dataId="meganav-link">
      Contact us
    </TopMainNavLink>
    <TopMainNavLink href="/login" dataId="meganav-link">
      Login
    </TopMainNavLink>
    <li className="ml-16 min-w-max">
      <a href="/sign-up" data-id="meganav-sign-up-btn" className="ui-btn p-btn-small bg-cool-black text-white">
        Sign up free
      </a>
    </li>
  </menu>
);
