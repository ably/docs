import React from 'react';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import { graphql } from 'gatsby';
import { ImageProps } from '../components/Image';
import { Head } from '../components/Head';
import Layout from '../components/Layout';
import ExamplesContent from '../components/Examples/ExamplesContent';

const Examples = ({
  data: {
    allFile: { images },
  },
}: {
  data: { allFile: { images: ImageProps[] } };
}) => {
  const { canonicalUrl } = useSiteMetadata();
  const canonical = canonicalUrl('/examples');
  const meta_title = 'Ably Examples - Code Samples and Implementation Guides';
  const meta_description =
    'Browse our collection of code examples, implementation guides, and sample projects to help you integrate Ably into your applications.';

  return (
    <>
      <Head title={meta_title} metaTitle={meta_title} canonical={canonical} description={meta_description} />
      <Layout noSidebar={true}>
        <ExamplesContent exampleImages={images} />
      </Layout>
    </>
  );
};

export default Examples;

export const query = graphql`
  query {
    allFile(filter: { relativeDirectory: { eq: "examples" } }) {
      images: nodes {
        name
        extension
        base
        publicURL
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
`;
