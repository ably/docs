import { graphql, withPrefix, useStaticQuery } from 'gatsby';

const stripTrailingSlash = (str: string) => (str.endsWith('/') ? str.slice(0, -1) : str);

const canonicalUrl = (siteUrl: string): ((path: string) => string) => {
  return (path: string): string => stripTrailingSlash(`${siteUrl}${withPrefix(path)}`);
};

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          siteUrl
        }
      }
    }
  `);

  const siteMetadata = data.site.siteMetadata;

  return {
    ...siteMetadata,
    canonicalUrl: canonicalUrl(siteMetadata.siteUrl),
  };
};
