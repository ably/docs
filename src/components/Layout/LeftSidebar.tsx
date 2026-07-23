import { useEffect, useMemo, useRef, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { useLocation } from '@reach/router';
import * as Accordion from '@radix-ui/react-accordion';
import cn from 'src/utilities/cn';
import { HEADER_HEIGHT } from 'src/utilities/heights';

import { productData } from 'src/data';
import { ProductKey } from 'src/data/types';
import { NavProductContent, NavProductPage } from 'src/data/nav/types';
import Link from '../Link';
import { useLayoutContext } from 'src/contexts/layout-context';
import { interactiveButtonClassName } from './utils/styles';
import { PRODUCT_BAR_HEIGHT } from './utils/heights';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

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
  // Override which product's nav to render. Omit to follow the active page (default,
  // desktop). Pass a key to force that product (e.g. the mobile Platform/Products tabs),
  // or null to show the "select a product" placeholder.
  product?: ProductKey | null;
};

const accordionContentClassName =
  'overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up p-1 -m-0.5';

const accordionTriggerClassName = cn(
  interactiveButtonClassName,
  // Layout & display
  'flex items-center justify-between gap-2 p-0 pr-2 w-full text-left ui-text-label3 rounded-none',
  // Icon animation
  '[&[data-state=open]>svg]:rotate-90',
);

const accordionLinkClassName = 'pl-3 py-1';

const sectionHeadingClassName =
  'ui-text-label2 font-semibold text-neutral-1300 dark:text-neutral-000 pb-2 pt-5 pl-3 pr-2';

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
    if (!activeTriggerRef.current) {
      return;
    }

    const timerId = setTimeout(() => {
      const element = activeTriggerRef.current;
      const scrollableContainer = element?.closest('.overflow-y-auto');

      if (element && scrollableContainer) {
        const elementRect = element.getBoundingClientRect();
        const containerRect = scrollableContainer.getBoundingClientRect();
        const isVisible = elementRect.top >= containerRect.top && elementRect.bottom <= containerRect.bottom;

        if (!isVisible) {
          const scrollOffset = elementRect.top - containerRect.top - containerRect.height / 2 + elementRect.height / 2;
          scrollableContainer.scrollBy({
            top: scrollOffset,
            behavior: 'smooth',
          });
        }
      }
    }, 200);

    return () => clearTimeout(timerId);
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
                'border-l border-neutral-300 dark:border-neutral-1100 hover:border-neutral-500 dark:hover:border-neutral-800 rounded-l-none':
                  layer > 1,
                'pl-3': layer <= 1,
                'text-neutral-1300 dark:text-neutral-000 font-semibold': isActive,
                'border-orange-600 bg-orange-100 hover:bg-orange-100 dark:bg-orange-1100 dark:hover:bg-orange-1100 dark:text-neutral-000':
                  isSelected,
              })}
            >
              {hasDeeperLayer ? (
                <div className={cn(layer > 1 ? accordionLinkClassName : 'py-1', 'flex-1')}>
                  <span>{page.name}</span>
                </div>
              ) : (
                'link' in page && (
                  <Link
                    className={cn(
                      layer > 1 ? accordionLinkClassName : 'py-1',
                      'ui-text-label3 font-medium w-full h-full pr-5 flex justify-between items-center gap-2',
                      isActive && 'text-neutral-1300 dark:text-neutral-000 font-semibold',
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
                      <ArrowTopRightOnSquareIcon
                        className={cn('size-[16px]', cn(iconClassName, '-mr-[22px]'))}
                        aria-hidden
                      />
                    )}
                  </Link>
                )
              )}
              {hasDeeperLayer ? <ChevronRightIcon className={cn('size-[12px]', iconClassName)} aria-hidden /> : null}
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
  const { activePage } = useLayoutContext();
  const location = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  return (
    <div className="p-3">
      {content.map((page, index) => {
        const hasDeeperLayer = 'pages' in page && page.pages;

        // A top-level entry with a link but no child pages (e.g. a product's pricing page)
        // is a destination, not a section, so render it as a clickable link rather than a
        // static heading.
        if (!hasDeeperLayer && 'link' in page && page.link) {
          const isSelected = page.link === activePage.page.link;

          return (
            <Link
              key={page.name}
              to={buildLinkWithParams(page.link, searchParams)}
              className={cn(
                'ui-text-label2 font-semibold text-neutral-1300 dark:text-neutral-000',
                'mt-4 flex items-center justify-between gap-2 rounded-lg py-1.5 pl-3 pr-2',
                'hover:bg-neutral-100 dark:hover:bg-neutral-1200',
                isSelected && 'bg-orange-100 hover:bg-orange-100 dark:bg-orange-1100 dark:hover:bg-orange-1100',
              )}
              {...(page.external && {
                target: '_blank',
                rel: 'noopener noreferrer',
              })}
            >
              <span>{page.name}</span>
              {page.external && <ArrowTopRightOnSquareIcon className={cn('size-[16px]', iconClassName)} aria-hidden />}
            </Link>
          );
        }

        return (
          <div key={page.name}>
            <div className={sectionHeadingClassName}>{page.name}</div>
            {hasDeeperLayer && <ChildAccordion content={page.pages} tree={[...tree, index]} />}
          </div>
        );
      })}
    </div>
  );
};

const LeftSidebar = ({ className, inHeader = false, product }: LeftSidebarProps) => {
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

  // Resolve which product's nav content to render. An explicit `product` prop (including
  // null) overrides the active page; omitting it follows the active page as before.
  const activeProductKey = product === undefined ? activePage.product : product;
  const activeProduct = activeProductKey ? productData[activeProductKey] : null;
  const content = useMemo(
    () => (activeProduct ? [...activeProduct.nav.content, ...activeProduct.nav.api] : []),
    [activeProduct],
  );

  // SectionNav passes tree=[productIndex] as the base so ChildAccordion's expansion keys align with activePage.tree.
  const productIndex = activePage.tree[0]?.index ?? 0;

  const stickyTopPx = HEADER_HEIGHT + (activePage.hasProductBar ? PRODUCT_BAR_HEIGHT : 0);
  const stickyTopStyle = inHeader ? undefined : { top: `${stickyTopPx}px`, height: `calc(100dvh - ${stickyTopPx}px)` };

  return (
    <div
      // In the mobile menu the sidebar flows at natural height inside the menu's single
      // scroll area; on desktop it's a sticky, self-scrolling column.
      className={cn(inHeader ? 'w-full' : 'sticky w-[300px] hidden md:block', className)}
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
          'bg-neutral-000 dark:bg-neutral-1300 overflow-x-hidden',
          inHeader
            ? 'w-full'
            : 'w-[300px] h-full overflow-y-auto border-r border-neutral-300 dark:border-neutral-1100 pt-2',
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
