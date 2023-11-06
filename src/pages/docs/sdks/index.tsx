import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import Layout from 'src/components/Layout';
import SDKsContent from 'src/components/SDKsPage';
import { ABLY_MAIN_WEBSITE, MetaData } from 'src/pages/docs';
import { DOCUMENTATION_NAME } from '../../../../data/transform/constants';

const SDKsIndexPage = ({
  data: {
    pageContentYaml: { meta },
  },
}: {
  data: { pageContentYaml: { meta: MetaData } };
}) => {
  return (
    <>
      <Helmet>
        <meta property="og:type" content="website" />
        <title>{meta.title}</title>
        <meta property="og:title" content="Ably Realtime Docs" />
        <meta property="twitter:title" content="Ably Realtime Docs" />
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

      <Layout noSidebar currentProduct="SDKs">
        <SDKsContent />
      </Layout>
    </>
  );
};

export default SDKsIndexPage;

export const query = graphql`
  query HomePageQuery {
    pageContentYaml {
      meta {
        title
        description
        image
        twitter
      }
    }
  }
`;
