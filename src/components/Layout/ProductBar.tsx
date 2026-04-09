import { useMemo } from 'react';
import cn from '@ably/ui/core/utils/cn';
import Icon from '@ably/ui/core/Icon';
import { IconName } from '@ably/ui/core/Icon/types';

import { productData } from 'src/data';
import { ProductKey } from 'src/data/types';
import { useLayoutContext } from 'src/contexts/layout-context';
import Link from '../Link';

type ProductBarItem = {
  type: 'product';
  key: ProductKey;
  name: string;
  link: string;
  icon: { closed: IconName; open: IconName };
};

type CustomBarItem = {
  type: 'link';
  name: string;
  link: string;
  icon?: IconName;
  external?: boolean;
};

type BarDivider = {
  type: 'divider';
};

type NavBarItem = ProductBarItem | CustomBarItem | BarDivider;

const buildNavBarItems = (): NavBarItem[] => {
  return (Object.keys(productData) as ProductKey[])
    .filter((key) => key !== 'platform')
    .map((key) => ({
      type: 'product',
      key,
      name: productData[key].nav.name.replace(/^Ably\s+/, ''),
      link: productData[key].nav.link ?? `/docs/${key}`,
      icon: productData[key].nav.icon,
    }));
};

// --- Styles ---

const tabBaseClassName = cn(
  'flex items-center gap-1.5 px-3 py-2.5 whitespace-nowrap rounded-lg transition-colors',
  'ui-text-label3 font-medium',
  'focus-base',
);

const activeTabClassName = 'text-neutral-1300 dark:text-neutral-000 bg-orange-100 dark:bg-orange-1000';

const inactiveTabClassName = cn(
  'text-neutral-800 dark:text-neutral-500',
  'hover:text-neutral-1300 dark:hover:text-neutral-000',
  'hover:bg-neutral-100 dark:hover:bg-neutral-1200',
  'cursor-pointer',
);

// --- Main component ---

type ProductBarProps = {
  className?: string;
};

const ProductBar = ({ className }: ProductBarProps) => {
  const { activePage } = useLayoutContext();
  const items = useMemo(buildNavBarItems, []);

  return (
    <nav
      className={cn(
        'sticky top-16 z-30 bg-neutral-000 dark:bg-neutral-1300 border-b border-neutral-300 dark:border-neutral-1000',
        className,
      )}
    >
      <div className="flex items-center gap-0.5 px-3 py-1.5 overflow-x-auto scrollbar-none max-w-[1856px] mx-auto">
        {items.map((item, index) => {
          if (item.type === 'divider') {
            return (
              <div
                key={`divider-${index}`}
                className="w-px h-5 mx-1.5 bg-neutral-300 dark:bg-neutral-1000 flex-shrink-0"
              />
            );
          }

          const isProduct = item.type === 'product';
          const isActive = isProduct
            ? activePage.product === item.key
            : activePage.page.link === item.link;

          const iconName = isProduct
            ? isActive
              ? (item as ProductBarItem).icon.open
              : (item as ProductBarItem).icon.closed
            : (item as CustomBarItem).icon;

          const itemKey = isProduct ? item.key : item.link;

          return (
            <Link
              key={itemKey}
              to={item.link}
              className={cn(
                tabBaseClassName,
                isActive ? activeTabClassName : inactiveTabClassName,
              )}
              {...(!isProduct &&
                (item as CustomBarItem).external && {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                })}
            >
              {iconName && (
                <Icon
                  name={iconName}
                  size="16px"
                  additionalCSS={cn(
                    isActive
                      ? 'text-orange-600'
                      : 'text-neutral-700 dark:text-neutral-600',
                  )}
                />
              )}
              <span>{item.name}</span>
              {!isProduct && (item as CustomBarItem).external && (
                <Icon name="icon-gui-arrow-top-right-on-square-outline" size="12px" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default ProductBar;
