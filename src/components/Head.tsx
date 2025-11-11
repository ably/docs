import React from 'react';
import { Helmet } from 'react-helmet';

export const Head = ({
  title,
  canonical,
  description,
  metaTitle,
  keywords,
}: {
  title: string;
  canonical: string;
  description: string;
  metaTitle?: string;
  keywords?: string;
}) => (
  <Helmet>
    <title>{metaTitle || title}</title>
    <meta property="og:title" content={title} />
    <meta property="twitter:title" content={title} />
    <link rel="canonical" href={canonical} />
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
    <meta name="twitter:description" content={description} />
    {keywords && <meta name="keywords" content={keywords} />}

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    <link
      href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Manrope:wght@200..800&family=Source+Code+Pro:wght@600&family=IBM+Plex+Serif:ital,wght@1,400;1,700&display=swap"
      rel="stylesheet"
    />
  </Helmet>
);
