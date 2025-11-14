/**
 * JSON-LD Schema Generator for Ably Documentation
 *
 * Generates structured data (JSON-LD) for documentation pages to improve SEO
 * and provide rich snippets in search results.
 */

export type JsonLdSchema = {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
};

export interface GenerateArticleSchemaParams {
  title: string;
  description: string;
  url: string;
  dateModified?: string;
  datePublished?: string;
  keywords?: string;
  schemaType?: string;
  authorName?: string;
  authorType?: string;
  customFields?: Record<string, unknown>;
}

/**
 * Generates a JSON-LD schema for documentation pages.
 * Supports customization through frontmatter fields.
 *
 * @param params - The parameters for generating the schema
 * @returns A JSON-LD schema object
 */
export const generateArticleSchema = ({
  title,
  description,
  url,
  dateModified,
  datePublished,
  keywords,
  schemaType = 'TechArticle',
  authorName = 'Ably',
  authorType = 'Organization',
  customFields = {},
}: GenerateArticleSchemaParams): JsonLdSchema => {
  const schema: JsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    headline: title,
    description: description,
    url: url,
    publisher: {
      '@type': 'Organization',
      name: 'Ably',
      url: 'https://ably.com',
    },
    author: {
      '@type': authorType,
      name: authorName,
      ...(authorType === 'Organization' ? { url: 'https://ably.com' } : {}),
    },
  };

  // Add optional fields if provided
  if (dateModified) {
    schema.dateModified = dateModified;
  }

  if (datePublished) {
    schema.datePublished = datePublished;
  }

  if (keywords) {
    schema.keywords = keywords.split(',').map((k) => k.trim());
  }

  // Merge any custom fields from frontmatter
  Object.entries(customFields).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      schema[key] = value;
    }
  });

  return schema;
};

/**
 * Generates a BreadcrumbList JSON-LD schema for navigation breadcrumbs.
 *
 * @param breadcrumbs - Array of breadcrumb items with name and url
 * @returns A JSON-LD schema object
 */
export const generateBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>): JsonLdSchema => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
};

/**
 * Infers the appropriate schema type based on the page URL path.
 *
 * @param pathname - The URL pathname of the page
 * @returns The appropriate schema.org type
 */
export const inferSchemaTypeFromPath = (pathname: string): string => {
  // API documentation and reference pages
  if (pathname.includes('/api/')) {
    return 'APIReference';
  }

  // Tutorial and guide pages
  if (pathname.includes('/guides/') || pathname.includes('/quickstart') || pathname.includes('/getting-started')) {
    return 'HowTo';
  }

  // Default to TechArticle for technical documentation
  return 'TechArticle';
};

/**
 * Serializes a JSON-LD schema object to a JSON string for use in script tags.
 *
 * @param schema - The JSON-LD schema object
 * @returns A JSON string representation
 */
export const serializeJsonLd = (schema: JsonLdSchema): string => {
  return JSON.stringify(schema);
};
