import React from 'react';
import { MaybeSignedIn } from './maybe-signed-in';
import { SignedInPlaceholder } from './SignedIn/signed-in-placeholder';

export const TopMainNavUserMenu = ({ sessionState }: { sessionState: Record<string, unknown> }) =>
  sessionState ? <MaybeSignedIn sessionState={sessionState} /> : <SignedInPlaceholder />;
