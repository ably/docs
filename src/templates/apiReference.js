import React from 'react';
import { graphql } from 'gatsby';
import { templatePropTypes } from './template-prop-types';
import Template from './base-template';

const ApiReference = (props) => {
  return <Template {...props} />;
};

ApiReference.propTypes = templatePropTypes;

export default ApiReference;

export const query = graphql`
  query ($slug: String!) {
    apiReference: fileHtml(slug: { eq: $slug }) {
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
