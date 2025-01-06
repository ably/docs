import React from 'react';
import { useLayoutContext } from 'src/contexts/layout-context';
import Link from '../Link';
import Icon from '@ably/ui/core/Icon';
import cn from '@ably/ui/core/utils/cn';

const Breadcrumbs: React.FC = () => {
  const { activePage } = useLayoutContext();

  if (activePage?.tree.length === 0) {
    return null;
  }

  const linkStyles =
    'ui-text-menu4 font-semibold text-neutral-900 hover:text-neutral-1300 active:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-000 dark:active:text-neutral-500';

  return (
    <nav aria-label="breadcrumb" className="hidden mt-32 sm:flex items-center gap-4">
      <Link to="/" className={linkStyles}>
        Home
      </Link>
      <Icon name="icon-gui-disclosure-arrow" size="16px" />
      {activePage?.tree.map((node, index) => (
        <React.Fragment key={node.page.link}>
          {index > 0 ? <Icon name="icon-gui-disclosure-arrow" size="16px" /> : null}
          <Link
            to={node.page.link}
            className={cn(linkStyles, {
              'text-gui-unavailable dark:text-gui-unavailable-dark pointer-events-none': node.page.link === '#',
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
