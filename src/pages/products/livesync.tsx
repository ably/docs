import { Helmet } from 'react-helmet';
import { graphql, withPrefix } from 'gatsby';

import Layout from 'src/components/Layout';
import { ImageProps } from 'src/components/Image';
import { useSiteMetadata } from 'src/hooks/use-site-metadata';
import { LeftSideBar } from 'src/components/StaticQuerySidebar';
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
  const canonical = canonicalUrl('/products/livesync');

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

      <Layout isExtraWide currentProduct="livesync">
        <LeftSideBar sidebarName="livesync" />
        <ProductPageContent sections={sections} images={images} />
      </Layout>
    </>
  );
};

export const query = graphql`
  query HomePageQuery {
    pageContentYaml(name: { eq: "LiveSync" }) {
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
          external
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
            external
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
    allFile(filter: { relativeDirectory: { eq: "products/livesync" } }) {
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
