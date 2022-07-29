import React from 'react';
import { SessionState } from '../../../../../../contexts/user-context';
import { SignOutLink } from '../../../TopMainNavUser/SignedIn/sign-out-link';
import { AccountOptions } from './account-options';
import { AccountUtilityLinks } from './account-utility-links';

// Workaround for Tailwind not working correctly
const boxShadowStyling = {
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
};

export const AccountPanel = ({
  sessionState,
  links,
  preferredEmail,
}: {
  sessionState: SessionState;
  links: { href: string; text: string }[];
  preferredEmail: string;
}) => (
  <div className="fixed top-64 min-h-256 left-1/4 w-3/4 bg-white" style={boxShadowStyling} id={'account-panel'}>
    {/* Users exist without accounts in which case there are no links here */}
    {sessionState.account && <AccountOptions links={links} />}
    <p className="ui-meganav-overline mx-16">{preferredEmail}</p>
    <AccountUtilityLinks sessionState={sessionState} />
    <hr className="ui-meganav-hr mb-16" />
    {sessionState.logOut && (
      <div className="mb-16 px-16">
        <SignOutLink {...sessionState.logOut}>
          {({ text, href, onClick }) => (
            <a onClick={onClick} href={href} className="ui-meganav-account-link">
              {text}
            </a>
          )}
        </SignOutLink>
      </div>
    )}
  </div>
);
