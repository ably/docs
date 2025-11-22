import React from 'react';
import { Helmet } from 'react-helmet';
import { JsonLdSchema, serializeJsonLd } from '../utilities/json-ld';

export const Head = ({
  title,
  canonical,
  description,
  metaTitle,
  keywords,
  jsonLd,
}: {
  title: string;
  canonical: string;
  description: string;
  metaTitle?: string;
  keywords?: string;
  jsonLd?: JsonLdSchema | JsonLdSchema[];
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

    {/* JSON-LD Structured Data */}
    {jsonLd && (
      Array.isArray(jsonLd) ? (
        jsonLd.map((schema, index) => (
          <script key={`jsonld-${index}`} type="application/ld+json">
            {serializeJsonLd(schema)}
          </script>
        ))
      ) : (
        <script type="application/ld+json">
          {serializeJsonLd(jsonLd)}
        </script>
      )
    )}

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    <link
      href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Manrope:wght@200..800&family=Source+Code+Pro:wght@600&display=swap"
      rel="stylesheet"
    />
  </Helmet>
);
