import React, { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { graphql, navigate, Script, ScriptStrategy } from 'gatsby';
import Layout from '../components/Layout';
import Html from '../components/blocks/Html';
import { LeftSideBar } from '../components/StaticQuerySidebar';
import PageLanguageContext, { PageLanguagesContext } from '../contexts/page-language-context';
import Article from '../components/Article';
import { DEFAULT_LANGUAGE, IGNORED_LANGUAGES } from '../../data/createPages/constants';
import VersionMenu from '../components/Menu/VersionMenu';
import RightSidebar from '../components/Sidebar/RightSidebar';
import PageTitle from '../components/PageTitle';
import { DOCUMENTATION_PATH } from '../../data/transform/constants';
import { safeWindow } from '../utilities/browser/safe-window';
import { PREFERRED_LANGUAGE_KEY } from '../utilities/language/constants';
import { createLanguageHrefFromDefaults, getLanguageDefaults } from '../components/common/language-defaults';

const getMetaDataDetails = (document, prop, alternative = '') =>
  document && document.meta && document.meta[prop] ? document.meta[prop] : alternative;

const CANONICAL_ROOT = `https://www.ably.com${DOCUMENTATION_PATH}`;
const META_DESCRIPTION_FALLBACK = `Ably provides a suite of APIs to build, extend, and deliver powerful digital experiences in realtime. Organizations like Toyota, Bloomberg, HubSpot, and Hopin depend on Ably’s platform to offload the growing complexity of business-critical realtime data synchronization at global scale.`;

const Document = ({
  location: { search },
  pageContext: { contentOrderedList, languages, version, contentMenu, slug, script },
  data: { document, versions },
}) => {
  useEffect(() => {
    const preferredLanguage = safeWindow.localStorage.getItem(PREFERRED_LANGUAGE_KEY);
    if (preferredLanguage && language !== preferredLanguage) {
      const { isLanguageDefault, isPageLanguageDefault } = getLanguageDefaults(preferredLanguage, language);
      const href = createLanguageHrefFromDefaults(isPageLanguageDefault, isLanguageDefault, preferredLanguage);
      navigate(href);
    }
  }, []);

  const title = getMetaDataDetails(document, 'title');
  const description = getMetaDataDetails(document, 'meta_description', META_DESCRIPTION_FALLBACK);
  const canonical = `${CANONICAL_ROOT}${slug}`;

  const params = new URLSearchParams(search);
  const language = params.get('lang') ?? DEFAULT_LANGUAGE;

  const filteredLanguages = useMemo(
    () =>
      languages
        .filter((language) => /^[^,]+$/.test(language))
        .filter((language) => !IGNORED_LANGUAGES.includes(language)),
    [languages],
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
        <Helmet>
          <title>{title}</title>
          <meta property="og:title" content={title} />
          <meta property="twitter:title" content={title} />
          <link rel="canonical" href={canonical} />
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta name="twitter:description" content={description} />
        </Helmet>
        <Layout languages={filteredLanguages}>
          <LeftSideBar className="col-span-1 px-16" languages={languagesExist} />
          <Article columns={3}>
            <PageTitle id="title">{title}</PageTitle>
            <VersionMenu versions={versions.edges} version={version} rootVersion={slug} />
            <div className="col-span-3">{elements}</div>
          </Article>
          <RightSidebar className="col-span-1 px-16" languages={languagesExist} menuData={contentMenu[0]} />
        </Layout>
      </PageLanguagesContext.Provider>
      {script && <Script src={`../scripts/${slug}.js`} strategy={ScriptStrategy.idle} />}
    </PageLanguageContext.Provider>
  );
};

Document.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  pageContext: PropTypes.object,
  data: PropTypes.object,
};

export default Document;

export const query = graphql`
  query ($slug: String!) {
    document: fileHtml(slug: { eq: $slug }) {
      meta {
        title
      }
    }
    versions: allFileHtmlVersion(filter: { parentSlug: { eq: $slug } }) {
      edges {
        node {
          parentSlug
          slug
          version
        }
      }
    }
    inlineTOC: fileInlineToc(slug: { eq: $slug }) {
      tableOfContents {
        content {
          values {
            linkTitle
            link
          }
          key
        }
      }
    }
  }
`;
