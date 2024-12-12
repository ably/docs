import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import Layout from 'src/components/Layout';
import { ImageProps } from 'src/components/Image';
import { useSiteMetadata } from 'src/hooks/use-site-metadata';
import { ProductPageContent, SectionProps } from 'src/components/ProductPage/ProductPageContent';

type MetaData = {
  title: string;
  description: string;
  image: string;
  twitter: string;
};

const IndexPage = ({
  data: {
    pageContentYaml: { sections, meta },
    allFile: { images },
  },
}: {
  data: { pageContentYaml: { sections: SectionProps[]; meta: MetaData }; allFile: { images: ImageProps[] } };
}) => {
  const openGraphTitle = sections[0]?.title ?? 'Ably Realtime Docs';
  const { canonicalUrl } = useSiteMetadata();
  const canonical = canonicalUrl('/products/channels');

  return (
    <>
      <Helmet>
        <meta property="og:type" content="website" />
        <title>{meta.title}</title>
        <meta property="og:title" content={openGraphTitle} />
        <meta property="twitter:title" content={openGraphTitle} />
        <meta property="og:site_name" content="Ably Realtime" />
        <link rel="canonical" href={canonical} />
        <meta property="og:url" content={canonical} />
        <meta name="description" content={meta.description} />
        <meta property="og:description" content={meta.description} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:site" content={meta.twitter} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={meta.image} />
      </Helmet>

      <Layout>
        <ProductPageContent sections={sections} images={images} />
      </Layout>
    </>
  );
};

export const query = graphql`
  query {
    pageContentYaml(name: { eq: "Channels" }) {
      sections {
        title
        level
        description
        columns
        bottomMargin
        releaseStage
        callToAction {
          text
          href
          type
        }
        cards {
          title
          type
          content
          image
          link
          links {
            text
            href
          }
        }
      }
      meta {
        title
        description
        image
        twitter
      }
    }
    allFile(filter: { relativeDirectory: { eq: "products/channels" } }) {
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

export default IndexPage;
