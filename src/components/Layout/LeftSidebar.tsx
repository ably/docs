import { useMemo, useState, useEffect, useRef } from 'react';
import { useLocation } from '@reach/router';
import cn from '@ably/ui/core/utils/cn';
import Accordion from '@ably/ui/core/Accordion';
import Icon from '@ably/ui/core/Icon';

import { NavProduct, NavProductContent, NavProductPages } from 'src/data/nav/types';
import {
  commonAccordionOptions,
  composeNavLinkId,
  hierarchicalKey,
  PageTreeNode,
  sidebarAlignmentClasses,
  sidebarAlignmentStyles,
} from './utils/nav';
import { ProductKey } from 'src/data/types';
import Link from '../Link';
import { useLayoutContext } from 'src/contexts/layout-context';
import { AccordionData } from '@ably/ui/core/Accordion/types';
import { throttle } from 'lodash';

type ContentType = 'content' | 'api';

type LeftSidebarProps = {
  inHeader?: boolean;
};

const NavPage = ({
  depth,
  page,
  indices,
  type,
  indentLinks,
  inHeader,
}: {
  depth: number;
  page: NavProductPages;
  indices: number[];
  type: ContentType;
  inHeader: boolean;
  indentLinks?: boolean;
}) => {
  const location = useLocation();
  const linkId = 'link' in page ? composeNavLinkId(page.link) : undefined;
  const { activePage } = useLayoutContext();
  const treeMatch = indices.every((value, index) => value === activePage.tree[index]?.index);
  const pageActive = 'link' in page && treeMatch;

  if ('link' in page) {
    const language = new URLSearchParams(location.search).get('lang');

    return (
      <Link
        key={hierarchicalKey(page.link, depth, activePage.tree)}
        id={linkId}
        className={cn({
          'block ui-text-menu2 leading-relaxed md:leading-snug md:ui-text-menu4 text-neutral-1000 dark:text-neutral-300 md:text-neutral-900 dark:md:text-neutral-400 transition-colors hover:text-neutral-1300 active:text-neutral-800 focus-base':
            true,
          '!font-semibold': !pageActive,
          'text-neutral-900': !pageActive && type === 'content',
          'text-neutral-1000': !pageActive && type === 'api',
          '!font-bold !text-neutral-1300': pageActive,
          'pl-12': indentLinks,
        })}
        target={page.external ? '_blank' : undefined}
        rel={page.external ? 'noopener noreferrer' : undefined}
        to={language ? `${page.link}?lang=${language}` : page.link}
      >
        {page.name}
        {page.external ? <Icon name="icon-gui-arrow-top-right-on-square-outline" additionalCSS="ml-4" /> : null}
      </Link>
    );
  } else {
    return (
      <Accordion
        key={hierarchicalKey(page.name, depth, activePage.tree)}
        data={[
          {
            name: page.name,
            content: page.pages.map((subPage, subPageIndex) => (
              <div className="mb-8 first:mt-8" key={subPage.name}>
                <NavPage
                  page={subPage}
                  indentLinks
                  indices={[...indices, subPageIndex]}
                  type={type}
                  depth={depth + 1}
                  inHeader={inHeader}
                />
              </div>
            )),
          },
        ]}
        {...commonAccordionOptions(page, treeMatch ? 0 : undefined, false, inHeader)}
      />
    );
  }
};

const renderProductContent = (
  content: NavProductContent[],
  type: ContentType,
  inHeader: boolean,
  productIndex: number,
) =>
  content.map((productContent, productContentIndex) => (
    <div className="flex flex-col gap-[10px] md:gap-8" key={productContent.name}>
      <div className="ui-text-overline2 text-neutral-700">{productContent.name}</div>
      {productContent.pages.map((page, pageIndex) => (
        <NavPage
          key={'name' in page ? page.name : `page-group-${pageIndex}`}
          page={page}
          indices={[productIndex, productContentIndex, pageIndex]}
          type={type}
          depth={2}
          inHeader={inHeader}
        />
      ))}
    </div>
  ));

const constructProductNavData = (
  activePageTree: PageTreeNode[],
  products: [ProductKey, NavProduct][],
  inHeader: boolean,
): AccordionData[] => {
  const navData: AccordionData[] = products.map(([productKey, product], index) => {
    const apiReferencesId = `${productKey}-api-references`;

    return {
      name: product.name,
      icon: activePageTree[0]?.page.name === product.name ? product.icon.open : product.icon.closed,
      content: (
        <div key={product.name} className="flex flex-col gap-20 px-16 pt-12">
          {product.showJumpLink ? (
            <a
              href="#"
              className="text-gui-blue-default-light text-[11px]"
              onClick={(e) => {
                e.preventDefault();
                if (typeof document !== 'undefined') {
                  const element = document.getElementById(apiReferencesId);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                  }
                }
              }}
            >
              Jump to API references
            </a>
          ) : null}
          {renderProductContent(product.content, 'content', inHeader, index)}
          {product.api.length > 0 ? (
            <div
              id={apiReferencesId}
              className="flex flex-col gap-[10px] md:gap-8 rounded-lg bg-neutral-100 border border-neutral-300 p-16 mb-24 md:-mx-16"
            >
              {renderProductContent(product.api, 'api', inHeader, index)}
            </div>
          ) : null}
        </div>
      ),
    };
  });

  return navData;
};

const LeftSidebar = ({ inHeader = false }: LeftSidebarProps) => {
  const { activePage, products } = useLayoutContext();
  const [hasScrollbar, setHasScrollbar] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScrollbar = throttle(() => {
      if (sidebarRef.current) {
        setHasScrollbar(sidebarRef.current.offsetWidth > sidebarRef.current.clientWidth);
      }
    }, 150);

    checkScrollbar();
    window.addEventListener('resize', checkScrollbar);

    return () => {
      window.removeEventListener('resize', checkScrollbar);
    };
  }, []);

  const productNavData = useMemo(
    () => constructProductNavData(activePage.tree, products, inHeader),
    [activePage.tree, products, inHeader],
  );

  return (
    <>
      {inHeader ? (
        <a
          href="/docs"
          aria-label="Home"
          className="flex w-full items-center focus-base text-neutral-1000 dark:text-neutral-300 hover:text-neutral-1100 active:text-neutral-1000 transition-colors h-40 ui-text-menu1 font-bold px-16"
        >
          Home
        </a>
      ) : null}
      <Accordion
        ref={sidebarRef}
        className={cn(
          !inHeader && [sidebarAlignmentClasses, 'hidden md:block md:-mx-16'],
          'overflow-y-auto',
          hasScrollbar ? 'md:pr-8' : 'md:pr-16',
        )}
        style={sidebarAlignmentStyles}
        id="left-nav"
        data={productNavData}
        {...commonAccordionOptions(null, activePage.tree[0]?.index, true, inHeader)}
      />
    </>
  );
};

export default LeftSidebar;
