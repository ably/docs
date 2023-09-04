import React from 'react';
import { graphql } from 'gatsby';
import Template from './base-template';
import { ArticleTypeContext } from 'src/contexts/article-type-context';
import { ARTICLE_TYPES } from '../../data/transform/constants';
import { AblyTemplateData } from './template-data';

const ApiReference = (props: AblyTemplateData) => (
  <ArticleTypeContext.Provider value={ARTICLE_TYPES.apiReference}>
    <Template {...props} />
  </ArticleTypeContext.Provider>
);
export default ApiReference;

export const query = graphql`
  query ($slug: String!) {
    document: fileHtml(slug: { eq: $slug }) {
      meta {
        title
        meta_description
        languages
        redirect_from
        product
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
