import React from 'react';
import { Helmet } from 'react-helmet';

import { getMarkdownUrl, getLlmsTxtUrl } from '../utilities/llm-urls';

export type StructuredData = {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
};

export const Head = ({
  title,
  canonical,
  description,
  metaTitle,
  keywords,
  structuredData,
  ogImage,
  ogImageAlt,
  rssUrl,
  rssTitle,
}: {
  title: string;
  canonical: string;
  description: string;
  metaTitle?: string;
  keywords?: string;
  structuredData?: StructuredData;
  ogImage?: string;
  ogImageAlt?: string;
  rssUrl?: string;
  rssTitle?: string;
}) => {
  const markdownUrl = getMarkdownUrl(canonical);
  const llmsTxtUrl = getLlmsTxtUrl(canonical);

  return (
    <Helmet>
      <title>{metaTitle || title}</title>
      <meta property="og:title" content={title} />
      <meta property="twitter:title" content={title} />
      <link rel="canonical" href={canonical} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      {ogImage && <meta name="twitter:card" content="summary_large_image" />}
      {ogImage && ogImageAlt && <meta property="og:image:alt" content={ogImageAlt} />}
      {rssUrl && (
        <link rel="alternate" type="application/rss+xml" title={rssTitle || `${title} RSS feed`} href={rssUrl} />
      )}
      {structuredData && <script type="application/ld+json">{JSON.stringify(structuredData)}</script>}

      {/* LLM/Agent discoverability hints */}
      <link rel="alternate" type="text/markdown" href={markdownUrl} title={`${title} (Markdown)`} />
      <meta name="llms-txt" content={llmsTxtUrl} />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Manrope:wght@200..800&family=Source+Code+Pro:wght@600&family=IBM+Plex+Serif:ital,wght@1,400;1,700&display=swap"
        rel="stylesheet"
      />
    </Helmet>
  );
};
