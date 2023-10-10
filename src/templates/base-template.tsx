import { Script, ScriptStrategy, navigate } from 'gatsby';
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
import { PageLanguageContext, PageLanguagesContext, PathnameContext } from 'src/contexts';
import { safeWindow, srcFromDocsSite } from 'src/utilities';
import { PREFERRED_LANGUAGE_KEY } from 'src/utilities/language/constants';

import { isEmpty } from 'lodash';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import {
  DEFAULT_LANGUAGE,
  DEFAULT_PREFERRED_LANGUAGE,
  IGNORED_LANGUAGES,
  REALTIME_SDK_INTERFACE,
  REST_SDK_INTERFACE,
} from '../../data/createPages/constants';
import { DOCUMENTATION_PATH } from '../../data/transform/constants';
import { AblyDocument, AblyDocumentMeta, AblyTemplateData } from './template-data';

const getMetaDataDetails = (
  document: AblyDocument,
  prop: keyof AblyDocumentMeta,
  alternative: string | string[] = '',
) => (document?.meta?.[prop] ? document.meta[prop] : alternative);

const ABLY_MAIN_WEBSITE = process.env.GATSBY_ABLY_MAIN_WEBSITE ?? 'http://localhost:3000';

const CANONICAL_ROOT = `${ABLY_MAIN_WEBSITE}${DOCUMENTATION_PATH}`;
const META_DESCRIPTION_FALLBACK = `Ably provides a suite of APIs to build, extend, and deliver powerful digital experiences in realtime. Organizations like Toyota, Bloomberg, HubSpot, and Hopin depend on Ably’s platform to offload the growing complexity of business-critical realtime data synchronization at global scale.`;
const NO_LANGUAGE = 'none';
const META_PRODUCT_FALLBACK = 'channels';

const Template = ({
  location: { search, pathname, hash },
  pageContext: { contentOrderedList, languages, version, contentMenu, slug, script },
  data: { document, versions },
  showProductNavigation = true,
  currentProduct,
}: AblyTemplateData) => {
  const params = new URLSearchParams(search);
  const language = params.get('lang') ?? DEFAULT_LANGUAGE;

  const title = getMetaDataDetails(document, 'title') as string;
  const description = getMetaDataDetails(document, 'meta_description', META_DESCRIPTION_FALLBACK) as string;
  const menuLanguages = getMetaDataDetails(document, 'languages', languages) as string[];
  const canonical = `${CANONICAL_ROOT}${slug}`.replace(/\/+$/, '');

  // when we don't get a product, peek into the metadata of the page for a default value
  currentProduct ??= getMetaDataDetails(document, 'product', META_PRODUCT_FALLBACK) as string;

  const contentMenuFromAllLanguages = contentMenu[language];
  const contentMenuFromRealtime = contentMenu[`${REALTIME_SDK_INTERFACE}_${language}`];
  const contentMenuFromRest = contentMenu[`${REST_SDK_INTERFACE}_${language}`];
  const contentMenuFromSDKInterface = !isEmpty(contentMenuFromRealtime) ? contentMenuFromRealtime : contentMenuFromRest;
  const contentMenuFromLangOrSDKInterface = !isEmpty(contentMenuFromAllLanguages)
    ? contentMenuFromAllLanguages
    : contentMenuFromSDKInterface;

  const contentMenuFromLanguage = contentMenuFromLangOrSDKInterface ?? [[]];

  const versionData = {
    version,
    rootVersion: slug,
  };

  const filteredLanguages = useMemo(
    () =>
      menuLanguages.includes(NO_LANGUAGE)
        ? []
        : menuLanguages
            .filter((language) => /^[^,]+$/.test(language))
            .filter((language) => !IGNORED_LANGUAGES.includes(language)),
    [menuLanguages],
  );

  const languagesExist = filteredLanguages.length > 0;
  const elements = useMemo(
    () =>
      contentOrderedList.map(
        // It is currently safe to use an index as a key.
        // We will need a unique key if we want to alter any of these by position.
        ({ data }, i) => <Html data={data} key={i} />,
      ),
    [contentOrderedList, language, filteredLanguages, version, versions],
  );
  useEffect(() => {
    if (language === DEFAULT_LANGUAGE || !filteredLanguages.includes(language)) {
      const preferredLanguage = safeWindow.localStorage.getItem(PREFERRED_LANGUAGE_KEY);

      if (filteredLanguages.length <= 1) {
        if (language === DEFAULT_LANGUAGE) {
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
        const { isLanguageDefault, isPageLanguageDefault } = getLanguageDefaults(usableLanguage, language);

        const href = createLanguageHrefFromDefaults(isPageLanguageDefault, isLanguageDefault, usableLanguage);
        navigate(href);
        return;
      }
    } else {
      safeWindow.localStorage.setItem(PREFERRED_LANGUAGE_KEY, language);
    }
  }, []);

  return (
    <PageLanguageContext.Provider value={language}>
      <PageLanguagesContext.Provider value={languages}>
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
      </PageLanguagesContext.Provider>
      {script && <Script src={srcFromDocsSite(`/scripts/${slug}.js`)} strategy={ScriptStrategy.idle} />}
    </PageLanguageContext.Provider>
  );
};

export default Template;
