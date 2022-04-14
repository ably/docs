import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Html from '../components/blocks/Html';
import { LeftSideBar } from '../components/StaticQuerySidebar';
import PageLanguageContext from '../contexts/page-language-context';
import Article from '../components/Article';
import { DEFAULT_LANGUAGE, IGNORED_LANGUAGES } from '../../data/createPages/constants';
import VersionMenu from '../components/Menu/VersionMenu';
import RightSidebar from '../components/Sidebar/RightSidebar';
import PageTitle from '../components/PageTitle';

const Document = ({
  location: { search },
  pageContext: { contentOrderedList, languages, version, contentMenu, slug },
  data: { document, versions },
}) => {
  const title = document && document.meta ? document.meta.title : '';
  const filteredLanguages = useMemo(
    () =>
      languages
        .filter((language) => /^[^,]+$/.test(language))
        .filter((language) => !IGNORED_LANGUAGES.includes(language)),
    [languages],
  );
  const elements = useMemo(
    () =>
      contentOrderedList.map(
        // It is currently safe to use an index as a key.
        // We will need a unique key if we want to alter any of these by position.
        ({ data }, i) => <Html data={data} key={i} />,
      ),
    [contentOrderedList],
  );

  const params = new URLSearchParams(search);
  const language = params.get('lang') ?? DEFAULT_LANGUAGE;

  return (
    <PageLanguageContext.Provider value={language}>
      <Layout languages={filteredLanguages}>
        <LeftSideBar className="col-span-1 px-16" />
        <Article columns={3}>
          <PageTitle id="title">{title}</PageTitle>
          <VersionMenu versions={versions.edges} version={version} rootVersion={slug} />
          <div className="col-span-3">{elements}</div>
        </Article>
        <RightSidebar className="col-span-1 px-16" menuData={contentMenu[0]} />
      </Layout>
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
