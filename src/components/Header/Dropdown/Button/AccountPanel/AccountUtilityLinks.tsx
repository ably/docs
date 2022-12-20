import React from 'react';
import { SessionState } from '../../../../../contexts/user-context';

export const AccountUtilityLinks = ({ sessionState }: { sessionState: SessionState }) => (
  <menu className="mb-8 list-none px-16">
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
  </menu>
);
