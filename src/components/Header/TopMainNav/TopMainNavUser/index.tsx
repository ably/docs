import React from 'react';
import { MaybeSignedIn } from './maybe-signed-in';
import { SignedInPlaceholder } from './SignedIn/signed-in-placeholder';
import { DropdownDataIdentifier } from '../Dropdown/types';

export const TopMainNavUserMenu = ({
  sessionState,
  setDropdownData,
}: {
  sessionState: Record<string, unknown>;
  setDropdownData: React.Dispatch<React.SetStateAction<DropdownDataIdentifier>>;
}) =>
  sessionState ? (
    <MaybeSignedIn sessionState={sessionState} setDropdownData={setDropdownData} />
  ) : (
    <SignedInPlaceholder />
  );
