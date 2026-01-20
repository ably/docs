import React from 'react';
import { Helmet } from 'react-helmet';

export type StructuredData = {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
};

/**
 * Converts a canonical URL to its markdown equivalent for LLM/agent discovery.
 * Example: https://ably.com/docs/channels -> https://ably.com/docs/channels.md
 */
const getMarkdownUrl = (canonical: string): string => {
  // Remove trailing slash if present, then add .md
  const withoutTrailingSlash = canonical.endsWith('/') ? canonical.slice(0, -1) : canonical;
  return `${withoutTrailingSlash}.md`;
};

/**
 * Gets the base URL for llms.txt from a canonical URL.
 * Example: https://ably.com/docs/channels -> https://ably.com/llms.txt
 */
const getLlmsTxtUrl = (canonical: string): string => {
  try {
    const url = new URL(canonical);
    return `${url.origin}/llms.txt`;
  } catch {
    // Fallback for relative URLs or parsing errors
    return '/llms.txt';
  }
};

export const Head = ({
  title,
  canonical,
  description,
  metaTitle,
  keywords,
  structuredData,
}: {
  title: string;
  canonical: string;
  description: string;
  metaTitle?: string;
  keywords?: string;
  structuredData?: StructuredData;
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
