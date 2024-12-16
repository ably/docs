import React, { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';
import { determineActivePage } from 'src/components/Layout/utils';
import data from 'src/data';
import { NavProduct } from 'src/data/nav/types';
import { ProductData, ProductKey } from 'src/data/types';
import { safeWindow } from 'src/utilities';

/**
 * LayoutContext
 *
 * selectedProduct - The currently selected product key. This changes when you click on a product in the sidebar.
 * setSelectedProduct - Function to update the selected product key.
 * activePageHierarchy - The hierarchy of the active page in the nav (i.e. the third link of the second section would be [2,3]). This is used to determine the active link in the sidebar.
 * setActivePageHierarchy - Function to update the active page hierarchy.
 * products - List of products with their navigation data.
 */

const LayoutContext = createContext<{
  selectedProduct: ProductKey | undefined;
  setSelectedProduct: React.Dispatch<React.SetStateAction<ProductKey | undefined>>;
  activePageHierarchy: number[];
  setActivePageHierarchy: React.Dispatch<React.SetStateAction<number[]>>;
  products: [ProductKey, NavProduct][];
}>({
  selectedProduct: undefined,
  setSelectedProduct: () => undefined,
  activePageHierarchy: [],
  setActivePageHierarchy: () => undefined,
  products: [],
});

export const LayoutProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const hierarchy = useMemo(() => determineActivePage(data, safeWindow.location.pathname) ?? [], []);
  const activeProduct = hierarchy[0];
  const products = Object.entries(data as ProductData).map((product) => [product[0], product[1].nav]) as [
    ProductKey,
    NavProduct,
  ][];

  const [selectedProduct, setSelectedProduct] = useState<ProductKey | undefined>(
    activeProduct ? products[activeProduct][0] : undefined,
  );
  const [activePageHierarchy, setActivePageHierarchy] = useState<number[]>(hierarchy);

  return (
    <LayoutContext.Provider
      value={{
        selectedProduct,
        setSelectedProduct,
        activePageHierarchy,
        setActivePageHierarchy,
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
