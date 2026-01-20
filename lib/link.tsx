'use client';

import NextLink from 'next/link';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

type LinkProps = ComponentPropsWithoutRef<typeof NextLink> & {
  to?: string;
};

/**
 * Link component that provides compatibility with Gatsby's Link component
 * while using Next.js's Link component under the hood.
 *
 * Supports both 'to' (Gatsby style) and 'href' (Next.js style) props.
 */
const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ to, href, children, ...props }, ref) => {
  const destination = to || href || '#';

  // Handle external links
  if (typeof destination === 'string' && (destination.startsWith('http://') || destination.startsWith('https://'))) {
    return (
      <a ref={ref} href={destination} {...props}>
        {children}
      </a>
    );
  }

  return (
    <NextLink ref={ref} href={destination} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = 'Link';

export default Link;
