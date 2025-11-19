/**
 * JSON-LD Schema Generator for Ably Documentation
 *
 * Generates comprehensive structured data (JSON-LD) using @graph for documentation pages
 * to improve discoverability by search engines and AI (LLMs).
 *
 * Based on Ably's JSON-LD Schema Prompt requirements.
 */

export type JsonLdSchema = {
  '@context'?: string;
  '@type'?: string;
  '@id'?: string;
  '@graph'?: JsonLdNode[];
  [key: string]: unknown;
};

export type JsonLdNode = {
  '@type': string | string[];
  '@id'?: string;
  [key: string]: unknown;
};

export interface GenerateSchemaParams {
  title: string;
  description: string;
  url: string;
  dateModified?: string;
  datePublished?: string;
  keywords?: string;
  schemaType?: string;
  authorName?: string;
  authorType?: string;
  pathname?: string;
  customFields?: Record<string, unknown>;
}

/**
 * Generates the Ably Organization entity (always included once in @graph).
 */
export const generateAblyOrganization = (): JsonLdNode => {
  return {
    '@type': 'Organization',
    '@id': 'https://ably.com#organization',
    name: 'Ably',
    url: 'https://ably.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://ably.com/favicon-512x512.png',
    },
    sameAs: [
      'https://www.linkedin.com/company/ably-realtime/',
      'https://twitter.com/ablyrealtime',
      'https://github.com/ably',
      'https://www.g2.com/products/ably',
    ],
  };
};

/**
 * Generates a WebSite node for the Ably documentation site.
 */
export const generateWebSiteNode = (): JsonLdNode => {
  return {
    '@type': 'WebSite',
    '@id': 'https://ably.com#website',
    name: 'Ably Documentation',
    url: 'https://ably.com',
    publisher: {
      '@id': 'https://ably.com#organization',
    },
  };
};

/**
 * Generates a BreadcrumbList node for navigation.
 */
export const generateBreadcrumbNode = (pathname: string, url: string): JsonLdNode | null => {
  // Parse pathname to create breadcrumbs
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return null;
  }

  const breadcrumbs: Array<{ name: string; url: string }> = [];
  let currentPath = '';

  // Add home
  breadcrumbs.push({ name: 'Home', url: 'https://ably.com' });

  // Add each segment
  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    const name = segment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    breadcrumbs.push({
      name,
      url: `https://ably.com${currentPath}`,
    });
  });

  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
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
 */
export const inferSchemaTypeFromPath = (pathname: string): string => {
  // API documentation and reference pages
  if (pathname.includes('/api/') || pathname.includes('/reference/')) {
    return 'APIReference';
  }

  // Tutorial and guide pages
  if (pathname.includes('/guides/') || pathname.includes('/quickstart') || pathname.includes('/getting-started')) {
    return 'HowTo';
  }

  // Conceptual/learning pages
  if (pathname.includes('/concepts/') || pathname.includes('/learn/')) {
    return 'Article';
  }

  // Default to TechArticle for technical documentation
  return 'TechArticle';
};

/**
 * Generates the main content node (TechArticle, APIReference, HowTo, etc.)
 */
export const generateMainContentNode = ({
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
}: GenerateSchemaParams): JsonLdNode => {
  const entityId = `${url}#${schemaType.toLowerCase()}`;

  const node: JsonLdNode = {
    '@type': schemaType,
    '@id': entityId,
    headline: title,
    name: title,
    description: description,
    url: url,
    inLanguage: 'en',
    mainEntityOfPage: url,
    publisher: {
      '@id': 'https://ably.com#organization',
    },
    author: {
      '@type': authorType,
      name: authorName,
      ...(authorType === 'Organization' ? { '@id': 'https://ably.com#organization' } : {}),
    },
  };

  // Add optional fields
  if (dateModified) {
    node.dateModified = dateModified;
  }

  if (datePublished) {
    node.datePublished = datePublished;
  }

  if (keywords) {
    node.keywords = keywords.split(',').map((k) => k.trim());
  }

  // Merge custom fields
  Object.entries(customFields).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      node[key] = value;
    }
  });

  return node;
};

/**
 * Generates a complete JSON-LD schema with @graph structure.
 *
 * This follows the Ably JSON-LD Schema Prompt requirements for comprehensive,
 * truthful structured data that improves discoverability.
 */
export const generateCompleteSchema = (params: GenerateSchemaParams): JsonLdSchema => {
  const { url, pathname = '', schemaType: explicitSchemaType } = params;

  // Infer schema type if not explicitly provided
  const schemaType = explicitSchemaType || inferSchemaTypeFromPath(pathname);

  // Build the @graph array
  const graph: JsonLdNode[] = [];

  // 1. Always include Ably Organization
  graph.push(generateAblyOrganization());

  // 2. Include WebSite node
  graph.push(generateWebSiteNode());

  // 3. Include BreadcrumbList if we have a pathname
  if (pathname) {
    const breadcrumb = generateBreadcrumbNode(pathname, url);
    if (breadcrumb) {
      graph.push(breadcrumb);
    }
  }

  // 4. Include main content node
  graph.push(generateMainContentNode({ ...params, schemaType }));

  // Return complete schema with @graph
  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
};

/**
 * Serializes a JSON-LD schema object to a JSON string for use in script tags.
 */
export const serializeJsonLd = (schema: JsonLdSchema): string => {
  return JSON.stringify(schema);
};
