import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

import Layout from 'src/components/Layout';
import { LeftSideBar } from 'src/components/StaticQuerySidebar';
import { ProductPageContent, SectionProps } from 'src/components/ProductPage/ProductPageContent';

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
        <link rel="canonical" href={`/${DOCUMENTATION_NAME}/products/channels`} />
        <meta property="og:url" content={`${ABLY_MAIN_WEBSITE}/${DOCUMENTATION_NAME}/products/channels`} />
        <meta name="description" content={meta.description} />
        <meta property="og:description" content={meta.description} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:site" content={meta.twitter} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={meta.image} />
      </Helmet>

      <Layout isExtraWide>
        <LeftSideBar />
        <ProductPageContent sections={sections} />
      </Layout>
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
