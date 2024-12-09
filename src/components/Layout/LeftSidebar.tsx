import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import cn from '@ably/ui/core/utils/cn';
import Accordion from '@ably/ui/core/Accordion';
import Icon from '@ably/ui/core/Icon';

import { NavProduct, NavProductContent, NavProductPages } from 'src/data/nav/types';
import { commonAccordionOptions, determineActivePage, sidebarAlignmentClasses, stripTrailingSlash } from './utils';
import data from 'src/data';
import { ProductData, ProductKey } from 'src/data/types';
import { safeWindow } from 'src/utilities';

type ContentType = 'content' | 'api';

export const LeftSidebarContext = createContext<{
  selectedProduct: ProductKey | undefined;
  setSelectedProduct: React.Dispatch<React.SetStateAction<ProductKey | undefined>>;
  setSelectedLinkId: React.Dispatch<React.SetStateAction<string | undefined>>;
}>({
  selectedProduct: undefined,
  setSelectedProduct: () => undefined,
  setSelectedLinkId: () => undefined,
});

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
  const { setSelectedLinkId } = useContext(LeftSidebarContext);
  const pageActive =
    'link' in page && stripTrailingSlash(page.link) === stripTrailingSlash(safeWindow.location.pathname);
  const linkId = 'link' in page ? page.link : undefined;
  useEffect(() => {
    if (pageActive) {
      setSelectedLinkId(linkId);
    }
  }, [linkId, pageActive, setSelectedLinkId]);

  if ('link' in page) {
    return (
      <a
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
        href={page.link}
      >
        {page.name}
        {page.external ? <Icon name="icon-gui-external-link" additionalCSS="ml-4" /> : null}
      </a>
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
          <a href="#" className="ui-text-p3 text-[13px]">
            About {product.name}
          </a>
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
  const [selectedProduct, setSelectedProduct] = useState<ProductKey>();
  const [selectedLinkId, setSelectedLinkId] = useState<string>();
  const activePageHierarchy = useMemo(() => determineActivePage(data, safeWindow.location.pathname) ?? [], []);
  const products = Object.entries(data as ProductData).map((product) => [product[0], product[1].nav]) as [
    ProductKey,
    NavProduct,
  ][];

  useEffect(() => {
    const activeProduct = activePageHierarchy[0];
    if (!selectedProduct && activeProduct !== undefined) {
      setSelectedProduct(products[activeProduct][0]);
    }
  }, [activePageHierarchy, products, selectedProduct]);

  useEffect(() => {
    if (selectedLinkId) {
      const element = typeof document !== `undefined` ? document.getElementById(selectedLinkId) : null;
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [selectedLinkId]);

  const productNavData = useMemo(
    () => constructProductNavData(products, activePageHierarchy.slice(1), selectedProduct, setSelectedProduct),
    [products, activePageHierarchy, selectedProduct],
  );

  return (
    <LeftSidebarContext.Provider value={{ selectedProduct, setSelectedProduct, setSelectedLinkId }}>
      <Accordion
        className={cn(sidebarAlignmentClasses, 'hidden md:block md:mr-16')}
        id="left-nav"
        data={productNavData}
        {...commonAccordionOptions(activePageHierarchy[0], true)}
      />
    </LeftSidebarContext.Provider>
  );
};
