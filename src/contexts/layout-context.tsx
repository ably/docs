import React, { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from '@reach/router';
import { ActivePage, determineActivePage } from 'src/components/Layout/utils/nav';
import { productData } from 'src/data';
import { LanguageKey } from 'src/data/languages/types';
import { languageData, languageInfo } from 'src/data/languages';
import { PageContextType } from 'src/components/Layout/Layout';

/**
 * LayoutContext
 *
 * activePage - The navigation tree that leads to the current page, and a list of languages referenced on the page.
 * setLanguage - Set the active language for the current page.
 */

export const DEFAULT_LANGUAGE = 'javascript';

const LayoutContext = createContext<{
  activePage: ActivePage;
  setLanguage: (language: LanguageKey) => void;
}>({
  activePage: {
    tree: [],
    page: { name: '', link: '' },
    languages: [],
    language: DEFAULT_LANGUAGE,
    product: null,
  },
  setLanguage: (language) => {
    console.warn('setLanguage called without a provider', language);
  },
});

const determineActiveLanguage = (activePageData: ActivePage, location: string): LanguageKey => {
  const params = new URLSearchParams(location);
  const langParam = params.get('lang') as LanguageKey;

  if (langParam && Object.keys(languageInfo).includes(langParam)) {
    return langParam;
  } else if (activePageData.product && activePageData.languages.length > 0) {
    const productLanguages = languageData[activePageData.product];
    const firstActiveLanguage = Object.keys(productLanguages ?? []).filter((lang) =>
      activePageData.languages.includes(lang as LanguageKey),
    )[0];

    return firstActiveLanguage as LanguageKey;
  }

  return DEFAULT_LANGUAGE;
};

// Function to get languages from DOM (for Textile pages)
const getLanguagesFromDOM = (): LanguageKey[] => {
  const languageBlocks = document.querySelectorAll('.docs-language-navigation');

  if (languageBlocks.length > 0) {
    const languagesSet = new Set<LanguageKey>();

    languageBlocks.forEach((element) => {
      const languages = element.getAttribute('data-languages');
      if (languages) {
        languages.split(',').forEach((language) => languagesSet.add(language as LanguageKey));
      }
    });

    return Array.from(languagesSet);
  }

  return [];
};

export const LayoutProvider: React.FC<PropsWithChildren<{ pageContext: PageContextType }>> = ({
  children,
  pageContext,
}) => {
  const location = useLocation();
  const [language, setLanguage] = useState<LanguageKey>(DEFAULT_LANGUAGE);
  const [domLanguages, setDomLanguages] = useState<LanguageKey[]>([]);

  // Effect to update DOM languages after render
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const languages = getLanguagesFromDOM();
      setDomLanguages(languages);
    }
  }, [location.pathname]); // Re-run when the path changes

  const activePage = useMemo(() => {
    const activePageData = determineActivePage(productData, location.pathname);

    if (!activePageData) {
      return {
        tree: [],
        page: { name: '', link: '' },
        languages: [],
        language,
        product: null,
      };
    }

    const activeLanguage = determineActiveLanguage(activePageData, location.search);

    // Use DOM languages if available, otherwise fall back to pageContext languages
    const activeLanguages = domLanguages.length > 0 ? domLanguages : pageContext.languages ?? [];

    return {
      ...activePageData,
      languages: (activePageData.page.languages as LanguageKey[]) ?? activeLanguages,
      language: activeLanguage,
    };
  }, [location.pathname, location.search, language, pageContext.languages, domLanguages]);

  return (
    <LayoutContext.Provider
      value={{
        activePage,
        setLanguage,
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
