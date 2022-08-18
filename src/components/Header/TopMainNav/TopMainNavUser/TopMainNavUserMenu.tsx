import React from 'react';
import { MaybeSignedIn } from './MaybeSignedIn';
import { SignedInPlaceholder } from './SignedIn';
import { NullableDropdownDataIdentifier } from '../Dropdown';
import { SessionState } from '../../../../contexts/user-context';

export const TopMainNavUserMenu = ({
  sessionState,
  setDropdownData,
}: {
  sessionState: SessionState;
  setDropdownData: React.Dispatch<React.SetStateAction<NullableDropdownDataIdentifier>>;
}) =>
  sessionState ? (
    <MaybeSignedIn sessionState={sessionState} setDropdownData={setDropdownData} />
  ) : (
    <SignedInPlaceholder />
  );
