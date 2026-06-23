import React, { CSSProperties, ReactNode } from 'react';

import Icon from 'src/components/Icon';
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
      props.rel = 'noopenner noreferrer';
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
          'text-gui-default hover:text-gui-hover focus:text-gui-focus focus:outline-none focus-visible:outline-gui-focus':
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
          <Icon
            name="icon-gui-arrow-long-right-outline"
            size={`calc(var(--featured-link-icon-size) * 1.25)`}
            color={iconColor}
            additionalCSS={cn(
              'align-middle mr-2 relative -top-px -right-1 transition-[right] transform rotate-180',
              { 'group-hover/featured-link:right-0': !disabled },
              iconClassName,
            )}
          />
          {children}
        </>
      ) : (
        <>
          {children}
          <Icon
            name="icon-gui-arrow-long-right-outline"
            size={`calc(var(--featured-link-icon-size) * 1.25)`}
            color={iconColor}
            additionalCSS={cn(
              'align-middle ml-2 relative -top-px -left-1 transition-[left]',
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
