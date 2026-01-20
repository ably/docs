'use client';

import React, { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { stripSdkType } from '@ably/ui/core/CodeSnippet/languages';
import { ActivePage, determineActivePage, PageTemplate } from 'src/components/Layout/utils/nav';
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
    template: null,
  },
});

const determineActiveLanguage = (
  activeLanguages: LanguageKey[],
  location: string,
  product: ProductKey | null,
): LanguageKey => {
  const params = new URLSearchParams(location);
  const langParam = params.get('lang') as LanguageKey;

  if (langParam && Object.keys(languageInfo).includes(langParam) && activeLanguages.includes(langParam)) {
    return langParam;
  } else if (activeLanguages.length > 0 && product) {
    const relevantLanguages = activeLanguages.filter((lang) => Object.keys(languageData[product]).includes(lang));
    return relevantLanguages[0];
  }

  return DEFAULT_LANGUAGE;
};

export const LayoutProvider: React.FC<PropsWithChildren<{ pageContext: PageContextType }>> = ({
  children,
  pageContext,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activePage = useMemo(() => {
    const activePageData = determineActivePage(productData, pathname);

    let languages: LanguageKey[] = [];
    if (activePageData?.page.languages) {
      languages = activePageData.page.languages; // Use language overrides from the nav data first if possible
    } else if (pageContext?.languages) {
      languages = Array.from(new Set(pageContext.languages.map(stripSdkType))) as LanguageKey[];
    }

    const language = determineActiveLanguage(languages, searchParams.toString(), activePageData?.product ?? null);

    return {
      tree: activePageData?.tree ?? [],
      page: activePageData?.page ?? { name: '', link: '' },
      languages,
      language: languages.includes(language) ? language : null,
      product: activePageData?.product ?? null,
      template: 'mdx' as PageTemplate,
    };
  }, [pathname, searchParams, pageContext?.languages]);

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
