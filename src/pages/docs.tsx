import * as React from 'react';
import { DOCUMENTATION_PATH, LATEST_ABLY_API_VERSION_STRING } from '../../data/transform/constants';
import { HomepageContent, Section } from '../components/Homepage/HomepageContent';
import Layout from '../components/Layout';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

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
  data: { pageContentYaml: { sections: Section[]; meta: MetaData } };
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
        <link rel="canonical" href={`${DOCUMENTATION_PATH}`} />
        <meta property="og:url" content={`https://ably.com${DOCUMENTATION_PATH}`} />
        <meta name="description" content={meta.description} />
        <meta property="og:description" content={meta.description} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:site" content={meta.twitter} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={meta.image} />
      </Helmet>
      <Layout>
        <HomepageContent sections={sections} />
      </Layout>
    </>
  );
};

export const query = graphql`
  query HomePageQuery {
    pageContentYaml(name: { eq: "Homepage" }) {
      sections {
        title
        level
        description
        defaultCallToAction
        cards {
          title
          content
          link
          flag
          callToAction
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
