import { Script, ScriptStrategy, navigate, withPrefix } from 'gatsby';
import { useEffect, useMemo } from 'react';

import Article from 'src/components/Article';
import { Head } from 'src/components/Head';
import Layout from 'src/components/Layout';
import PageTitle from 'src/components/PageTitle';
import { RightSidebarWrapper } from 'src/components/Sidebar/RightSidebar';
import Html from 'src/components/blocks/Html';
import {
  createLanguageHrefFromDefaults,
  getLanguageDefaults,
  languageIsUsable,
} from 'src/components/common/language-defaults';
import { PageLanguageProvider, PathnameContext, usePageLanguage } from 'src/contexts';

import { isEmpty } from 'lodash';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import {
  DEFAULT_LANGUAGE,
  DEFAULT_PREFERRED_LANGUAGE,
  IGNORED_LANGUAGES,
  REALTIME_SDK_INTERFACE,
  REST_SDK_INTERFACE,
} from '../../data/createPages/constants';
import { AblyDocument, AblyDocumentMeta, AblyTemplateData, ProductName } from './template-data';
import { useSiteMetadata } from 'src/hooks/use-site-metadata';

const getMetaDataDetails = (
  document: AblyDocument,
  prop: keyof AblyDocumentMeta,
  alternative: string | string[] = '',
) => (document?.meta?.[prop] ? document.meta[prop] : alternative);

const META_DESCRIPTION_FALLBACK = `Ably provides a suite of APIs to build, extend, and deliver powerful digital experiences in realtime. Organizations like Toyota, Bloomberg, HubSpot, and Hopin depend on Ably’s platform to offload the growing complexity of business-critical realtime data synchronization at global scale.`;
const NO_LANGUAGE = 'none';
const META_PRODUCT_FALLBACK = 'channels';

interface ITemplate extends AblyTemplateData {
  showProductNavigation: boolean;
}

const Template = ({
  location: { pathname, hash },
  pageContext: { contentOrderedList, languages, version, contentMenu, slug, script },
  data: { document },
  showProductNavigation = true,
  currentProduct,
}: ITemplate) => {
  const {
    currentLanguage: currentLanguageFromContext,
    handleCurrentLanguageChange,
    getPreferredLanguage,
  } = usePageLanguage();

  const title = getMetaDataDetails(document, 'title') as string;
  const description = getMetaDataDetails(document, 'meta_description', META_DESCRIPTION_FALLBACK) as string;
  const menuLanguages = getMetaDataDetails(document, 'languages', languages) as string[];
  const { siteUrl } = useSiteMetadata();
  const canonical = `${siteUrl}/${withPrefix(slug)}`.replace(/\/+$/, '');

  // when we don't get a product, peek into the metadata of the page for a default value
  currentProduct ??= getMetaDataDetails(document, 'product', META_PRODUCT_FALLBACK) as ProductName;

  const filteredLanguages = useMemo(
    () =>
      menuLanguages.includes(NO_LANGUAGE)
        ? []
        : menuLanguages
            .filter((language) => /^[^,]+$/.test(language))
            .filter((language) => !IGNORED_LANGUAGES.includes(language)),
    [menuLanguages],
  );

  const pageLanguage = filteredLanguages.includes(currentLanguageFromContext)
    ? currentLanguageFromContext
    : DEFAULT_LANGUAGE;
  const contentMenuFromAllLanguages = contentMenu[pageLanguage];
  const contentMenuFromRealtime = contentMenu[`${REALTIME_SDK_INTERFACE}_${pageLanguage}`];
  const contentMenuFromRest = contentMenu[`${REST_SDK_INTERFACE}_${pageLanguage}`];
  const contentMenuFromSDKInterface = !isEmpty(contentMenuFromRealtime) ? contentMenuFromRealtime : contentMenuFromRest;
  const contentMenuFromLangOrSDKInterface = !isEmpty(contentMenuFromAllLanguages)
    ? contentMenuFromAllLanguages
    : contentMenuFromSDKInterface;

  const contentMenuFromLanguage = contentMenuFromLangOrSDKInterface ?? [[]];

  const versionData = {
    version,
    versions: [],
    rootVersion: slug,
  };

  const elements = useMemo(
    () =>
      contentOrderedList.map(
        // It is currently safe to use an index as a key.
        // We will need a unique key if we want to alter any of these by position.
        ({ data }, i) => <Html data={data} key={i} />,
      ),
    [contentOrderedList],
  );

  useEffect(() => {
    if (currentLanguageFromContext === DEFAULT_LANGUAGE || !filteredLanguages.includes(currentLanguageFromContext)) {
      const preferredLanguage = getPreferredLanguage();

      if (filteredLanguages.length <= 1) {
        if (pageLanguage === DEFAULT_LANGUAGE) {
          return;
        }
        const href = `${pathname}${hash}`;
        navigate(href);
        return;
      }

      if (preferredLanguage) {
        /**
         * We must select a language specified in `pageLanguages`, otherwise
         * pages such as /docs/api/realtime-sdk/push?lang=ruby will show
         * broken content.
         */
        const usableLanguage = languageIsUsable(preferredLanguage, filteredLanguages)
          ? preferredLanguage
          : languageIsUsable(DEFAULT_PREFERRED_LANGUAGE, filteredLanguages)
            ? DEFAULT_PREFERRED_LANGUAGE
            : filteredLanguages[0];
        const { isLanguageDefault, isPageLanguageDefault } = getLanguageDefaults(usableLanguage, pageLanguage);

        const href = createLanguageHrefFromDefaults(isPageLanguageDefault, isLanguageDefault, usableLanguage);
        navigate(href);
        return;
      }
    } else {
      handleCurrentLanguageChange(pageLanguage);
    }
  }, [
    currentLanguageFromContext,
    filteredLanguages,
    getPreferredLanguage,
    handleCurrentLanguageChange,
    hash,
    pageLanguage,
    pathname,
  ]);

  return (
    <>
      <PathnameContext.Provider value={pathname}>
        <Head title={title} canonical={canonical} description={description} />

        <SidebarProvider>
          <Layout showProductNavigation={showProductNavigation} currentProduct={currentProduct}>
            <Article>
              <PageTitle>{title}</PageTitle>
              <div>{elements}</div>
            </Article>
            <RightSidebarWrapper
              menuData={contentMenuFromLanguage[0]}
              languages={filteredLanguages}
              versionData={versionData}
            />
          </Layout>
        </SidebarProvider>
      </PathnameContext.Provider>
      {script && <Script src={`/scripts/${slug}.js`} strategy={ScriptStrategy.idle} />}
    </>
  );
};

const TemplateWrapper = (props: ITemplate) => {
  return (
    <PageLanguageProvider search={props.location.search}>
      <Template {...props} />
    </PageLanguageProvider>
  );
};

export default TemplateWrapper;
