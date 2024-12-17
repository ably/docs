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
 * activePage - The currently active page and its tree.
 * products - List of products with their navigation data.
 */

const LayoutContext = createContext<{
  selectedProduct: ProductKey | undefined;
  setSelectedProduct: React.Dispatch<React.SetStateAction<ProductKey | undefined>>;
  activePage: { tree: number[]; page: NavProductPage | undefined };
  products: [ProductKey, NavProduct][];
}>({
  selectedProduct: undefined,
  setSelectedProduct: () => undefined,
  activePage: { tree: [], page: undefined },
  products: [],
});

export const LayoutProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const activePage = useMemo(
    () => determineActivePage(data, location.pathname) ?? { tree: [], page: undefined },
    [location.pathname],
  );
  const activeProduct = activePage.tree[0];
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
        activePage,
        products,
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
