import { siteConfig, externalScriptsData } from 'lib/site-config';

const stripTrailingSlash = (str: string) => (str.endsWith('/') ? str.slice(0, -1) : str);

const canonicalUrl = (siteUrl: string): ((path: string) => string) => {
  return (path: string): string => stripTrailingSlash(`${siteUrl}${path}`);
};

export const useSiteMetadata = () => {
  return {
    title: siteConfig.title,
    siteUrl: siteConfig.siteUrl,
    externalScriptsData,
    canonicalUrl: canonicalUrl(siteConfig.siteUrl),
  };
};
