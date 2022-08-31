import React from 'react';
import { MaybeSignedIn } from './MaybeSignedIn';
import { SignedInPlaceholder } from './SignedIn';
import { SessionState } from '../../../../contexts/user-context';

export const TopMainNavUserMenu = ({ sessionState }: { sessionState: SessionState }) =>
  sessionState ? <MaybeSignedIn sessionState={sessionState} /> : <SignedInPlaceholder />;
