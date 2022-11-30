import React from 'react';
import { SessionState } from '../../../../../contexts/user-context';
import { SignOutLink } from '../../../TopMainNavUser/SignedIn';
import { DropdownContentLink } from '../../Contents';
import { AccountOptions, AccountUtilityLinks } from '.';

export const AccountPanel = ({
  sessionState,
  links,
  preferredEmail,
}: {
  sessionState: SessionState;
  links: DropdownContentLink[];
  preferredEmail: string;
}) => (
  <div className="fixed top-64 min-h-256 left-auto min-w-320 bg-white shadow-container" id={'account-panel'}>
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
