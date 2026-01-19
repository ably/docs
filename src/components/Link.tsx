'use client';

import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { checkLinkIsInternal, localizeLink } from 'src/utilities/link-checks';

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
  children?: ReactNode;
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ children, to, ...props }, ref) => {
  const isInternal = checkLinkIsInternal(to);
  const isOnPage = to?.startsWith('#');

  if (isInternal && !isOnPage) {
    // Strip noreferrer from the rel if it is a local link
    const { rel } = props;
    if (rel !== undefined) {
      const keep = rel
        .split(' ')
        .filter((value) => value !== 'noreferrer')
        .join(' ');
      if (keep.length > 0) {
        props.rel = keep;
      } else {
        delete props.rel;
      }
    }

    return (
      <NextLink ref={ref} href={localizeLink(to)} data-testid="link-internal" {...props}>
        {children}
      </NextLink>
    );
  }

  // add noreferrer to external links that open in new windows
  const { target } = props;
  if (target && target === '_blank') {
    const { rel } = props;
    const newRel = new Set((rel ?? '').split(' '));
    newRel.delete('');
    newRel.add('noreferrer');
    newRel.add('noopener');
    props.rel = [...newRel].join(' ');
  }

  return (
    <a ref={ref} href={to} data-testid="link-external" {...props}>
      {children}
    </a>
  );
});

Link.displayName = 'Link';

export default Link;

/**
 * A wrapper around Next.js router that is aware of external links
 */
interface NavigateOptions {
  replace?: boolean;
  scroll?: boolean;
}

export function useNavigate() {
  const router = useRouter();

  return (to: string, options: NavigateOptions = {}): void => {
    const isInternal = checkLinkIsInternal(to);
    const isOnPage = to?.startsWith('#');
    const formattedTo = localizeLink(to);

    if (isInternal && !isOnPage) {
      if (options.replace) {
        router.replace(formattedTo, { scroll: options.scroll });
      } else {
        router.push(formattedTo, { scroll: options.scroll });
      }
      return;
    }

    if (typeof window !== 'undefined') {
      window.location.assign(formattedTo);
    }
  };
}
