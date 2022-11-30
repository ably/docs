import React from 'react';
import cn from 'classnames';
import { StaticImage } from 'src/components/StaticImage';

import { width } from './TopMainNavAblyLogo.module.css';

export const TopMainNavAblyLogo = ({ href = '/' }: { href?: string }) => {
  return (
    <a href={href} className="h-32 flex-non self-center">
      <StaticImage src="/images/icons/ably-docs-logo.svg" className={cn('hidden md:block', width)} />
      <StaticImage width="174" height="32" src="/images/icons/ably-docs-logo-mobile.png" className="block md:hidden" />
    </a>
  );
};
