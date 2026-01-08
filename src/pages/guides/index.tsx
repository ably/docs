import React from 'react';
import { graphql } from 'gatsby';
import { ImageProps } from '../../components/Image';
import { Head } from '../../components/Head';
import { GuidesContent } from '../../components/Guides';
import { useSiteMetadata } from '../../hooks/use-site-metadata';

const Guides = ({
  data: {
    allFile: { images },
  },
}: {
  data: { allFile: { images: ImageProps[] } };
}) => {
  const { canonicalUrl } = useSiteMetadata();
  const canonical = canonicalUrl('/guides');
  const meta_title = 'Ably Guides';
  const meta_description =
    "Browse Ably's collection of in-depth guides. See how best to architect an app for your use case, or see which features you can build with Ably's APIs.";

  return (
    <>
      <Head title={meta_title} metaTitle={meta_title} canonical={canonical} description={meta_description} />
      <GuidesContent guideImages={images} />
    </>
  );
};

export default Guides;

export const query = graphql`
  query {
    allFile(filter: { relativeDirectory: { eq: "guides" } }) {
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
