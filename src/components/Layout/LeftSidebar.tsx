import { useEffect, useMemo } from 'react';
import { useLocation } from '@reach/router';
import cn from '@ably/ui/core/utils/cn';
import Accordion from '@ably/ui/core/Accordion';
import Icon from '@ably/ui/core/Icon';

import { NavProduct, NavProductContent, NavProductPages } from 'src/data/nav/types';
import { commonAccordionOptions, composeNavLinkId, formatNavLink, sidebarAlignmentClasses } from './utils';
import { ProductKey } from 'src/data/types';
import Link from '../Link';
import { useLayoutContext } from 'src/contexts/layout-context';

type ContentType = 'content' | 'api';

export const NavPage = ({
  page,
  indentLinks,
  index,
  activePageHierarchy,
  type,
}: {
  page: NavProductPages;
  indentLinks?: boolean;
  index: number;
  activePageHierarchy?: number[];
  type: ContentType;
}) => {
  const location = useLocation();
  const pageActive = 'link' in page && formatNavLink(page.link) === formatNavLink(location.pathname);
  const linkId = 'link' in page ? composeNavLinkId(page.link) : undefined;

  if ('link' in page) {
    return (
      <Link
        key={page.link}
        id={linkId}
        className={cn({
          'block ui-text-menu4 transition-colors hover:text-neutral-1300 active:text-neutral-800 focus-base': true,
          'font-semibold': !pageActive,
          'text-neutral-900': !pageActive && type === 'content',
          'text-neutral-1000': !pageActive && type === 'api',
          'font-bold text-neutral-1300': pageActive,
          'pl-12': indentLinks,
        })}
        target={page.external ? '_blank' : undefined}
        rel={page.external ? 'noopener noreferrer' : undefined}
        to={page.link}
      >
        {page.name}
        {page.external ? <Icon name="icon-gui-external-link" additionalCSS="ml-4" /> : null}
      </Link>
    );
  } else {
    return (
      <Accordion
        key={page.name}
        data={[
          {
            name: page.name,
            content: page.pages.map((subPage) => (
              <div className="mb-8 first:mt-8" key={subPage.name}>
                <NavPage
                  page={subPage}
                  indentLinks
                  index={index}
                  activePageHierarchy={activePageHierarchy?.slice(1)}
                  type={type}
                />
              </div>
            )),
          },
        ]}
        {...commonAccordionOptions(activePageHierarchy?.[0] === index ? 0 : undefined)}
      />
    );
  }
};

const renderProductContent = (
  content: NavProductContent[],
  activePageHierarchy: number[] | undefined,
  type: ContentType,
) =>
  content.map((productContent, contentIndex) => (
    <div className="flex flex-col gap-8" key={productContent.name}>
      <div className="ui-text-overline2 text-neutral-700">{productContent.name}</div>
      {productContent.pages.map((page, pageIndex) => (
        <NavPage
          key={'name' in page ? page.name : `page-group-${pageIndex}`}
          page={page}
          index={pageIndex}
          activePageHierarchy={contentIndex === activePageHierarchy?.[0] ? activePageHierarchy.slice(1) : undefined}
          type={type}
        />
      ))}
    </div>
  ));

const constructProductNavData = (
  location: string,
  products: [ProductKey, NavProduct][],
  activePageHierarchy: number[],
  selectedProduct: string | undefined,
  setSelectedProduct: React.Dispatch<React.SetStateAction<ProductKey | undefined>>,
) =>
  products.map(([productKey, product]) => ({
    name: product.name,
    icon: selectedProduct === productKey ? product.icon.open : product.icon.closed,
    onClick: () => setSelectedProduct(productKey),
    content: (
      <div key={product.name} className="flex flex-col gap-20">
        <div className="flex flex-col gap-8 mt-12">
          <p className="ui-text-overline2 text-neutral-700">{product.name}</p>
          {product.link ? (
            <Link
              to={product.link}
              id={composeNavLinkId(product.link)}
              className={cn('ui-text-menu4', {
                'font-bold': formatNavLink(product.link) === formatNavLink(location),
              })}
            >
              About {product.name}
            </Link>
          ) : null}
          {product.showJumpLink ? (
            <a href="#" className="text-gui-blue-default-light text-[11px]">
              Jump to API references
            </a>
          ) : null}
        </div>
        {renderProductContent(product.content, activePageHierarchy, 'content')}
        {product.api.length > 0 ? (
          <div className="flex flex-col gap-8 rounded-lg bg-neutral-100 border border-neutral-300 p-16 mb-24">
            {renderProductContent(product.api, activePageHierarchy, 'api')}
          </div>
        ) : null}
      </div>
    ),
  }));

export const LeftSidebar = () => {
  const { selectedProduct, setSelectedProduct, activePageHierarchy, products } = useLayoutContext();
  const location = useLocation();

  useEffect(() => {
    const element =
      typeof document !== 'undefined' ? document.getElementById(composeNavLinkId(location.pathname)) : null;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [location.pathname]);

  const productNavData = useMemo(
    () =>
      constructProductNavData(
        location.pathname,
        products,
        activePageHierarchy.slice(1),
        selectedProduct,
        setSelectedProduct,
      ),
    [location.pathname, products, activePageHierarchy, selectedProduct, setSelectedProduct],
  );

  return (
    <Accordion
      className={cn(sidebarAlignmentClasses, 'overflow-y-scroll hidden md:block md:pr-16')}
      id="left-nav"
      data={productNavData}
      {...commonAccordionOptions(activePageHierarchy[0], true)}
    />
  );
};
