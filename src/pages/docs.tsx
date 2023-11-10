import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

import Layout from 'src/components/Layout';
import { HomepageContent, SectionProps } from 'src/components/Homepage/HomepageContent';

import { DOCUMENTATION_NAME } from '../../data/transform/constants';

export type MetaData = {
  title: string;
  description: string;
  image: string;
  twitter: string;
};

export const ABLY_MAIN_WEBSITE = process.env.GATSBY_ABLY_MAIN_WEBSITE ?? 'http://localhost:3000';

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
        <link rel="canonical" href={`/${DOCUMENTATION_NAME}`} />
        <meta property="og:url" content={`${ABLY_MAIN_WEBSITE}/${DOCUMENTATION_NAME}`} />
        <meta name="description" content={meta.description} />
        <meta property="og:description" content={meta.description} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:site" content={meta.twitter} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={meta.image} />
      </Helmet>
      <Layout currentProduct="home" noSidebar>
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
        description
        columns
        bottomMargin
        callToAction {
          text
          href
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
