import React from 'react';
import { AblyDocsLogo } from './AblyDocsLogo/ably-docs-logo';
import { AblyImageLogo } from './AblyDocsLogo/ably-image-logo';

export const Logo = ({ href = '/' }: { href: string }) => (
  <a href={href} className="h-32">
    <AblyImageLogo />
    <AblyDocsLogo />
  </a>
);
