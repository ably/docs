import React from 'react';
import { SessionState } from '../../../../contexts/user-context';
import { NullableDropdownDataIdentifier } from '../Dropdown/types';
import { SignedOut } from './SignedOut';
import { SignedIn } from './SignedIn';

export const MaybeSignedIn = ({
  sessionState,
  setDropdownData,
}: {
  sessionState: SessionState;
  setDropdownData: React.Dispatch<React.SetStateAction<NullableDropdownDataIdentifier>>;
}) =>
  sessionState.signedIn ? <SignedIn sessionState={sessionState} setDropdownData={setDropdownData} /> : <SignedOut />;
