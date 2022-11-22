import React, { useEffect, useMemo } from 'react';
import { navigate, Script, ScriptStrategy } from 'gatsby';

import { Head } from 'src/components/Head';
import { safeWindow, srcFromDocsSite } from 'src/utilities';
import { PathnameContext, PageLanguageContext, PageLanguagesContext } from 'src/contexts';
import { createLanguageHrefFromDefaults, getLanguageDefaults } from 'src/components/common/language-defaults';
import { PREFERRED_LANGUAGE_KEY } from 'src/utilities/language/constants';
import { RightSidebar, RightSidebarMobile } from 'src/components/Sidebar/RightSidebar';
import Article from 'src/components/Article';
import Html from 'src/components/blocks/Html';
import Layout from 'src/components/Layout';
import PageTitle from 'src/components/PageTitle';

import { DOCUMENTATION_PATH } from '../../data/transform/constants';
import { DEFAULT_LANGUAGE, IGNORED_LANGUAGES } from '../../data/createPages/constants';
import { AblyDocument, AblyDocumentMeta, AblyTemplateData } from './template-data';

const getMetaDataDetails = (
  document: AblyDocument,
  prop: keyof AblyDocumentMeta,
  alternative: string | string[] = '',
) => (document?.meta?.[prop] ? document.meta[prop] : alternative);

const CANONICAL_ROOT = `https://www.ably.com${DOCUMENTATION_PATH}`;
const META_DESCRIPTION_FALLBACK = `Ably provides a suite of APIs to build, extend, and deliver powerful digital experiences in realtime. Organizations like Toyota, Bloomberg, HubSpot, and Hopin depend on Ably’s platform to offload the growing complexity of business-critical realtime data synchronization at global scale.`;
const NO_LANGUAGE = 'none';

const Template = ({
  location: { search, pathname, hash },
  pageContext: { contentOrderedList, languages, version, contentMenu, slug, script },
  data: { document, versions },
}: AblyTemplateData) => {
  const params = new URLSearchParams(search);
  const language = params.get('lang') ?? DEFAULT_LANGUAGE;

  const title = getMetaDataDetails(document, 'title') as string;
  const description = getMetaDataDetails(document, 'meta_description', META_DESCRIPTION_FALLBACK) as string;
  const menuLanguages = getMetaDataDetails(document, 'languages', languages) as string[];
  const canonical = `${CANONICAL_ROOT}${slug}`;

  const contentMenuFromLanguage = contentMenu[language];

  const versionData = {
    versions: versions.edges,
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
  const languagesExist = filteredLanguages.length > 0 || (versionData && versionData.versions.length > 0);
  const elements = useMemo(
    () =>
      contentOrderedList.map(
        // It is currently safe to use an index as a key.
        // We will need a unique key if we want to alter any of these by position.
        ({ data }, i) => <Html data={data} key={i} />,
      ),
    [contentOrderedList, language],
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
        const { isLanguageDefault, isPageLanguageDefault } = getLanguageDefaults(preferredLanguage, language);
        const href = createLanguageHrefFromDefaults(isPageLanguageDefault, isLanguageDefault, preferredLanguage);
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
          <Layout languages={filteredLanguages} versionData={versionData}>
            <Article>
              <RightSidebarMobile menuData={contentMenuFromLanguage[0]} languages={languagesExist} />
              <PageTitle>{title}</PageTitle>
              <div>{elements}</div>
            </Article>
            <RightSidebar languages={languagesExist} menuData={contentMenuFromLanguage[0]} />
          </Layout>
        </PathnameContext.Provider>
      </PageLanguagesContext.Provider>
      {script && <Script src={srcFromDocsSite(`/scripts/${slug}.js`)} strategy={ScriptStrategy.idle} />}
    </PageLanguageContext.Provider>
  );
};

export default Template;
