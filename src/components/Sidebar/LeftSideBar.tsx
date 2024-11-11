import { useCallback, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import Accordion from '@ably/ui/core/Accordion';
import Icon from '@ably/ui/core/Icon';
import { AccordionIcons, AccordionOptions } from '@ably/ui/core/Accordion/types';

import data from './data/';
import { NavProductKey, NavProduct, NavProductPages, NavData } from './types';
import { determineActivePage } from './utils';

const commonAccordionOptions = (
  openIndex?: number,
  topLevel?: boolean,
): { icons: AccordionIcons; options: AccordionOptions } => ({
  icons: { open: { name: 'icon-gui-chevron-up' }, closed: { name: 'icon-gui-chevron-down' } },
  options: {
    autoClose: topLevel,
    headerCSS: 'h-40 text-[13px] pl-0',
    rowIconSize: '20px',
    iconSize: '20px',
    defaultOpenIndexes: openIndex !== undefined ? [openIndex] : [],
  },
});

const NavPage = ({
  page,
  indentLinks,
  index,
  activePageHierarchy,
}: {
  page: NavProductPages;
  indentLinks?: boolean;
  index: number;
  activePageHierarchy?: number[];
}) => {
  if ('link' in page) {
    const pageActive = page.link === window.location.pathname;

    return (
      <a
        key={page.link}
        className={cn({
          'block ui-text-p3 text-[13px]': true,
          'font-semibold text-neutral-900': !pageActive,
          'font-bold text-neutral-1300': pageActive,
          'pl-12': indentLinks,
        })}
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
              <div className="mb-8" key={subPage.name}>
                <NavPage page={subPage} indentLinks index={index} activePageHierarchy={activePageHierarchy?.slice(1)} />
              </div>
            )),
          },
        ]}
        {...commonAccordionOptions(activePageHierarchy?.[0] === index ? 0 : undefined)}
      />
    );
  }
};

export const LeftSideBar = () => {
  const [selectedProduct, setSelectedProduct] = useState<NavProductKey>();
  const activePageHierarchy = useMemo(() => determineActivePage(data, window.location.pathname) ?? [], []);
  const products = Object.entries(data as NavData) as [NavProductKey, NavProduct][];

  useEffect(() => {
    const activeProduct = activePageHierarchy[0];
    if (activeProduct !== undefined) {
      setSelectedProduct(products[activeProduct][0]);
    }
  }, [activePageHierarchy, products]);

  console.log(activePageHierarchy, selectedProduct);

  const constructProductNavData = useCallback(
    (products: [NavProductKey, NavProduct][], activePageHierarchy: number[], selectedProduct?: string) =>
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
              <a href="#" className="text-gui-blue-default-light text-[11px]">
                Jump to API references
              </a>
            </div>
            {product.content.map((productItemContent, contentIndex) => (
              <div className="flex flex-col gap-8" key={productItemContent.name}>
                <div className="ui-text-overline2 text-neutral-700">{productItemContent.name}</div>
                {productItemContent.pages.map((page, pageIndex) => (
                  <NavPage
                    key={'name' in page ? page.name : `page-group-${pageIndex}`}
                    page={page}
                    index={pageIndex}
                    activePageHierarchy={
                      contentIndex === activePageHierarchy[0] ? activePageHierarchy.slice(1) : undefined
                    }
                  />
                ))}
              </div>
            ))}
          </div>
        ),
      })),
    [],
  );

  const productNavData = useMemo(
    () => constructProductNavData(products, activePageHierarchy.slice(1), selectedProduct),
    [constructProductNavData, products, selectedProduct, activePageHierarchy],
  );

  return (
    <Accordion
      className="sticky w-240 ml-80 top-[112px] h-[calc(100vh-112px)] overflow-y-scroll"
      id="left-nav"
      data={productNavData}
      {...commonAccordionOptions(activePageHierarchy[0], true)}
    />
  );
};
