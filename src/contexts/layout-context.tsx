import React, { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from '@reach/router';
import { ActivePage, determineActivePage } from 'src/components/Layout/utils/nav';
import { productData } from 'src/data';
import { LanguageKey } from 'src/data/languages/types';
import { languageData, languageInfo } from 'src/data/languages';
import { PageContextType } from 'src/components/Layout/Layout';
import { ProductKey } from 'src/data/types';

/**
 * LayoutContext
 *
 * activePage - The navigation tree that leads to the current page, and a list of languages referenced on the page.
 */

export const DEFAULT_LANGUAGE = 'javascript';

const LayoutContext = createContext<{
  activePage: ActivePage;
}>({
  activePage: {
    tree: [],
    page: { name: '', link: '' },
    languages: [],
    language: DEFAULT_LANGUAGE,
    product: null,
  },
});

const determineActiveLanguage = (
  activeLanguages: LanguageKey[],
  location: string,
  product: ProductKey | null,
): LanguageKey => {
  const params = new URLSearchParams(location);
  const langParam = params.get('lang') as LanguageKey;

  if (langParam && Object.keys(languageInfo).includes(langParam)) {
    return langParam;
  } else if (activeLanguages.length > 0 && product) {
    const relevantLanguages = activeLanguages.filter((lang) => Object.keys(languageData[product]).includes(lang));
    return relevantLanguages[0];
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
  const [domLanguages, setDomLanguages] = useState<LanguageKey[]>([]);

  // Effect to update DOM languages after render
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const languages = getLanguagesFromDOM();
      setDomLanguages(languages);
    }
  }, [location.pathname]); // Re-run when the path changes

  const activePage = useMemo(() => {
    // Use DOM languages if available, otherwise fall back to pageContext languages
    const activeLanguages = (domLanguages.length > 0 ? domLanguages : pageContext.languages ?? []) as LanguageKey[];
    const activePageData = determineActivePage(productData, location.pathname);
    const activeLanguage = determineActiveLanguage(activeLanguages, location.search, activePageData?.product ?? null);

    if (!activePageData) {
      return {
        tree: [],
        page: { name: '', link: '' },
        languages: [],
        language: activeLanguage,
        product: null,
      };
    }

    return {
      ...activePageData,
      languages: (activePageData.page.languages as LanguageKey[]) ?? activeLanguages,
      language: activeLanguage,
    };
  }, [location.pathname, location.search, pageContext.languages, domLanguages]);

  return (
    <LayoutContext.Provider
      value={{
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
