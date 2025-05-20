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
  </Helmet>
);
