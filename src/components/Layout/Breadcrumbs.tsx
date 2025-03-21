import React, { useMemo } from 'react';
import { useLayoutContext } from 'src/contexts/layout-context';
import Link from '../Link';
import Icon from '@ably/ui/core/Icon';
import cn from '@ably/ui/core/utils/cn';
import { hierarchicalKey, PageTreeNode } from './utils/nav';

const Breadcrumbs: React.FC = () => {
  const { activePage } = useLayoutContext();

  const breadcrumbNodes = useMemo(() => {
    const filteredNodes = activePage?.tree.filter((node) => node.page.link !== '#') ?? [];
    const uniqueNodes = filteredNodes.reduce((acc: PageTreeNode[], current) => {
      const isDuplicate = acc.some((item) => item.page.link === current.page.link);
      if (!isDuplicate) {
        acc.push(current);
      }
      return acc;
    }, []);
    return uniqueNodes;
  }, [activePage?.tree]);

  if (breadcrumbNodes.length === 0) {
    return null;
  }

  const linkStyles =
    'ui-text-menu4 font-semibold text-neutral-900 hover:text-neutral-1300 active:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-000 dark:active:text-neutral-500';

  return (
    <nav aria-label="breadcrumb" className="flex mt-32 items-center gap-4">
      <Link to="/docs" className={cn(linkStyles, 'hidden sm:block')}>
        Home
      </Link>
      <Icon
        name="icon-gui-chevron-right-micro"
        size="16px"
        additionalCSS={cn('rotate-180 sm:rotate-0', { 'hidden sm:flex': breadcrumbNodes.length === 1 })}
      />
      {breadcrumbNodes.map((node, index) => (
        <React.Fragment key={hierarchicalKey(node.page.link, index, activePage.tree)}>
          {index > 0 ? <Icon name="icon-gui-chevron-right-micro" size="16px" additionalCSS="hidden sm:flex" /> : null}
          <Link
            to={node.page.link}
            className={cn(linkStyles, {
              'text-gui-unavailable dark:text-gui-unavailable-dark pointer-events-none':
                index === breadcrumbNodes.length - 1,
              'hidden sm:flex': index !== breadcrumbNodes.length - 2,
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
