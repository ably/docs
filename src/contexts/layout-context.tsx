import React, { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { useLocation } from '@reach/router';
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

// Extract languages for a given prefix (e.g. 'client_' or 'agent_') from raw page languages
const extractPrefixedLanguages = (rawLanguages: string[], prefix: string): LanguageKey[] =>
  rawLanguages.filter((lang) => lang.startsWith(prefix)).map((lang) => lang.replace(prefix, '') as LanguageKey);

// Check if page content has client_/agent_ prefixed languages
const hasDualLanguageContent = (languages: string[]): boolean => {
  return languages.some((lang) => lang.startsWith('client_') || lang.startsWith('agent_'));
};

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
    clientLanguage: undefined,
    agentLanguage: undefined,
    clientLanguages: [],
    agentLanguages: [],
    isDualLanguage: false,
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

// Determine client language for dual-language pages
const determineClientLanguage = (location: string, validLanguages: LanguageKey[]): LanguageKey => {
  const params = new URLSearchParams(location);
  const clientLangParam = params.get('client_lang') as LanguageKey;

  if (clientLangParam && validLanguages.includes(clientLangParam)) {
    return clientLangParam;
  }

  return validLanguages.includes(DEFAULT_LANGUAGE as LanguageKey)
    ? DEFAULT_LANGUAGE
    : (validLanguages[0] ?? DEFAULT_LANGUAGE);
};

// Determine agent language for dual-language pages
const determineAgentLanguage = (location: string, validLanguages: LanguageKey[]): LanguageKey => {
  const params = new URLSearchParams(location);
  const agentLangParam = params.get('agent_lang') as LanguageKey;

  if (agentLangParam && validLanguages.includes(agentLangParam)) {
    return agentLangParam;
  }

  return validLanguages.includes(DEFAULT_LANGUAGE as LanguageKey)
    ? DEFAULT_LANGUAGE
    : (validLanguages[0] ?? DEFAULT_LANGUAGE);
};

export const LayoutProvider: React.FC<PropsWithChildren<{ pageContext: PageContextType }>> = ({
  children,
  pageContext,
}) => {
  const location = useLocation();

  const activePage = useMemo(() => {
    const activePageData = determineActivePage(productData, location.pathname);

    let languages: LanguageKey[] = [];
    if (activePageData?.page.languages) {
      languages = activePageData.page.languages; // Use language overrides from the nav data first if possible
    } else if (pageContext?.languages) {
      languages = Array.from(new Set(pageContext.languages.map(stripSdkType))) as LanguageKey[];
    }

    const language = determineActiveLanguage(languages, location.search, activePageData?.product ?? null);

    // Check if this page has dual-language content (client_/agent_ prefixed code blocks)
    const rawLanguages = pageContext?.languages ?? [];
    const isDualLanguage = hasDualLanguageContent(rawLanguages);

    const clientLanguages = isDualLanguage ? extractPrefixedLanguages(rawLanguages, 'client_') : [];
    const agentLanguages = isDualLanguage ? extractPrefixedLanguages(rawLanguages, 'agent_') : [];

    const clientLanguage = isDualLanguage ? determineClientLanguage(location.search, clientLanguages) : undefined;
    const agentLanguage = isDualLanguage ? determineAgentLanguage(location.search, agentLanguages) : undefined;

    return {
      tree: activePageData?.tree ?? [],
      page: activePageData?.page ?? { name: '', link: '' },
      languages,
      language: languages.includes(language) ? language : null,
      product: activePageData?.product ?? null,
      template: 'mdx' as PageTemplate,
      clientLanguage,
      agentLanguage,
      clientLanguages,
      agentLanguages,
      isDualLanguage,
    };
  }, [location.pathname, location.search, pageContext?.languages]);

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
