import React, { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from '@reach/router';
import { ActivePage, determineActivePage } from 'src/components/Layout/utils/nav';
import { productData } from 'src/data';
import { NavProduct } from 'src/data/nav/types';
import { ProductData, ProductKey } from 'src/data/types';
import { LanguageKey } from 'src/data/languages/types';
import { languageData } from 'src/data/languages';

/**
 * LayoutContext
 *
 * activePage - The navigation tree that leads to the current page, and a list of languages referenced on the page.
 * products - List of products with their navigation data.
 */

const LayoutContext = createContext<{
  activePage: ActivePage;
  products: [ProductKey, NavProduct][];
  setLanguages: (languages: LanguageKey[]) => void;
}>({
  activePage: {
    tree: [],
    page: { name: '', link: '' },
    languages: [],
    language: null,
    product: null,
  },
  products: [],
  setLanguages: (languages) => {
    console.warn('setLanguages called without a provider', languages);
  },
});

export const LayoutProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const [languages, setLanguages] = useState<LanguageKey[]>([]);
  const [language, setLanguage] = useState<string | null>(null);

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
    const activePageData = determineActivePage(productData, location.pathname);
    return activePageData
      ? {
          ...activePageData,
          languages: activePageData.page.languages ?? languages,
          language,
        }
      : {
          tree: [],
          page: { name: '', link: '' },
          languages: [],
          language,
          product: null,
        };
  }, [location.pathname, languages, language]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params.get('lang')) {
      setLanguage(params.get('lang'));
    } else if (activePage.product) {
      setLanguage(Object.keys(languageData[activePage.product])[0]);
    }
  }, [location.search, activePage.product]);

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
