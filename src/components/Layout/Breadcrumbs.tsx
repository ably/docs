import React from 'react';
import { useLayoutContext } from 'src/contexts/layout-context';
import Link from '../Link';
import cn from 'src/utilities/cn';
import { hierarchicalKey } from './utils/nav';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const linkStyles =
  'ui-text-label4 font-semibold text-neutral-900 hover:text-neutral-1300 active:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-000 dark:active:text-neutral-500 focus-base transition-colors whitespace-nowrap';

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
    <nav aria-label="breadcrumb" className="flex items-center gap-1 min-w-0 flex-wrap">
      {lastActiveNodeIndex === null && (
        <ChevronLeftIcon
          className="size-[12px] text-neutral-900 dark:text-neutral-400 md:hidden shrink-0"
          aria-hidden
        />
      )}
      <Link to="/docs" className={cn(linkStyles, lastActiveNodeIndex !== null && 'hidden md:block')}>
        Home
      </Link>
      <ChevronRightIcon
        className={cn('size-[12px] text-neutral-900 dark:text-neutral-400 shrink-0 rotate-180 md:rotate-0', {
          'hidden md:flex': lastActiveNodeIndex === null,
        })}
        aria-hidden
      />
      {activePage.tree.map((node, index) => (
        <React.Fragment key={hierarchicalKey(node.page.link, index, activePage.tree)}>
          {index > 0 ? (
            <ChevronRightIcon
              className="size-[12px] text-neutral-900 dark:text-neutral-400 hidden md:flex shrink-0"
              aria-hidden
            />
          ) : null}
          <Link
            to={node.page.link}
            className={cn(linkStyles, {
              'text-neutral-700 dark:text-neutral-700 pointer-events-none':
                index === activePage.tree.length - 1 || node.page.link === '#',
              'hidden md:flex': index !== lastActiveNodeIndex,
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
