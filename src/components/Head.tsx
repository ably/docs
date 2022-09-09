import React from 'react';
import { Helmet } from 'react-helmet';

export const Head = ({ title, canonical, description }: { title: string; canonical: string; description: string }) => (
  <Helmet>
    <title>{title}</title>
    <meta property="og:title" content={title} />
    <meta property="twitter:title" content={title} />
    <link rel="canonical" href={canonical} />
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
    <meta name="twitter:description" content={description} />
  </Helmet>
);
