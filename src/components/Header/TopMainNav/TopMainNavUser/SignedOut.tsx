import React from 'react';
import { DesktopSignedOut } from './DesktopSignedOut';
import { MobileSignedOut } from './MobileSignedOut';
export const SignedOut = () => (
  <>
    <DesktopSignedOut /> <MobileSignedOut />
  </>
);
