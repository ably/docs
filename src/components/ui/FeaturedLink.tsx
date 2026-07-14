import React, { CSSProperties, ReactNode } from 'react';

import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import { ColorClass, ColorThemeSet } from './colors';
import cn from 'src/utilities/cn';

type FeaturedLinkProps = {
  url: string;
  children: ReactNode;
  textSize?: string;
  iconColor?: ColorClass | ColorThemeSet;
  flush?: boolean;
  reverse?: boolean;
  additionalCSS?: string;
  newWindow?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  /**
   * Optional class name for the icon.
   */
  iconClassName?: string;
};

type TargetProps = { target?: string; rel?: string };

// When generating links with target=_blank, we only add `noreferrer` to
// links that don't start with `/`, so we can continue tracking referrers
// across our own domains
const buildTargetAndRel = (url: string, newWindow: boolean) => {
  const props: TargetProps = {};

  if (newWindow) {
    props.target = '_blank';

    if (url.startsWith('/') && !url.startsWith('//')) {
      props.rel = 'noopener';
    } else {
      props.rel = 'noopener noreferrer';
    }
  }

  return props;
};

const FeaturedLink = ({
  url,
  textSize = 'text-p2',
  iconColor,
  flush = false,
  reverse = false,
  additionalCSS = '',
  newWindow = false,
  onClick = undefined,
  children,
  disabled = false,
  iconClassName = '',
}: FeaturedLinkProps) => {
  const targetAndRel = buildTargetAndRel(url, newWindow);

  return (
    <a
      {...(onClick ? {} : { href: url })}
      className={cn(
        'font-sans font-bold block group/featured-link',
        {
          'text-gui-disabled-light dark:text-gui-disabled-dark pointer-events-none': disabled,
        },
        {
          'text-gui-default hover:text-gui-hover dark:text-gui-default-dark dark:hover:text-gui-hover-dark focus:text-gui-focus focus:outline-none focus-visible:outline-gui-focus':
            !disabled,
        },
        { 'py-2': !flush },
        `ui-${textSize}`,
        additionalCSS,
      )}
      style={
        {
          '--featured-link-icon-size': `var(${textSize.replace('text', '--fs')})`,
        } as CSSProperties
      }
      {...targetAndRel}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      role={onClick && !url ? 'button' : undefined}
    >
      {reverse ? (
        <>
          <ArrowLongRightIcon
            aria-hidden
            style={{
              width: `calc(var(--featured-link-icon-size) * 1.25)`,
              height: `calc(var(--featured-link-icon-size) * 1.25)`,
            }}
            className={cn(
              iconColor,
              'inline align-middle mr-2 relative -top-px -right-1 transition-[right] transform rotate-180',
              { 'group-hover/featured-link:right-0': !disabled },
              iconClassName,
            )}
          />
          {children}
        </>
      ) : (
        <>
          {children}
          <ArrowLongRightIcon
            aria-hidden
            style={{
              width: `calc(var(--featured-link-icon-size) * 1.25)`,
              height: `calc(var(--featured-link-icon-size) * 1.25)`,
            }}
            className={cn(
              iconColor,
              'inline align-middle ml-2 relative -top-px -left-1 transition-[left]',
              {
                'group-hover/featured-link:left-0': !disabled,
              },
              iconClassName,
            )}
          />
        </>
      )}
    </a>
  );
};

export default FeaturedLink;
