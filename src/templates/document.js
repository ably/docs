import React from 'react';
import { graphql } from 'gatsby';
import { templatePropTypes } from './template-prop-types';
import Template from './base-template';

const Document = (props) => {
  return <Template {...props} />;
};

Document.propTypes = templatePropTypes;

export default Document;

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
