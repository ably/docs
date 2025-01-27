import React, { createContext, PropsWithChildren, useContext, useMemo, useState, useEffect } from 'react';
import { useLocation } from '@reach/router';
import { PageTreeNode, determineActivePage } from 'src/components/Layout/utils/nav';
import data from 'src/data';
import { NavProduct } from 'src/data/nav/types';
import { ProductData, ProductKey } from 'src/data/types';
import { LanguageKey } from 'src/data/languages/types';

/**
 * LayoutContext
 *
 * activePage - The navigation tree that leads to the current page, and a list of languages referenced on the page.
 * products - List of products with their navigation data.
 * options - Object containing boolean flags for UI options.
 * setLayoutOptions - Function to update the layout options.
 */

export type LayoutOptions = { noSidebar: boolean; hideSearchBar: boolean };

const LayoutContext = createContext<{
  activePage: { tree: PageTreeNode[]; languages: LanguageKey[] };
  products: [ProductKey, NavProduct][];
  options: {
    noSidebar: boolean;
    hideSearchBar: boolean;
  };
  setLayoutOptions: (options: { noSidebar: boolean; hideSearchBar: boolean }) => void;
}>({
  activePage: { tree: [], languages: [] },
  products: [],
  options: {
    noSidebar: false,
    hideSearchBar: false,
  },
  setLayoutOptions: (options) => {
    console.warn('setLayoutOptions called without a provider', options);
  },
});

export const LayoutProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const [languages, setLanguages] = useState<LanguageKey[]>([]);
  const [options, setOptions] = useState({ noSidebar: false, hideSearchBar: false });

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

  const setLayoutOptions = (newOptions: { noSidebar: boolean; hideSearchBar: boolean }) => {
    setOptions((prevOptions) => {
      if (prevOptions.noSidebar !== newOptions.noSidebar || prevOptions.hideSearchBar !== newOptions.hideSearchBar) {
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
