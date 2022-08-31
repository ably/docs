import React from 'react';
import { SessionState } from '../../../../contexts/user-context';
import { SignedOut } from './SignedOut';
import { SignedIn } from './SignedIn';

export const MaybeSignedIn = ({ sessionState }: { sessionState: SessionState }) =>
  sessionState.signedIn ? <SignedIn sessionState={sessionState} /> : <SignedOut />;
