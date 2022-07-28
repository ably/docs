import React from 'react';
import { SessionState } from '../../../../contexts/user-context';
import { DropdownDataIdentifier } from '../Dropdown/types';
import { SignedOut } from './signed-out';
import { SignedIn } from './SignedIn/signed-in';

export const MaybeSignedIn = ({
  sessionState,
  setDropdownData,
}: {
  sessionState: SessionState;
  setDropdownData: React.Dispatch<React.SetStateAction<DropdownDataIdentifier>>;
}) =>
  sessionState.signedIn ? <SignedIn sessionState={sessionState} setDropdownData={setDropdownData} /> : <SignedOut />;
