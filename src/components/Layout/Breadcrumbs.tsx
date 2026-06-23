import React from 'react';
import { useLayoutContext } from 'src/contexts/layout-context';
import Link from '../Link';
import Icon from '@ably/ui/core/Icon';
import cn from 'src/utilities/cn';
import { hierarchicalKey } from './utils/nav';

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
        <Icon
          name="icon-gui-chevron-left-solid"
          size="12px"
          color="text-neutral-900 dark:text-neutral-400"
          additionalCSS="md:hidden shrink-0"
        />
      )}
      <Link to="/docs" className={cn(linkStyles, lastActiveNodeIndex !== null && 'hidden md:block')}>
        Home
      </Link>
      <Icon
        name="icon-gui-chevron-right-solid"
        size="12px"
        color="text-neutral-900 dark:text-neutral-400"
        additionalCSS={cn('shrink-0 rotate-180 md:rotate-0', { 'hidden md:flex': lastActiveNodeIndex === null })}
      />
      {activePage.tree.map((node, index) => (
        <React.Fragment key={hierarchicalKey(node.page.link, index, activePage.tree)}>
          {index > 0 ? (
            <Icon
              name="icon-gui-chevron-right-solid"
              size="12px"
              color="text-neutral-900 dark:text-neutral-400"
              additionalCSS="hidden md:flex shrink-0"
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
