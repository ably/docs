import { useEffect, useRef, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import cn from '@ably/ui/core/utils/cn';
import Icon from '@ably/ui/core/Icon';

import { productData } from 'src/data';
import { NavProductContent, NavProductPage } from 'src/data/nav/types';
import Link from '../Link';
import { useLayoutContext } from 'src/contexts/layout-context';

type LeftSidebarProps = {
  inHeader?: boolean;
};

const accordionContentClassName =
  'overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animation-accordion-up';

const accordionTriggerClassName = cn(
  // Layout & display
  'flex items-center justify-between gap-2 p-0 pr-2 w-full text-left ui-text-label3',
  // Background color states
  'bg-neutral-000 dark:bg-neutral-1300 hover:bg-neutral-100 dark:hover:bg-neutral-1200 active:bg-neutral-200 dark:active:bg-neutral-1100',
  // Text color states
  'text-neutral-900 dark:text-neutral-400 hover:text-neutral-1300 dark:hover:text-neutral-000',
  // State styles
  'data-[state=open]:text-neutral-1300 dark:data-[state=open]:text-neutral-000 data-[state=open]:font-bold',
  // Icon animation
  '[&[data-state=open]>svg]:rotate-90',
  // Misc
  'focus-base transition-colors',
);

const accordionLinkClassName = 'pl-3 py-[6px]';

const iconClassName = 'text-neutral-1300 dark:text-neutral-000 transition-transform';

const ChildAccordion = ({
  content,
  layer,
  tree,
}: {
  content: (NavProductPage | NavProductContent)[];
  layer: number;
  tree: number[];
}) => {
  const { activePage } = useLayoutContext();
  const activeTriggerRef = useRef<HTMLButtonElement>(null);
  const previousTree = activePage.tree.map(({ index }) => index).slice(0, layer + 2);

  useEffect(() => {
    if (activeTriggerRef.current) {
      setTimeout(() => {
        activeTriggerRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 200);
    }
  }, []);

  return (
    <Accordion.Root
      type="multiple"
      className={cn(layer > 0 && 'pl-3')}
      defaultValue={[`item-${previousTree.join('-')}`]}
    >
      {content.map((page, index) => {
        const hasDeeperLayer = 'pages' in page && page.pages;
        const isActiveLink = 'link' in page && page.link === activePage.page.link;

        return (
          <Accordion.Item key={page.name} value={`item-${tree.join('-')}-${index}`}>
            <Accordion.Trigger
              ref={isActiveLink ? activeTriggerRef : null}
              className={cn(accordionTriggerClassName, 'font-medium rounded-lg', {
                'border-l border-neutral-300 dark:border-neutral-1000 hover:border-neutral-500 dark:hover:border-neutral-800 rounded-l-none':
                  layer > 0,
                'border-orange-600 bg-orange-100 hover:bg-orange-100': isActiveLink,
              })}
            >
              {hasDeeperLayer ? (
                <div className={cn(accordionLinkClassName, 'flex-1')}>
                  <span>{page.name}</span>
                </div>
              ) : (
                'link' in page && (
                  <Link
                    className={cn(
                      accordionLinkClassName,
                      'ui-text-label3 font-medium w-full h-full pr-5',
                      isActiveLink && 'text-neutral-1300 dark:text-neutral-000 font-bold',
                    )}
                    tabIndex={-1}
                    to={page.link}
                  >
                    <span>{page.name}</span>
                  </Link>
                )
              )}
              {hasDeeperLayer ? (
                <Icon name="icon-gui-chevron-right-outline" additionalCSS={iconClassName} size="12px" />
              ) : null}
            </Accordion.Trigger>
            {hasDeeperLayer && (
              <Accordion.Content className={cn(accordionContentClassName, layer === 0 && 'pt-1')}>
                <ChildAccordion content={page.pages} layer={layer + 1} tree={[...tree, index]} />
              </Accordion.Content>
            )}
          </Accordion.Item>
        );
      })}
    </Accordion.Root>
  );
};

const LeftSidebar = ({ inHeader = false }: LeftSidebarProps) => {
  const { activePage } = useLayoutContext();
  const [openProduct, setOpenProduct] = useState<string | null>(`item-${activePage.tree[0]?.index}`);

  return (
    <div className={cn('sticky top-16 h-full', inHeader ? 'w-full' : 'w-[280px] hidden md:block')}>
      <div
        id={inHeader ? 'inkeep-search-mobile-mount' : 'inkeep-search-mount'}
        className={cn(
          'p-1 bg-neutral-100 dark:bg-neutral-1200',
          inHeader ? 'sticky top-0' : 'border-r border-neutral-300 dark:border-neutral-1000',
        )}
      ></div>
      <Accordion.Root
        type="single"
        collapsible
        defaultValue={`item-${activePage.tree[0]?.index}`}
        className={cn(
          'bg-neutral-000 dark:bg-neutral-1300 overflow-y-auto',
          inHeader
            ? 'w-full h-[calc(100dvh-64px-128px)]'
            : 'w-[280px] h-[calc(100dvh-64px-44px)] border-r border-neutral-300 dark:border-neutral-1000',
        )}
        onValueChange={(value) => {
          setOpenProduct(value);
        }}
      >
        {Object.entries(productData).map(([productKey, productObj], index) => {
          const isActive = openProduct === `item-${index}`;

          return (
            <Accordion.Item
              key={productKey}
              value={`item-${index}`}
              className="border-b border-neutral-300 dark:border-neutral-1000"
            >
              <Accordion.Trigger
                className={cn(
                  'group/accordion-trigger z-10',
                  accordionTriggerClassName,
                  'data-[state=open]:border-b data-[state=open]:sticky data-[state=open]:top-0 [&[data-state=open]_svg]:text-orange-600 h-12 px-4 py-3 font-bold',
                  isActive && 'text-neutral-1300 dark:text-neutral-000',
                )}
              >
                <div className="flex-1 flex items-center gap-2">
                  <Icon
                    name={isActive ? productObj.nav.icon.open : productObj.nav.icon.closed}
                    additionalCSS={cn(
                      iconClassName,
                      isActive
                        ? 'text-orange-600'
                        : 'text-neutral-900 dark:text-neutral-400 group-hover/accordion-trigger:text-neutral-1300 dark:group-hover/accordion-trigger:text-neutral-000',
                    )}
                    size="20px"
                  />
                  <span>{productObj.nav.name}</span>
                </div>
                <Icon
                  name="icon-gui-chevron-right-outline"
                  additionalCSS={cn(iconClassName, '!text-neutral-900 dark:!text-neutral-400')}
                  size="12px"
                />
              </Accordion.Trigger>
              <Accordion.Content className={cn(accordionContentClassName, 'px-2 py-3')}>
                <ChildAccordion content={productObj.nav.content} layer={0} tree={[index]} />
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </div>
  );
};

export default LeftSidebar;
