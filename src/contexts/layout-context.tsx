import React, { createContext, PropsWithChildren, useContext, useMemo, useState, useEffect } from 'react';
import { useLocation } from '@reach/router';
import { PageTreeNode, determineActivePage } from 'src/components/Layout/utils';
import data from 'src/data';
import { NavProduct } from 'src/data/nav/types';
import { ProductData, ProductKey } from 'src/data/types';
import { LanguageKey } from 'src/data/languages/types';

/**
 * LayoutContext
 *
 * selectedProduct - The currently selected product key. This changes when you click on a product in the sidebar.
 * setSelectedProduct - Function to update the selected product key.
 * activePage - The navigation tree that leads to the current page, and a list of languages referenced on the page.
 * products - List of products with their navigation data.
 */

const LayoutContext = createContext<{
  activePage: { tree: PageTreeNode[]; languages: LanguageKey[] };
  products: [ProductKey, NavProduct][];
}>({
  activePage: { tree: [], languages: [] },
  products: [],
});

export const LayoutProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const [languages, setLanguages] = useState<LanguageKey[]>([]);

  useEffect(() => {
    const languagesSet = new Set<LanguageKey>();

    document.querySelectorAll('.docs-language-navigation').forEach((element) => {
      const languages = element.getAttribute('data-languages');
      if (languages) {
        languages.split(',').forEach((language) => languagesSet.add(language as LanguageKey));
      }
    });

    setLanguages(Array.from(languagesSet));
  }, [location.pathname]);

  const activePage = useMemo(() => {
    const activePageData = determineActivePage(data, location.pathname);
    return activePageData ? { ...activePageData, languages } : { tree: [], languages: [] };
  }, [location.pathname, languages]);

  const products = useMemo(
    () =>
      Object.entries(data as ProductData).map((product) => [product[0], product[1].nav]) as [ProductKey, NavProduct][],
    [],
  );

  return (
    <LayoutContext.Provider
      value={{
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
