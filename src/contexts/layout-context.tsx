import React, { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';
import { useLocation } from '@reach/router';
import { PageTreeNode, determineActivePage } from 'src/components/Layout/utils/nav';
import { productData } from 'src/data';
import { NavProduct } from 'src/data/nav/types';
import { ProductData, ProductKey } from 'src/data/types';
import { LanguageKey } from 'src/data/languages/types';
import { getLayoutOptions } from 'src/components/Layout/utils/options';

/**
 * LayoutContext
 *
 * activePage - The navigation tree that leads to the current page, and a list of languages referenced on the page.
 * products - List of products with their navigation data.
 * options - Object containing boolean flags for UI options.
 * setLayoutOptions - Function to update the layout options.
 */

export type LayoutOptions = { noSidebar: boolean; hideSearchBar: boolean; template: string };

const LayoutContext = createContext<{
  activePage: { tree: PageTreeNode[]; languages: LanguageKey[] };
  products: [ProductKey, NavProduct][];
  options: LayoutOptions;
  setLayoutOptions: (options: LayoutOptions) => void;
  setLanguages: (languages: LanguageKey[]) => void;
}>({
  activePage: { tree: [], languages: [] },
  products: [],
  options: {
    noSidebar: false,
    hideSearchBar: false,
    template: 'base',
  },
  setLayoutOptions: (options) => {
    console.warn('setLayoutOptions called without a provider', options);
  },
  setLanguages: (languages) => {
    console.warn('setLanguages called without a provider', languages);
  },
});

export const LayoutProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const [languages, setLanguages] = useState<LanguageKey[]>([]);
  const [options, setOptions] = useState(getLayoutOptions(location.pathname));

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

  const setLayoutOptions = (newOptions: LayoutOptions) => {
    setOptions((prevOptions) => {
      if (
        prevOptions.noSidebar !== newOptions.noSidebar ||
        prevOptions.hideSearchBar !== newOptions.hideSearchBar ||
        prevOptions.template !== newOptions.template
      ) {
        return newOptions;
      }
      return prevOptions;
    });
  };

  return (
    <LayoutContext.Provider
      value={{
        activePage,
        products,
        options,
        setLayoutOptions,
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
