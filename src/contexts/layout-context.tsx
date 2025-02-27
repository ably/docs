import React, { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';
import { useLocation } from '@reach/router';
import { PageTreeNode, determineActivePage } from 'src/components/Layout/utils/nav';
import { productData } from 'src/data';
import { NavProduct } from 'src/data/nav/types';
import { ProductData, ProductKey } from 'src/data/types';
import { LanguageKey } from 'src/data/languages/types';

/**
 * LayoutContext
 *
 * activePage - The navigation tree that leads to the current page, and a list of languages referenced on the page.
 * products - List of products with their navigation data.
 */

const LayoutContext = createContext<{
  activePage: { tree: PageTreeNode[]; languages: LanguageKey[] };
  products: [ProductKey, NavProduct][];
  setLanguages: (languages: LanguageKey[]) => void;
}>({
  activePage: { tree: [], languages: [] },
  products: [],
  setLanguages: (languages) => {
    console.warn('setLanguages called without a provider', languages);
  },
});

export const LayoutProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const [languages, setLanguages] = useState<LanguageKey[]>([]);

  const activePage = useMemo(() => {
    const activePageData = determineActivePage(productData, location.pathname);
    return activePageData
      ? { ...activePageData, languages: activePageData.page.languages ?? languages }
      : { tree: [], languages: [] };
  }, [location.pathname, languages]);

  const products = useMemo(
    () =>
      Object.entries(productData satisfies ProductData).map((product) => [product[0], product[1].nav]) as [
        ProductKey,
        NavProduct,
      ][],
    [],
  );

  return (
    <LayoutContext.Provider
      value={{
        activePage,
        products,
        setLanguages,
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
