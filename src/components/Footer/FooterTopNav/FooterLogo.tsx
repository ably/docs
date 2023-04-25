import React from 'react';
import { StaticImage } from '../../StaticImage';

export const FooterLogo = () => (
  <a href="/" data-id="footer-logo" className="block" style={{ height: '2.125rem' }}>
    <StaticImage src="/images/ably-logo.png" width="108px" alt="Ably logo" />
  </a>
);
