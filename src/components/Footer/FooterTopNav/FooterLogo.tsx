import React from 'react';
import Link from 'src/components/Link';
import logo from './images/ably-logo.png';

export const FooterLogo = () => (
  <Link to="/" data-id="footer-logo" className="block" style={{ height: '2.125rem' }}>
    <img src={logo} width="108px" alt="Ably logo" />
  </Link>
);
