import React from 'react';
import { SessionState } from '../../../../contexts/user-context';
import { DropdownDataIdentifier } from '../Dropdown/types';
import { SignedOut } from './SignedOut';
import { SignedIn } from './SignedIn';

export const MaybeSignedIn = ({
  sessionState,
  setDropdownData,
}: {
  sessionState: SessionState;
  setDropdownData: React.Dispatch<React.SetStateAction<DropdownDataIdentifier>>;
}) =>
  sessionState.signedIn ? <SignedIn sessionState={sessionState} setDropdownData={setDropdownData} /> : <SignedOut />;
