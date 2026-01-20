'use client';

import React from 'react';
import { useLayoutContext } from 'src/contexts/layout-context';
import Link from '../Link';
import Icon from '@ably/ui/core/Icon';
import cn from '@ably/ui/core/utils/cn';
import { hierarchicalKey } from './utils/nav';

const linkStyles =
  'ui-text-label4 font-semibold text-neutral-900 hover:text-neutral-1300 active:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-000 dark:active:text-neutral-500 focus-base transition-colors';

const Breadcrumbs: React.FC = () => {
  const { activePage } = useLayoutContext();

  if (!activePage?.tree || activePage.tree.length === 0) {
    return null;
  }

  const lastActiveNodeIndex = (() => {
    const index = activePage.tree
      .toReversed()
      .slice(1)
      .findIndex((node) => node.page.link !== '#');

    if (index !== -1) {
      const potentialIndex = activePage.tree.length - index - 2;

      if (activePage.page.link === activePage.tree[potentialIndex].page.link) {
        return null;
      }

      return potentialIndex;
    }

    return null;
  })();

  return (
    <nav aria-label="breadcrumb" className="flex mt-8 items-center gap-1">
      {lastActiveNodeIndex === null && (
        <Icon
          name="icon-gui-chevron-left-micro"
          size="16px"
          color="text-neutral-900 dark:text-neutral-400"
          additionalCSS="sm:hidden"
        />
      )}
      <Link to="/docs" className={cn(linkStyles, lastActiveNodeIndex !== null && 'hidden sm:block')}>
        Home
      </Link>
      <Icon
        name="icon-gui-chevron-right-micro"
        size="16px"
        color="text-neutral-900 dark:text-neutral-400"
        additionalCSS={cn('rotate-180 sm:rotate-0', { 'hidden sm:flex': lastActiveNodeIndex === null })}
      />
      {activePage.tree.map((node, index) => (
        <React.Fragment key={hierarchicalKey(node.page.link, index, activePage.tree)}>
          {index > 0 ? (
            <Icon
              name="icon-gui-chevron-right-micro"
              size="16px"
              color="text-neutral-900 dark:text-neutral-400"
              additionalCSS="hidden sm:flex"
            />
          ) : null}
          <Link
            to={node.page.link}
            className={cn(linkStyles, {
              'text-gui-unavailable dark:text-gui-unavailable-dark pointer-events-none':
                index === activePage.tree.length - 1 || node.page.link === '#',
              'hidden sm:flex': index !== lastActiveNodeIndex,
            })}
          >
            {node.page.name}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
