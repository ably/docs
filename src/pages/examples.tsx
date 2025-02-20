import React from 'react';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import { graphql, navigate } from 'gatsby';
import { ImageProps } from '../components/Image';
import { Head } from '../components/Head';
import ExamplesContent from '../components/Examples/ExamplesContent';
import { useSetLayoutOptions } from 'src/hooks/use-set-layout-options';

const Examples = ({
  data: {
    allFile: { images },
  },
}: {
  data: { allFile: { images: ImageProps[] } };
}) => {
  useSetLayoutOptions({ noSidebar: true, hideSearchBar: false, template: 'examples' });

  // TODO: remove when examples are ready to be released
  React.useEffect(() => {
    navigate(process.env.NODE_ENV === 'development' ? '/' : '/docs', { replace: true });
  }, []);

  const { canonicalUrl } = useSiteMetadata();
  const canonical = canonicalUrl('/examples');
  const meta_title = 'Ably Examples - Code Samples and Implementation Guides';
  const meta_description =
    'Browse our collection of code examples, implementation guides, and sample projects to help you integrate Ably into your applications.';

  return (
    <>
      <Head title={meta_title} metaTitle={meta_title} canonical={canonical} description={meta_description} />
      <ExamplesContent exampleImages={images} />
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
