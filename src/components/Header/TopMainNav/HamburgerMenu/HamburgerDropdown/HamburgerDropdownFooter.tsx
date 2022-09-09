import React from 'react';
import { SessionState } from '../../../../../contexts/user-context';

export const HamburgerDropdownFooter = ({ sessionState }: { sessionState: SessionState }) => (
  <menu className="border-t border-mid-grey list-none flex flex-row justify-between mx-24 items-center pt-24 pl-0">
    <li className="min-w-max">
      <a href="/contact" className="ui-meganav-link" data-id="meganav-link">
        Contact us
      </a>
    </li>
    {!sessionState.signedIn && (
      <li className="ml-16 min-w-max">
        <a href="/sign-up" data-id="meganav-sign-up-btn" className="ui-btn p-btn-small bg-cool-black text-white">
          Sign up free
        </a>
      </li>
    )}
  </menu>
);
