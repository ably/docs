import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import Layout from 'src/components/Layout';
import { ImageProps } from 'src/components/Image';
import { useSiteMetadata } from 'src/hooks/use-site-metadata';
import { HomepageContent, SectionProps } from 'src/components/Homepage/HomepageContent';
import { PageLanguageProvider } from 'src/contexts';

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
    allFile: { images },
  },
  location: { search },
}: {
  data: { pageContentYaml: { sections: SectionProps[]; meta: MetaData }; allFile: { images: ImageProps[] } };
  location: Location;
}) => {
  const openGraphTitle = sections[0]?.title ?? 'Ably Realtime Docs';
  const { canonicalUrl } = useSiteMetadata();
  const canonical = canonicalUrl('/');

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

      <PageLanguageProvider search={search}>
        <Layout noSidebar>
          <HomepageContent sections={sections} images={images} />
        </Layout>
      </PageLanguageProvider>
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
          external
        }
        cards {
          title
          type
          content
          image
          links {
            text
            href
            external
          }
          callToAction {
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
    allFile(filter: { relativeDirectory: { eq: "homepage" } }) {
      images: nodes {
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
