import React from 'react';
import { Helmet } from 'react-helmet';

export const Head = ({
  title,
  canonical,
  description,
  metaTitle,
}: {
  title: string;
  canonical: string;
  description: string;
  metaTitle: string;
}) => (
  <Helmet>
    <title>{metaTitle}</title>
    <meta property="og:title" content={title} />
    <meta property="twitter:title" content={title} />
    <link rel="canonical" href={canonical} />
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
    <meta name="twitter:description" content={description} />
  </Helmet>
);
