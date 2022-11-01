import React from 'react';
import Logo from '@ably/ui/core/Logo';
import { DOCUMENTATION_PATH } from '../../../../data/transform/constants';

export const FooterLogo = () => (
  <>
    <Logo dataId="footer-logo" href={DOCUMENTATION_PATH} />
  </>
);
