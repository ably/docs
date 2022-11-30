import React from 'react';

import { SessionState } from '../../../contexts/user-context';
import { SignedIn } from './SignedIn';
import { DesktopSignedOut } from './DesktopSignedOut';
import { MobileSignedOut } from './MobileSignedOut';

export const TopMainNavUserMenu = ({ sessionState }: { sessionState: SessionState }) => {
  if (sessionState) {
    if (sessionState.signedIn) {
      return <SignedIn sessionState={sessionState} />;
    } else {
      return (
        <>
          <DesktopSignedOut /> <MobileSignedOut />
        </>
      );
    }
  }

  return <div />;
};
