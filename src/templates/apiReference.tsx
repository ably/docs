import React, { useMemo } from 'react';
import { graphql } from 'gatsby';
import Template from './base-template';
import { ArticleTypeContext } from 'src/contexts/article-type-context';
import { ARTICLE_TYPES } from '../../data/transform/constants';
import { AblyTemplateData } from './template-data';
import { DEFAULT_LANGUAGE, DEFAULT_PREFERRED_LANGUAGE } from '../../data/createPages/constants';
import { HtmlComponentProps } from 'src/components/html-component-props';
import { identity, isString } from 'lodash/fp';
import { isIrrelevantForLanguageDisplay } from 'src/components/blocks/wrappers/language-utilities';

const filterElements =
  (language: string) =>
  (value: HtmlComponentProps<any>): HtmlComponentProps<any> | null => {
    const { data, attribs, name, type } = value;
    // Strings made of whitespace should be returned without filtering
    if (isIrrelevantForLanguageDisplay(data)) {
      return value;
    }
    // Components not matching the selected language should be filtered
    if (attribs?.lang && attribs.lang !== language && attribs.lang !== DEFAULT_LANGUAGE) {
      return null;
    }
    // Plain string data and null data should be rendered; null data can exist for example in self-closing tags
    if (isString(data) || !data) {
      return value;
    }

    // This typecast is safe because .filter(identity) removes nulls.
    const filteredData = data.map(filterElements(language)).filter((value) => !!value) as HtmlComponentProps<any>[];
    return {
      data: filteredData,
      attribs,
      name,
      type,
    };
  };

const ApiReference = (props: AblyTemplateData) => {
  const {
    pageContext,
    location: { search, ...locationRest },
    ...rest
  } = props;
  const params = new URLSearchParams(search);
  const language = params.get('lang') ?? DEFAULT_PREFERRED_LANGUAGE;
  const filteredDataForPageLanguage = useMemo(
    () => pageContext.contentOrderedList.map(filterElements(language)).filter(identity),
    [pageContext, language],
  );
  const filteredPageContext = {
    ...pageContext,
    contentOrderedList: filteredDataForPageLanguage,
  };
  return (
    <ArticleTypeContext.Provider value={ARTICLE_TYPES.apiReference}>
      <Template location={{ search, ...locationRest }} pageContext={filteredPageContext} {...rest} />
    </ArticleTypeContext.Provider>
  );
};

export default ApiReference;

export const query = graphql`
  query ($slug: String!) {
    document: fileHtml(slug: { eq: $slug }) {
      meta {
        title
        meta_description
        languages
        redirect_from
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
