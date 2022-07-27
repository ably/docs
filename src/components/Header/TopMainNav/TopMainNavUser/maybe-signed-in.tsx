import React from 'react';
import { SignedOut } from './signed-out';
import { SignedIn } from './SignedIn/signed-in';

export const MaybeSignedIn = ({ sessionState }: { sessionState: Record<string, unknown> }) =>
  sessionState.signedIn ? <SignedIn /> : <SignedOut />;
