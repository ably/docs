import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import { ImageProps } from 'src/components/Image';
import { useSiteMetadata } from 'src/hooks/use-site-metadata';
import { HomepageContent } from 'src/components/Homepage/HomepageContent';
import { pageData } from 'src/data';

export const ABLY_MAIN_WEBSITE = process.env.GATSBY_ABLY_MAIN_WEBSITE ?? 'http://localhost:3000';

const IndexPage = ({
  data: {
    allFile: { images },
  },
}: {
  data: { allFile: { images: ImageProps[] } };
}) => {
  const homepageContent = pageData.homepage.content;
  const { meta } = homepageContent;
  const openGraphTitle = meta.title ?? 'Ably Realtime Docs';
  const { canonicalUrl } = useSiteMetadata();
  const canonical = canonicalUrl('/docs');

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

      <HomepageContent homepageContent={homepageContent} images={images} />
    </>
  );
};

export const query = graphql`
  query HomePageQuery {
    allFile(filter: { sourceInstanceName: { eq: "images" }, relativeDirectory: { eq: "homepage" } }) {
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
