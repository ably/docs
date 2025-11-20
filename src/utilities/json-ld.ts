/**
 * JSON-LD Schema Generator for Ably Documentation
 *
 * Generates comprehensive structured data (JSON-LD) using @graph for documentation pages
 * to improve discoverability by search engines and AI (LLMs).
 *
 * Hybrid approach: Uses frontmatter fields + automatic content extraction
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
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return null;
  }

  const breadcrumbs: Array<{ name: string; url: string }> = [];
  let currentPath = '';

  breadcrumbs.push({ name: 'Home', url: 'https://ably.com' });

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
  if (pathname.includes('/api/') || pathname.includes('/reference/')) {
    return 'APIReference';
  }

  if (pathname.includes('/guides/') || pathname.includes('/quickstart') || pathname.includes('/getting-started')) {
    return 'HowTo';
  }

  if (pathname.includes('/concepts/') || pathname.includes('/learn/')) {
    return 'Article';
  }

  return 'TechArticle';
};

/**
 * Generates SDK list from frontmatter if provided.
 */
export const generateSDKList = (sdks: string[] | undefined, url: string): JsonLdNode | null => {
  if (!sdks || sdks.length === 0) {
    return null;
  }

  const sdkRepos: Record<string, { name: string; repo: string }> = {
    javascript: { name: 'JavaScript SDK', repo: 'https://github.com/ably/ably-js' },
    nodejs: { name: 'Node.js SDK', repo: 'https://github.com/ably/ably-js' },
    ruby: { name: 'Ruby SDK', repo: 'https://github.com/ably/ably-ruby' },
    python: { name: 'Python SDK', repo: 'https://github.com/ably/ably-python' },
    java: { name: 'Java SDK', repo: 'https://github.com/ably/ably-java' },
    swift: { name: 'Swift SDK', repo: 'https://github.com/ably/ably-cocoa' },
    objc: { name: 'Objective-C SDK', repo: 'https://github.com/ably/ably-cocoa' },
    csharp: { name: 'C# SDK', repo: 'https://github.com/ably/ably-dotnet' },
    go: { name: 'Go SDK', repo: 'https://github.com/ably/ably-go' },
    flutter: { name: 'Flutter SDK', repo: 'https://github.com/ably/ably-flutter' },
    php: { name: 'PHP SDK', repo: 'https://github.com/ably/ably-php' },
  };

  return {
    '@type': 'ItemList',
    '@id': `${url}#sdks`,
    name: 'Ably SDKs',
    itemListElement: sdks.map((sdk, index) => {
      const sdkInfo = sdkRepos[sdk.toLowerCase()] || { name: `${sdk} SDK`, repo: '' };
      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'SoftwareSourceCode',
          name: sdkInfo.name,
          programmingLanguage: sdk,
          ...(sdkInfo.repo ? { codeRepository: sdkInfo.repo } : {}),
        },
      };
    }),
  };
};

/**
 * Generates FAQ entities from frontmatter if provided.
 */
export const generateFAQPage = (
  faqs: Array<{ question: string; answer: string }> | undefined,
  url: string,
): JsonLdNode | null => {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

/**
 * Generates HowTo steps from frontmatter if provided.
 */
export const generateHowToSteps = (
  steps: Array<{ name: string; text: string }> | undefined,
  url: string,
  title: string,
): JsonLdNode | null => {
  if (!steps || steps.length === 0) {
    return null;
  }

  return {
    '@type': 'HowTo',
    '@id': `${url}#howto`,
    name: title,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
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

  if (dateModified) {
    node.dateModified = dateModified;
  }

  if (datePublished) {
    node.datePublished = datePublished;
  }

  if (keywords) {
    node.keywords = keywords.split(',').map((k) => k.trim());
  }

  // Add image if provided in custom fields
  if (customFields.image) {
    node.image = {
      '@type': 'ImageObject',
      url: customFields.image,
      ...(customFields.imageDescription ? { description: customFields.imageDescription } : {}),
    };
  }

  // Add other custom fields
  Object.entries(customFields).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      key !== 'image' &&
      key !== 'imageDescription' &&
      key !== 'sdks' &&
      key !== 'faqs' &&
      key !== 'howToSteps'
    ) {
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
  const { url, pathname = '', schemaType: explicitSchemaType, customFields = {} } = params;

  const schemaType = explicitSchemaType || inferSchemaTypeFromPath(pathname);

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

  // 5. Include SDK list if provided
  const sdkList = generateSDKList(customFields.sdks as string[] | undefined, url);
  if (sdkList) {
    graph.push(sdkList);
  }

  // 6. Include HowTo steps if provided
  const howToSteps = generateHowToSteps(
    customFields.howToSteps as Array<{ name: string; text: string }> | undefined,
    url,
    params.title,
  );
  if (howToSteps) {
    graph.push(howToSteps);
  }

  // 7. Include FAQPage if provided
  const faqPage = generateFAQPage(customFields.faqs as Array<{ question: string; answer: string }> | undefined, url);
  if (faqPage) {
    graph.push(faqPage);
  }

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
