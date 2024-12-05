import React from 'react';
import cn from '@ably/ui/core/utils/cn';
import Link from 'src/components/Link';

import { width } from './TopMainNavAblyLogo.module.css';

import logo from './images/ably-docs-logo.svg';
import mobileLogo from './images/ably-docs-logo-mobile.png';

export const TopMainNavAblyLogo = ({ href = '/' }: { href?: string }) => (
  <Link to={href} className="h-32 flex-non self-center">
    <img src={logo} className={cn('hidden md:block', width)} />
    <img width="174" height="32" src={mobileLogo} className="block md:hidden" />
  </Link>
);
