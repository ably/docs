import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import Layout from 'src/components/Layout';
import { ProductPageContent, SectionProps } from 'src/components/ProductPage/ProductPageContent';

import { SidebarProvider } from 'src/contexts/SidebarContext';
import { DOCUMENTATION_NAME } from '../../../../data/transform/constants';

type MetaData = {
  title: string;
  description: string;
  image: string;
  twitter: string;
};

const ABLY_MAIN_WEBSITE = process.env.GATSBY_ABLY_MAIN_WEBSITE ?? 'http://localhost:3000';

const IndexPage = ({
  data: {
    pageContentYaml: { sections, meta },
  },
}: {
  data: { pageContentYaml: { sections: SectionProps[]; meta: MetaData } };
}) => {
  const openGraphTitle = sections[0]?.title ?? 'Ably Realtime Docs';
  return (
    <>
      <Helmet>
        <meta property="og:type" content="website" />
        <title>{meta.title}</title>
        <meta property="og:title" content={openGraphTitle} />
        <meta property="twitter:title" content={openGraphTitle} />
        <meta property="og:site_name" content="Ably Realtime" />
        <link rel="canonical" href={`/${DOCUMENTATION_NAME}/products/spaces`} />
        <meta property="og:url" content={`${ABLY_MAIN_WEBSITE}/${DOCUMENTATION_NAME}/products/spaces`} />
        <meta name="description" content={meta.description} />
        <meta property="og:description" content={meta.description} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:site" content={meta.twitter} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={meta.image} />
      </Helmet>

      <SidebarProvider>
        <Layout isExtraWide currentProduct="spaces">
          <ProductPageContent sections={sections} />
        </Layout>
      </SidebarProvider>
    </>
  );
};

export const query = graphql`
  query HomePageQuery {
    pageContentYaml(name: { eq: "Spaces" }) {
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
