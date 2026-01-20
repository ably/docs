'use client';

import React, { createContext, PropsWithChildren, useContext, useMemo, useState, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { stripSdkType } from '@ably/ui/core/CodeSnippet/languages';
import { productData } from '@/src/data';
import { LanguageKey } from '@/src/data/languages/types';
import { languageData, languageInfo } from '@/src/data/languages';
import { ProductKey } from '@/src/data/types';
import { NavProductContent, NavProductPage } from '@/src/data/nav/types';

export const DEFAULT_LANGUAGE = 'javascript';

export type PageTemplate = 'mdx' | 'examples' | 'api' | null;

export type Frontmatter = {
  title: string;
  meta_description: string;
  meta_keywords?: string;
  redirect_from?: string[];
  last_updated?: string;
  intro?: string;
};

export type PageContextType = {
  frontmatter?: Frontmatter;
};

export type ActivePage = {
  tree: Array<{ index: number; page: NavProductPage | NavProductContent }>;
  page: NavProductPage | { name: string; link: string; index?: boolean };
  languages: LanguageKey[];
  language: LanguageKey | null;
  product: ProductKey | null;
  template: PageTemplate;
};

const LayoutContext = createContext<{
  activePage: ActivePage;
  pageContext: PageContextType;
  setPageContext: (ctx: PageContextType) => void;
}>({
  activePage: {
    tree: [],
    page: { name: '', link: '' },
    languages: [],
    language: DEFAULT_LANGUAGE,
    product: null,
    template: null,
  },
  pageContext: {},
  setPageContext: () => {},
});

/**
 * Find the active page in the navigation tree
 */
function findActivePageInNav(
  pathname: string,
): { tree: Array<{ index: number; page: NavProductPage | NavProductContent }>; product: ProductKey } | null {
  const productKeys = Object.keys(productData) as ProductKey[];

  for (const productKey of productKeys) {
    const product = productData[productKey];
    const allContent = [...product.nav.content, ...product.nav.api];

    const result = findPageInTree(allContent, pathname, []);
    if (result) {
      return { tree: result, product: productKey };
    }
  }

  return null;
}

function findPageInTree(
  content: (NavProductPage | NavProductContent)[],
  pathname: string,
  currentTree: Array<{ index: number; page: NavProductPage | NavProductContent }>,
): Array<{ index: number; page: NavProductPage | NavProductContent }> | null {
  for (let i = 0; i < content.length; i++) {
    const item = content[i];
    const newTree = [...currentTree, { index: i, page: item }];

    if ('link' in item && item.link === pathname) {
      return newTree;
    }

    if ('pages' in item && item.pages) {
      const result = findPageInTree(item.pages, pathname, newTree);
      if (result) {
        return result;
      }
    }
  }

  return null;
}

/**
 * Determine the active language from URL params and available languages
 */
function determineActiveLanguage(
  activeLanguages: LanguageKey[],
  langParam: string | null,
  product: ProductKey | null,
): LanguageKey {
  if (langParam && Object.keys(languageInfo).includes(langParam) && activeLanguages.includes(langParam as LanguageKey)) {
    return langParam as LanguageKey;
  } else if (activeLanguages.length > 0 && product) {
    const relevantLanguages = activeLanguages.filter((lang) => Object.keys(languageData[product] || {}).includes(lang));
    return relevantLanguages[0] || DEFAULT_LANGUAGE;
  }

  return DEFAULT_LANGUAGE;
}

export interface LayoutProviderProps {
  pageLanguages?: string[];
}

export function LayoutProvider({ children, pageLanguages }: PropsWithChildren<LayoutProviderProps>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pageContext, setPageContextState] = useState<PageContextType>({});

  const setPageContext = useCallback((ctx: PageContextType) => {
    setPageContextState(ctx);
  }, []);

  const activePage = useMemo(() => {
    const activePageData = findActivePageInNav(pathname);

    let languages: LanguageKey[] = [];
    if (activePageData?.tree && activePageData.tree.length > 0) {
      const lastPage = activePageData.tree[activePageData.tree.length - 1].page;
      if ('languages' in lastPage && lastPage.languages) {
        languages = lastPage.languages as LanguageKey[];
      }
    }

    // Fallback to page languages from MDX frontmatter
    if (languages.length === 0 && pageLanguages) {
      languages = Array.from(new Set(pageLanguages.map(stripSdkType))) as LanguageKey[];
    }

    const langParam = searchParams.get('lang');
    const language = determineActiveLanguage(languages, langParam, activePageData?.product ?? null);

    return {
      tree: activePageData?.tree ?? [],
      page: activePageData?.tree?.at(-1)?.page ?? { name: '', link: '' },
      languages,
      language: languages.includes(language) ? language : null,
      product: activePageData?.product ?? null,
      template: 'mdx' as PageTemplate,
    };
  }, [pathname, searchParams, pageLanguages]);

  return (
    <LayoutContext.Provider
      value={{
        activePage,
        pageContext,
        setPageContext,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayoutContext() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayoutContext must be used within a LayoutProvider');
  }
  return context;
}
