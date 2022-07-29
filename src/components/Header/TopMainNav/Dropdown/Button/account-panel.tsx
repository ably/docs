import React from 'react';
import { SessionState } from '../../../../../contexts/user-context';
import { SignOutLink } from '../../TopMainNavUser/SignedIn/sign-out-link';
import { DropdownData } from '../types';

const AccountPanel = ({
  sessionState,
  links,
  preferredEmail,
}: {
  sessionState: SessionState;
  links: { href: string; text: string }[];
  preferredEmail: string;
}) => (
  <div className="ui-meganav-panel-account invisible" id="account-panel" data-id="meganav-panel">
    {/* Users exist without accounts in which case there is no links here */}
    {sessionState.account && (
      <>
        <p className="ui-meganav-overline mt-16 mx-16">Your account</p>
        <ul className="mb-16 mx-16">
          {links.map((item) => (
            <li key={item.href}>
              <a className="ui-meganav-account-link" href={item.href}>
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </>
    )}

    <p className="ui-meganav-overline mx-16">{preferredEmail}</p>
    <ul className="mb-8 mx-16">
      {sessionState.mySettings && (
        <li>
          <a href={sessionState.mySettings.href} className="ui-meganav-account-link">
            {sessionState.mySettings.text}
          </a>
        </li>
      )}
      {sessionState.myAccessTokens && (
        <li>
          <a href={sessionState.myAccessTokens.href} className="ui-meganav-account-link">
            {sessionState.myAccessTokens.text}
            <span className="ui-version-tag">preview</span>
          </a>
        </li>
      )}
    </ul>

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

export const AccountPanelDropdownData: DropdownData = {
  summaryTitle: 'Your Account',
  summaryDescription: '',
  contents: [],
  title: '',
  CustomComponent: AccountPanel,
};
