import { graphql, withPrefix } from 'gatsby';
import { Helmet } from 'react-helmet';

import Layout from 'src/components/Layout';
import { useSiteMetadata } from 'src/hooks/use-site-metadata';
import { ProductPageContent, SectionProps } from 'src/components/ProductPage/ProductPageContent';

import { SidebarProvider } from 'src/contexts/SidebarContext';

type MetaData = {
  title: string;
  description: string;
  image: string;
  twitter: string;
};

const IndexPage = ({
  data: {
    pageContentYaml: { sections, meta },
  },
}: {
  data: { pageContentYaml: { sections: SectionProps[]; meta: MetaData } };
}) => {
  const openGraphTitle = sections[0]?.title ?? 'Ably Realtime Docs';
  const { siteUrl } = useSiteMetadata();
  const canonical = `${siteUrl}/${withPrefix('/products/channels')}`;

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

      <SidebarProvider>
        <Layout isExtraWide currentProduct="channels">
          <ProductPageContent sections={sections} />
        </Layout>
      </SidebarProvider>
    </>
  );
};

export const query = graphql`
  query HomePageQuery {
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
  }
`;

export default IndexPage;
