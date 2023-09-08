import React from 'react';
import { graphql } from 'gatsby';
import Template from './base-template';
import { AblyTemplateData } from './template-data';

const Document = (props: AblyTemplateData) => {
  return <Template {...props} />;
};

export default Document;

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
