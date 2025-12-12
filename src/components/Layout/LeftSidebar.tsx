import { useEffect, useMemo, useRef, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { useLocation } from '@reach/router';
import * as Accordion from '@radix-ui/react-accordion';
import cn from '@ably/ui/core/utils/cn';
import Icon from '@ably/ui/core/Icon';

import { productData } from 'src/data';
import { NavProductContent, NavProductPage } from 'src/data/nav/types';
import Link from '../Link';
import { useLayoutContext } from 'src/contexts/layout-context';
import { interactiveButtonClassName } from './utils/styles';

type LeftSidebarProps = {
  className?: string;
  inHeader?: boolean;
};

const accordionContentClassName =
  'overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up p-1 -m-1';

const accordionTriggerClassName = cn(
  interactiveButtonClassName,
  // Layout & display
  'flex items-center justify-between gap-2 p-0 pr-2 w-full text-left ui-text-label3 rounded-none',
  // Icon animation
  '[&[data-state=open]>svg]:rotate-90',
);

const accordionLinkClassName = 'pl-3 py-[6px]';

const iconClassName = 'text-neutral-1300 dark:text-neutral-000 transition-transform';

const ChildAccordion = ({ content, tree }: { content: (NavProductPage | NavProductContent)[]; tree: number[] }) => {
  const { activePage } = useLayoutContext();
  const location = useLocation();
  const activeTriggerRef = useRef<HTMLButtonElement>(null);
  const layer = tree.length - 1;
  const previousTree = activePage.tree.map(({ index }) => index).slice(0, layer + 2);

  const preExpandedItems = content
    .map((page, index) => 'expand' in page && page.expand && `item-${tree.join('-')}-${index}`)
    .filter((item) => typeof item === 'string');
  const [openSections, setOpenSections] = useState<string[]>([`item-${previousTree.join('-')}`, ...preExpandedItems]);

  useEffect(() => {
    if (activeTriggerRef.current) {
      setTimeout(() => {
        const element = activeTriggerRef.current;
        const scrollableContainer = element?.closest('.overflow-y-auto');

        if (element && scrollableContainer) {
          const elementRect = element.getBoundingClientRect();
          const containerRect = scrollableContainer.getBoundingClientRect();
          const scrollOffset = elementRect.top - containerRect.top - containerRect.height / 2 + elementRect.height / 2;

          scrollableContainer.scrollBy({
            top: scrollOffset,
            behavior: 'smooth',
          });
        }
      }, 200);
    }
  }, [activePage.tree]);

  const subtreeIdentifier = useMemo(
    () =>
      activePage.tree
        .slice(0, layer + 2)
        .map(({ index }) => index)
        .join('-'),
    [activePage.tree, layer],
  );

  useEffect(() => {
    if (activePage.tree.length > 1) {
      setOpenSections((openSections) => Array.from(new Set([...openSections, `item-${subtreeIdentifier}`])));
    }
  }, [activePage.tree.length, subtreeIdentifier]);

  const lang = new URLSearchParams(location.search).get('lang');

  return (
    <Accordion.Root
      type="multiple"
      className={cn(layer > 0 ? 'pl-3' : 'px-2 py-3')}
      value={openSections}
      onValueChange={(value) => {
        setOpenSections(value);
      }}
    >
      {content.map((page, index) => {
        const hasDeeperLayer = 'pages' in page && page.pages;
        const nodeIdentifier = `${tree.join('-')}-${index}`;

        const isSelected = 'link' in page && page.link === activePage.page.link;
        const isActive = subtreeIdentifier === nodeIdentifier;

        return (
          <Accordion.Item key={page.name} value={`item-${nodeIdentifier}`}>
            <Accordion.Trigger
              ref={isSelected ? activeTriggerRef : null}
              className={cn(accordionTriggerClassName, 'font-medium rounded-lg', {
                'border-l border-neutral-300 dark:border-neutral-1000 hover:border-neutral-500 dark:hover:border-neutral-800 rounded-l-none':
                  layer > 0,
                'text-neutral-1300 dark:text-neutral-000 font-bold': isActive,
                'border-orange-600 bg-orange-100 hover:bg-orange-100': isSelected,
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
                      'ui-text-label3 font-medium w-full h-full pr-5 flex justify-between items-center gap-2',
                      isActive && 'text-neutral-1300 dark:text-neutral-000 font-bold',
                    )}
                    tabIndex={-1}
                    {...(page.external && {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    })}
                    to={page.link + (lang ? `?lang=${lang}` : '')}
                  >
                    <span>{page.name}</span>
                    {page.external && (
                      <Icon
                        name="icon-gui-arrow-top-right-on-square-outline"
                        additionalCSS={cn(iconClassName, '-mr-[22px]')}
                        size="16px"
                      />
                    )}
                  </Link>
                )
              )}
              {hasDeeperLayer ? (
                <Icon name="icon-gui-chevron-right-outline" additionalCSS={iconClassName} size="12px" />
              ) : null}
            </Accordion.Trigger>
            {hasDeeperLayer && (
              <Accordion.Content className={cn(accordionContentClassName, layer === 0 && 'pt-1')}>
                <ChildAccordion content={page.pages} tree={[...tree, index]} />
              </Accordion.Content>
            )}
          </Accordion.Item>
        );
      })}
    </Accordion.Root>
  );
};

const LeftSidebar = ({ className, inHeader = false }: LeftSidebarProps) => {
  const { activePage } = useLayoutContext();

  const defaultPageItems = useMemo(
    () => (activePage.tree[0]?.index !== undefined ? [`item-${activePage.tree[0].index}`] : []),
    [activePage.tree],
  );

  const [openProducts, setOpenProducts] = useState(defaultPageItems);

  const {
    site: {
      siteMetadata: { externalScriptsData },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          externalScriptsData {
            inkeepSearchEnabled
          }
        }
      }
    }
  `);

  useEffect(() => {
    if (activePage.tree[0]?.index !== undefined) {
      setOpenProducts((openProducts) => Array.from(new Set([...openProducts, `item-${activePage.tree[0].index}`])));
    }
  }, [activePage.tree]);

  return (
    <div className={cn('sticky top-16 h-full', inHeader ? 'w-full' : 'w-[280px] hidden md:block', className)}>
      <div
        id={inHeader ? 'inkeep-search-mobile-mount' : 'inkeep-search-mount'}
        className={cn(
          'bg-neutral-100 dark:bg-neutral-1200',
          externalScriptsData.inkeepSearchEnabled && 'p-1',
          inHeader ? 'sticky top-0' : 'border-r border-neutral-300 dark:border-neutral-1000',
        )}
      ></div>
      <Accordion.Root
        type="multiple"
        value={openProducts}
        className={cn(
          'bg-neutral-000 dark:bg-neutral-1300 overflow-y-auto',
          inHeader
            ? 'w-full h-[calc(100dvh-64px-128px)]'
            : [
                'w-[280px] border-r border-neutral-300 dark:border-neutral-1000',
                externalScriptsData.inkeepSearchEnabled ? 'h-[calc(100dvh-64px-44px)]' : 'h-[calc(100dvh-64px)]',
              ],
        )}
        onValueChange={(value) => {
          setOpenProducts(value);
        }}
      >
        {Object.entries(productData).map(([productKey, productObj], index) => {
          const isSelected = activePage.tree[0]?.index === index;

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
                  'data-[state=open]:border-b data-[state=open]:sticky data-[state=open]:top-0 h-12 px-4 py-3 font-bold',
                  isSelected && 'text-neutral-1300 dark:text-neutral-000',
                )}
              >
                <div className="flex-1 flex items-center gap-2">
                  <Icon
                    name={isSelected ? productObj.nav.icon.open : productObj.nav.icon.closed}
                    additionalCSS={cn(
                      iconClassName,
                      isSelected
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
              <Accordion.Content className={accordionContentClassName}>
                <ChildAccordion content={[...productObj.nav.content, ...productObj.nav.api]} tree={[index]} />
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </div>
  );
};

export default LeftSidebar;
