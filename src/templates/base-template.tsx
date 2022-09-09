import React, { useEffect, useMemo } from 'react';
import { navigate, Script, ScriptStrategy } from 'gatsby';
import Layout from '../components/Layout';
import Html from '../components/blocks/Html';
import { LeftSideBar } from '../components/StaticQuerySidebar';
import PageLanguageContext, { PageLanguagesContext } from '../contexts/page-language-context';
import Article from '../components/Article';
import { DEFAULT_LANGUAGE, IGNORED_LANGUAGES } from '../../data/createPages/constants';
import RightSidebar from '../components/Sidebar/RightSidebar';
import PageTitle from '../components/PageTitle';
import { PREFERRED_LANGUAGE_KEY } from '../utilities/language/constants';
import { createLanguageHrefFromDefaults, getLanguageDefaults } from '../components/common/language-defaults';
import { DOCUMENTATION_PATH } from '../../data/transform/constants';
import { AblyDocument, AblyDocumentMeta, AblyTemplateData } from './template-data';
import { storage } from 'src/utilities/browser/storage';
import { Head } from 'src/components/Head';

const getMetaDataDetails = (
  document: AblyDocument,
  prop: keyof AblyDocumentMeta,
  alternative: string | string[] = '',
) => (document?.meta?.[prop] ? document.meta[prop] : alternative);

const CANONICAL_ROOT = `https://www.ably.com${DOCUMENTATION_PATH}`;
const META_DESCRIPTION_FALLBACK = `Ably provides a suite of APIs to build, extend, and deliver powerful digital experiences in realtime. Organizations like Toyota, Bloomberg, HubSpot, and Hopin depend on Ably’s platform to offload the growing complexity of business-critical realtime data synchronization at global scale.`;
const NO_LANGUAGE = 'none';

const Template = ({
  location: { search },
  pageContext: { contentOrderedList, languages, version, contentMenu, slug, script },
  data: { document, versions },
}: AblyTemplateData) => {
  const params = new URLSearchParams(search);
  const language = params.get('lang') ?? DEFAULT_LANGUAGE;
  useEffect(() => {
    const preferredLanguage = storage.getItem(PREFERRED_LANGUAGE_KEY);
    if (preferredLanguage && language !== preferredLanguage) {
      const { isLanguageDefault, isPageLanguageDefault } = getLanguageDefaults(preferredLanguage, language);
      const href = createLanguageHrefFromDefaults(isPageLanguageDefault, isLanguageDefault, preferredLanguage);
      navigate(href);
    }
  }, []);

  const title = getMetaDataDetails(document, 'title') as string;
  const description = getMetaDataDetails(document, 'meta_description', META_DESCRIPTION_FALLBACK) as string;
  const menuLanguages = getMetaDataDetails(document, 'languages', languages) as string[];
  const canonical = `${CANONICAL_ROOT}${slug}`;

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
  const languagesExist = filteredLanguages.length > 1;
  const elements = useMemo(
    () =>
      contentOrderedList.map(
        // It is currently safe to use an index as a key.
        // We will need a unique key if we want to alter any of these by position.
        ({ data }, i) => <Html data={data} key={i} />,
      ),
    [contentOrderedList, language],
  );

  return (
    <PageLanguageContext.Provider value={language}>
      <PageLanguagesContext.Provider value={languages}>
        <Head title={title} canonical={canonical} description={description} />
        <Layout languages={filteredLanguages} versionData={versionData}>
          <LeftSideBar className="col-span-1 px-16" languages={languagesExist} />
          <Article>
            <PageTitle>{title}</PageTitle>
            <div className="col-span-3">{elements}</div>
          </Article>
          <RightSidebar className="col-span-1 px-16" languages={languagesExist} menuData={contentMenu[0]} />
        </Layout>
      </PageLanguagesContext.Provider>
      {script && <Script src={`../scripts/${slug}.js`} strategy={ScriptStrategy.idle} />}
    </PageLanguageContext.Provider>
  );
};

export default Template;
