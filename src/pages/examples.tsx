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
  const meta_title = 'Examples';
  const meta_description = 'Examples';

  return (
    <>
      <Head title={meta_title} metaTitle={meta_title} canonical={canonical} description={meta_description} />
      <Layout
        isExtraWide
        showProductNavigation={false}
        currentProduct="api-reference"
        collapsibleSidebar={false}
        noSidebar={true}
      >
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
