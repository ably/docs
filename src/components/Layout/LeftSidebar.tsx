import { useEffect, useMemo, useRef, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { useLocation } from '@reach/router';
import * as Accordion from '@radix-ui/react-accordion';
import cn from '@ably/ui/core/utils/cn';
import { HEADER_HEIGHT } from '@ably/ui/core/utils/heights';
import Icon from '@ably/ui/core/Icon';

import { productData } from 'src/data';
import { NavProductContent, NavProductPage } from 'src/data/nav/types';
import Link from '../Link';
import { useLayoutContext } from 'src/contexts/layout-context';
import { interactiveButtonClassName } from './utils/styles';
import { PRODUCT_BAR_HEIGHT } from './utils/heights';

// Build link preserving all language params across navigation
const buildLinkWithParams = (targetLink: string, searchParams: URLSearchParams): string => {
  const params = new URLSearchParams();

  const lang = searchParams.get('lang');
  const clientLang = searchParams.get('client_lang');
  const agentLang = searchParams.get('agent_lang');

  if (lang) {
    params.set('lang', lang);
  }
  if (clientLang) {
    params.set('client_lang', clientLang);
  }
  if (agentLang) {
    params.set('agent_lang', agentLang);
  }

  const paramString = params.toString();
  return paramString ? `${targetLink}?${paramString}` : targetLink;
};

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

  const [openSections, setOpenSections] = useState<string[]>([
    `item-${previousTree.join('-')}`,
    ...preExpandedItems,
  ]);

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

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  return (
    <Accordion.Root
      type="multiple"
      className={cn(layer > 1 ? 'pl-3' : '')}
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
                  layer > 1,
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
                    to={buildLinkWithParams(page.link, searchParams)}
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

/** Render top-level nav sections as static headings with their content always expanded. */
const SectionNav = ({ content, tree }: { content: (NavProductPage | NavProductContent)[]; tree: number[] }) => {
  return (
    <div className="px-3 pt-8 pb-3">
      {content.map((page, index) => {
        const hasDeeperLayer = 'pages' in page && page.pages;

        return (
          <div key={page.name} className={cn(index > 0 && 'mt-2 pt-2')}>
            <div className="ui-text-label2 font-bold text-neutral-1300 dark:text-neutral-000 py-[6px]">
              {page.name}
            </div>
            {hasDeeperLayer && <ChildAccordion content={page.pages} tree={[...tree, index]} />}
          </div>
        );
      })}
    </div>
  );
};

const LeftSidebar = ({ className, inHeader = false }: LeftSidebarProps) => {
  const { activePage } = useLayoutContext();

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

  // Resolve the active product's nav content
  const activeProductKey = activePage.product;
  const activeProduct = activeProductKey ? productData[activeProductKey] : null;
  const content = useMemo(
    () => (activeProduct ? [...activeProduct.nav.content, ...activeProduct.nav.api] : []),
    [activeProduct],
  );

  // The tree indices from the original sidebar started at [productIndex, sectionIndex, ...].
  // Since we no longer wrap in a product accordion, the tree now starts at [productIndex, sectionIndex, ...].
  // The ChildAccordion uses tree[1+] for section expansion, so we pass tree=[productIndex] as the base.
  const productIndex = activePage.tree[0]?.index ?? 0;

  // When the product bar is visible (non-platform products), add its height to the sticky offset
  const hasProductBar = activeProductKey !== null && activeProductKey !== 'platform';
  const stickyTopPx = HEADER_HEIGHT + (hasProductBar ? PRODUCT_BAR_HEIGHT : 0);
  const stickyTopStyle = inHeader ? undefined : { top: `${stickyTopPx}px` };
  const stickyTopClass = inHeader ? 'top-16' : '';

  return (
    <div
      className={cn('sticky h-full', stickyTopClass, inHeader ? 'w-full' : 'w-[312px] hidden md:block', className)}
      style={stickyTopStyle}
    >
      {inHeader && (
        <div
          id="inkeep-search-mobile-mount"
          className={cn(
            'bg-neutral-100 dark:bg-neutral-1200 sticky top-0',
            externalScriptsData.inkeepSearchEnabled && 'p-1',
          )}
        />
      )}
      <div
        className={cn(
          'bg-neutral-000 dark:bg-neutral-1300 overflow-x-hidden overflow-y-auto',
          inHeader
            ? 'w-full h-[calc(100dvh-64px-128px)]'
            : [
                'w-[312px] border-r border-neutral-300 dark:border-neutral-1000',
                `h-[calc(100dvh-${stickyTopPx}px)]`,
              ],
        )}
      >
        {content.length > 0 ? (
          <SectionNav content={content} tree={[productIndex]} />
        ) : (
          <div className="p-4 text-neutral-700 dark:text-neutral-600 ui-text-p3">
            Select a product above to browse documentation.
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftSidebar;
