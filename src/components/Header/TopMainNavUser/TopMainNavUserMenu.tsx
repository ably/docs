import React from 'react';

import { SessionState } from '../../../contexts/user-context';
import { SignedIn } from './SignedIn';
import { DesktopSignedOut } from './DesktopSignedOut';

export const TopMainNavUserMenu = ({ sessionState }: { sessionState: SessionState }) => {
  if (sessionState) {
    if (sessionState.signedIn) {
      return <SignedIn sessionState={sessionState} />;
    } else {
      return (
        <>
          <DesktopSignedOut />
        </>
      );
    }
  }

  return <div />;
};
