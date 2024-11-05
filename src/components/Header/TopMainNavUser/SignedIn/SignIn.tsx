import React from 'react';
import { SessionState } from '../../../../contexts/user-context';

export const SignedIn = ({ sessionState }: { sessionState: SessionState }) => {
  return sessionState.account ? (
    <a href={sessionState.account.links?.dashboard.href} className="ui-btn-secondary p-btn-small my-8 min-w-140">
      Dashboard
    </a>
  ) : null;
};
