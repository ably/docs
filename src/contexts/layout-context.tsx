import React, { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';
import { useLocation } from '@reach/router';
import { determineActivePage } from 'src/components/Layout/utils';
import data from 'src/data';
import { NavProduct, NavProductPage } from 'src/data/nav/types';
import { ProductData, ProductKey } from 'src/data/types';

/**
 * LayoutContext
 *
 * selectedProduct - The currently selected product key. This changes when you click on a product in the sidebar.
 * setSelectedProduct - Function to update the selected product key.
 * activePageHierarchy - The hierarchy of the active page in the nav (i.e. the third link of the second section would be [2,3]). This is used to determine the active link in the sidebar.
 * setActivePageHierarchy - Function to update the active page hierarchy.
 * products - List of products with their navigation data.
 * activePage - The currently active page.
 */

const LayoutContext = createContext<{
  selectedProduct: ProductKey | undefined;
  setSelectedProduct: React.Dispatch<React.SetStateAction<ProductKey | undefined>>;
  activePageHierarchy: number[];
  products: [ProductKey, NavProduct][];
  activePage: NavProductPage | undefined;
}>({
  selectedProduct: undefined,
  setSelectedProduct: () => undefined,
  activePageHierarchy: [],
  products: [],
  activePage: undefined,
});

export const LayoutProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const { hierarchy: activePageHierarchy, page: activePage } = useMemo(
    () => determineActivePage(data, location.pathname) ?? { hierarchy: [], page: undefined },
    [location.pathname],
  );
  const activeProduct = activePageHierarchy[0];
  const products = useMemo(
    () =>
      Object.entries(data as ProductData).map((product) => [product[0], product[1].nav]) as [ProductKey, NavProduct][],
    [],
  );

  const [selectedProduct, setSelectedProduct] = useState<ProductKey | undefined>(
    activeProduct ? products[activeProduct][0] : undefined,
  );

  return (
    <LayoutContext.Provider
      value={{
        selectedProduct,
        setSelectedProduct,
        activePageHierarchy,
        products,
        activePage,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayoutContext must be used within a LayoutProvider');
  }
  return context;
};
