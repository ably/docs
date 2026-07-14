import { useMemo } from 'react';
import cn from 'src/utilities/cn';
import Icon from 'src/components/Icon';
import { IconName } from 'src/components/Icon/types';

import { productData } from 'src/data';
import { ProductKey } from 'src/data/types';
import { useLayoutContext } from 'src/contexts/layout-context';
import Link from '../Link';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

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
  'flex items-center gap-2 h-9 px-3 whitespace-nowrap rounded-lg transition-colors',
  'ui-text-label3 font-semibold',
  'focus-base',
);

const activeTabClassName = 'text-neutral-1300 dark:text-neutral-000 bg-orange-100 dark:bg-orange-1100';

const inactiveTabClassName = cn(
  'text-neutral-1000 dark:text-neutral-500',
  'hover:text-neutral-1300 dark:hover:text-neutral-000',
  'hover:bg-neutral-100 dark:hover:bg-neutral-1200',
  'cursor-pointer',
);

// --- Main component ---

type ProductBarProps = {
  className?: string;
  // When provided, product items act as selectors (used by the mobile menu) instead of
  // navigating: clicking calls onSelectProduct and the active highlight follows
  // selectedProduct rather than the active page.
  onSelectProduct?: (key: ProductKey) => void;
  selectedProduct?: ProductKey | null;
};

const ProductBar = ({ className, onSelectProduct, selectedProduct }: ProductBarProps) => {
  const { activePage } = useLayoutContext();
  const items = useMemo(buildNavBarItems, []);
  // Selection mode == the mobile menu: products wrap onto multiple rows (no horizontal
  // scroll) and the bar pins to the top of the menu's single scroll area.
  const selectionMode = !!onSelectProduct;

  return (
    <nav
      className={cn(
        'z-30 bg-neutral-000 dark:bg-neutral-1300 border-b border-neutral-300 dark:border-neutral-1000',
        selectionMode ? 'sticky top-0' : 'sticky top-16',
        className,
      )}
    >
      <div
        className={cn(
          'gap-1 pl-2 pr-5 py-2 max-w-[1600px] mx-auto',
          selectionMode ? 'flex flex-wrap' : 'flex items-center overflow-x-auto scrollbar-none',
        )}
      >
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
            ? selectionMode
              ? selectedProduct === item.key
              : activePage.product === item.key
            : activePage.page.link === item.link;

          const iconName = isProduct
            ? isActive
              ? (item as ProductBarItem).icon.open
              : (item as ProductBarItem).icon.closed
            : (item as CustomBarItem).icon;

          const itemKey = isProduct ? item.key : item.link;
          const tabClassName = cn(tabBaseClassName, isActive ? activeTabClassName : inactiveTabClassName);
          const tabContent = (
            <>
              {iconName && (
                <Icon
                  name={iconName}
                  size="20px"
                  additionalCSS={cn(isActive ? 'text-orange-600' : 'text-neutral-900 dark:text-neutral-400')}
                />
              )}
              <span>{item.name}</span>
              {!isProduct && (item as CustomBarItem).external && (
                <ArrowTopRightOnSquareIcon className="size-[12px]" aria-hidden />
              )}
            </>
          );

          // Selection mode (mobile): pick a product to reveal its TOC instead of navigating.
          if (selectionMode && isProduct) {
            return (
              <button key={itemKey} type="button" className={tabClassName} onClick={() => onSelectProduct(item.key)}>
                {tabContent}
              </button>
            );
          }

          return (
            <Link
              key={itemKey}
              to={item.link}
              className={tabClassName}
              {...(!isProduct &&
                (item as CustomBarItem).external && {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                })}
            >
              {tabContent}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default ProductBar;
