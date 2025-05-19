import React from 'react';
import { graphql } from 'gatsby';
import Template from './base-template';
import { AblyTemplateData } from './template-data';
import { ContentImagesProvider } from 'src/contexts/content-images-context';

const Document = (props: AblyTemplateData) => {
  const {
    data: { images },
  } = props ?? {};
  const { nodes } = images ?? {};

  return (
    <ContentImagesProvider images={nodes}>
      <Template {...props} />
    </ContentImagesProvider>
  );
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
    images: allFile(filter: { sourceInstanceName: { eq: "images" } }) {
      nodes {
        ...ContentImage
      }
    }
  }
`;
