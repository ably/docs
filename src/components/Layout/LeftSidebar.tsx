import { useMemo } from 'react';
import { useLocation } from '@reach/router';
import cn from '@ably/ui/core/utils/cn';
import Accordion from '@ably/ui/core/Accordion';
import Icon from '@ably/ui/core/Icon';

import { NavProduct, NavProductContent, NavProductPages } from 'src/data/nav/types';
import {
  commonAccordionOptions,
  composeNavLinkId,
  formatNavLink,
  hierarchicalKey,
  PageTreeNode,
  sidebarAlignmentClasses,
} from './utils';
import { ProductKey } from 'src/data/types';
import Link from '../Link';
import { useLayoutContext } from 'src/contexts/layout-context';
import { AccordionData } from '@ably/ui/core/Accordion/types';

type ContentType = 'content' | 'api';

type LeftSidebarProps = {
  inHeader?: boolean;
};

const NavPage = ({
  depth,
  page,
  index,
  type,
  indentLinks,
  activePageTree,
  inHeader,
}: {
  depth: number;
  page: NavProductPages;
  index: number;
  type: ContentType;
  inHeader: boolean;
  indentLinks?: boolean;
  activePageTree?: PageTreeNode[];
}) => {
  const location = useLocation();
  const pageActive = 'link' in page && formatNavLink(page.link) === formatNavLink(location.pathname);
  const linkId = 'link' in page ? composeNavLinkId(page.link) : undefined;
  if ('link' in page) {
    const language = new URLSearchParams(location.search).get('lang');

    return (
      <Link
        key={hierarchicalKey(page.link, depth, activePageTree)}
        id={linkId}
        className={cn({
          'block ui-text-menu2 leading-relaxed md:leading-snug md:ui-text-menu4 text-neutral-1000 dark:text-neutral-300 md:text-neutral-900 dark:md:text-neutral-400 transition-colors hover:text-neutral-1300 active:text-neutral-800 focus-base':
            true,
          '!font-semibold': !pageActive,
          'text-neutral-900': !pageActive && type === 'content',
          'text-neutral-1000': !pageActive && type === 'api',
          '!font-bold text-neutral-1300': pageActive,
          'pl-12': indentLinks,
        })}
        target={page.external ? '_blank' : undefined}
        rel={page.external ? 'noopener noreferrer' : undefined}
        to={language ? `${page.link}?lang=${language}` : page.link}
      >
        {page.name}
        {page.external ? <Icon name="icon-gui-external-link" additionalCSS="ml-4" /> : null}
      </Link>
    );
  } else {
    return (
      <Accordion
        key={hierarchicalKey(page.name, depth, activePageTree)}
        data={[
          {
            name: page.name,
            content: page.pages.map((subPage) => (
              <div className="mb-8 first:mt-8" key={subPage.name}>
                <NavPage
                  page={subPage}
                  indentLinks
                  index={index}
                  activePageTree={activePageTree?.slice(1)}
                  type={type}
                  depth={depth + 1}
                  inHeader={inHeader}
                />
              </div>
            )),
          },
        ]}
        {...commonAccordionOptions(page, activePageTree?.[0]?.index === index ? 0 : undefined, false, inHeader)}
      />
    );
  }
};

const renderProductContent = (
  content: NavProductContent[],
  activePageTree: PageTreeNode[] | undefined,
  type: ContentType,
  inHeader: boolean,
) =>
  content.map((productContent, contentIndex) => (
    <div className="flex flex-col gap-[10px] md:gap-8" key={productContent.name}>
      <div className="ui-text-overline2 text-neutral-700">{productContent.name}</div>
      {productContent.pages.map((page, pageIndex) => (
        <NavPage
          key={'name' in page ? page.name : `page-group-${pageIndex}`}
          page={page}
          index={pageIndex}
          activePageTree={contentIndex === activePageTree?.[0]?.index ? activePageTree.slice(1) : undefined}
          type={type}
          depth={0}
          inHeader={inHeader}
        />
      ))}
    </div>
  ));

const constructProductNavData = (
  location: string,
  products: [ProductKey, NavProduct][],
  activePageTree: PageTreeNode[],
  selectedProduct: string | undefined,
  setSelectedProduct: React.Dispatch<React.SetStateAction<ProductKey | undefined>>,
  inHeader: boolean,
) => {
  const navData: AccordionData[] = products.map(([productKey, product]) => {
    const apiReferencesId = `${productKey}-api-references`;

    return {
      name: product.name,
      icon: selectedProduct === productKey ? product.icon.open : product.icon.closed,
      onClick: () => setSelectedProduct(productKey),
      content: (
        <div key={product.name} className="flex flex-col gap-20 px-16">
          <div className="flex flex-col gap-[10px] md:gap-8 mt-12">
            <p className="ui-text-overline2 text-neutral-700">{product.name}</p>
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
          </div>
          {renderProductContent(product.content, activePageTree, 'content', inHeader)}
          {product.api.length > 0 ? (
            <div
              id={apiReferencesId}
              className="flex flex-col gap-[10px] md:gap-8 rounded-lg bg-neutral-100 border border-neutral-300 p-16 mb-24 md:-mx-16"
            >
              {renderProductContent(product.api, activePageTree, 'api', inHeader)}
            </div>
          ) : null}
        </div>
      ),
    };
  });

  return navData;
};

const LeftSidebar = ({ inHeader = false }: LeftSidebarProps) => {
  const { selectedProduct, setSelectedProduct, activePage, products } = useLayoutContext();
  const location = useLocation();

  const productNavData = useMemo(
    () =>
      constructProductNavData(
        location.pathname,
        products,
        activePage.tree.slice(1),
        selectedProduct,
        setSelectedProduct,
        inHeader,
      ),
    [location.pathname, products, activePage.tree, selectedProduct, setSelectedProduct, inHeader],
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
        className={cn(
          !inHeader && [sidebarAlignmentClasses, 'hidden md:block md:-mx-16'],
          'overflow-y-scroll md:pr-16',
        )}
        id="left-nav"
        data={productNavData}
        {...commonAccordionOptions(null, activePage.tree[0]?.index, true, inHeader)}
      />
    </>
  );
};

export default LeftSidebar;
