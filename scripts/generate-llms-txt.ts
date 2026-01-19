#!/usr/bin/env ts-node

/**
 * Generate llms.txt for AI/LLM consumption
 *
 * This script creates a structured file listing all documentation pages
 * for use by AI assistants and language models.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import languageInfo from '../src/data/languages/languageInfo';

const CONTENT_PATH = path.join(process.cwd(), 'src/pages/docs');
const OUTPUT_PATH = path.join(process.cwd(), 'public/llms.txt');
const SITE_URL = process.env.NEXT_PUBLIC_ABLY_MAIN_WEBSITE || 'https://ably.com';

const LLMS_TXT_PREAMBLE = `# Ably Documentation

> Ably is a realtime experience infrastructure platform that provides pub/sub messaging, chat, realtime data synchronization, and more.

- **Global Edge Network**: Ultra-low latency realtime messaging delivered through a globally distributed edge network
- **Enterprise Scale**: Built to handle millions of concurrent connections with guaranteed message delivery
- **Multiple Products**: Pub/Sub, Chat, LiveSync, LiveObjects and Spaces
- **Developer-Friendly SDKs**: SDKs available for JavaScript, Node.js, Java, Python, Go, Objective-C, Swift, Csharp, PHP, Flutter, Ruby, React, React Native, and Kotlin

`;

const VALID_LANGUAGES = [
  'javascript',
  'nodejs',
  'csharp',
  'flutter',
  'java',
  'objc',
  'php',
  'python',
  'ruby',
  'swift',
  'go',
  'kotlin',
  'react',
];

interface Page {
  slug: string;
  title: string;
  description: string;
  languages: string[];
}

interface CategoryStructure {
  [category: string]: {
    title: string;
    pages?: Page[];
    subcategories: {
      [subcategory: string]: {
        title: string;
        pages: Page[];
      };
    };
  };
}

/**
 * Recursively find all MDX files
 */
function findMdxFiles(dir: string): string[] {
  const files: string[] = [];

  if (!fs.existsSync(dir)) {
    return files;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...findMdxFiles(fullPath));
    } else if (entry.isFile() && (entry.name.endsWith('.mdx') || entry.name.endsWith('.md'))) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Convert a file path to a URL slug
 */
function filePathToSlug(filePath: string): string {
  const relativePath = path.relative(CONTENT_PATH, filePath);
  let slug = relativePath.replace(/\.(mdx|md)$/, '');

  if (slug.endsWith('/index') || slug === 'index') {
    slug = slug.replace(/\/?index$/, '');
  }

  return slug;
}

/**
 * Extract code languages from MDX content
 */
function extractCodeLanguages(content: string): string[] {
  const codeBlockRegex = /```(\w+)/g;
  const languages = new Set<string>();
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    const codeBlockLang = match[1]?.trim();
    if (!codeBlockLang) continue;

    // Handle prefixed languages like realtime_javascript
    if (codeBlockLang.includes('_')) {
      const parts = codeBlockLang.split('_');
      const language = parts[parts.length - 1];
      if (language && VALID_LANGUAGES.includes(language)) {
        languages.add(language);
      }
    } else if (VALID_LANGUAGES.includes(codeBlockLang)) {
      languages.add(codeBlockLang);
    }
  }

  return Array.from(languages);
}

/**
 * Categorize a page based on its slug
 */
function categorizePage(slug: string): { category: string; subcategory?: string } {
  const parts = slug.split('/');
  const firstPart = parts[0] || 'general';
  const secondPart = parts[1];

  const categoryMap: Record<string, { category: string; subcategory?: string }> = {
    platform: { category: 'Platform' },
    account: { category: 'Platform', subcategory: 'Account Management' },
    architecture: { category: 'Platform', subcategory: 'Architecture' },
    deprecate: { category: 'Platform', subcategory: 'Deprecations' },
    errors: { category: 'Platform', subcategory: 'Errors' },
    integrations: { category: 'Platform', subcategory: 'Integrations' },
    pricing: { category: 'Platform', subcategory: 'Pricing' },
    auth: { category: 'Platform', subcategory: 'Authentication' },
    guides: { category: 'Platform' },
    sdks: { category: 'Platform', subcategory: 'SDKs' },
    'control-api': { category: 'Platform', subcategory: 'Control API' },
    api: { category: 'Pub/Sub', subcategory: 'API Reference' },
    basics: { category: 'Pub/Sub' },
    channels: { category: 'Pub/Sub', subcategory: 'Channels' },
    connect: { category: 'Pub/Sub', subcategory: 'Connections' },
    'getting-started': { category: 'Pub/Sub', subcategory: 'Getting Started' },
    messages: { category: 'Pub/Sub', subcategory: 'Messages' },
    'metadata-stats': { category: 'Pub/Sub', subcategory: 'Metadata & Statistics' },
    'presence-occupancy': { category: 'Pub/Sub', subcategory: 'Presence & Occupancy' },
    protocols: { category: 'Pub/Sub', subcategory: 'Protocols' },
    'pub-sub': { category: 'Pub/Sub' },
    push: { category: 'Pub/Sub', subcategory: 'Push Notifications' },
    'storage-history': { category: 'Pub/Sub', subcategory: 'Storage & History' },
    chat: { category: 'Chat' },
    spaces: { category: 'Spaces' },
    liveobjects: { category: 'LiveObjects' },
    livesync: { category: 'LiveSync' },
  };

  // Special handling for API references
  if (firstPart === 'api') {
    if (secondPart === 'control-api') {
      return { category: 'Platform', subcategory: 'Control API' };
    } else if (secondPart === 'rest-sdk' || secondPart === 'rest-api' || secondPart === 'sse') {
      return { category: 'Pub/Sub', subcategory: 'REST SDK API Reference' };
    } else if (secondPart === 'realtime-sdk') {
      return { category: 'Pub/Sub', subcategory: 'Realtime SDK API Reference' };
    }
    return { category: 'Pub/Sub', subcategory: 'API Reference' };
  }

  if (categoryMap[firstPart]) {
    return categoryMap[firstPart];
  }

  return { category: 'General', subcategory: 'Documentation' };
}

/**
 * Escape markdown special characters
 */
function escapeMarkdown(text: string): string {
  return text.replace(/([\\`*_{}[\]()#+!])/g, '\\$1');
}

/**
 * Get display label for a language
 */
function getLanguageLabel(lang: string): string {
  return (languageInfo as Record<string, { label: string }>)[lang]?.label || lang;
}

/**
 * Main function to generate llms.txt
 */
async function generateLlmsTxt() {
  console.log('Generating llms.txt...');

  const files = findMdxFiles(CONTENT_PATH);
  const pages: Page[] = [];

  for (const filePath of files) {
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      if (!data.title || !data.meta_description) {
        continue;
      }

      const slug = filePathToSlug(filePath);
      const languages = extractCodeLanguages(content);

      pages.push({
        slug,
        title: data.title,
        description: data.meta_description,
        languages,
      });
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error);
    }
  }

  console.log(`Found ${pages.length} pages`);

  // Organize pages into categories
  const categoryStructure: CategoryStructure = {};

  for (const page of pages) {
    const { category, subcategory } = categorizePage(page.slug);

    if (!categoryStructure[category]) {
      categoryStructure[category] = {
        title: category,
        subcategories: {},
      };
    }

    if (!subcategory) {
      if (!categoryStructure[category].pages) {
        categoryStructure[category].pages = [];
      }
      categoryStructure[category].pages.push(page);
    } else {
      if (!categoryStructure[category].subcategories[subcategory]) {
        categoryStructure[category].subcategories[subcategory] = {
          title: subcategory,
          pages: [],
        };
      }
      categoryStructure[category].subcategories[subcategory].pages.push(page);
    }
  }

  // Generate output
  const output: string[] = [LLMS_TXT_PREAMBLE];
  const categoryOrder = ['Platform', 'Pub/Sub', 'Chat', 'Spaces', 'LiveObjects', 'LiveSync', 'General'];

  const sortedCategories = Object.keys(categoryStructure).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  const serializePages = (pages: Page[]) => {
    for (const page of pages) {
      const baseUrl = `${SITE_URL}/docs/${page.slug}`;
      const safeTitle = escapeMarkdown(page.title);

      output.push(`- [${safeTitle}](${baseUrl}): ${page.description}`);

      // Add language variants
      if (page.languages.length > 1) {
        const slugParts = page.slug.split('/');
        const slugLastPart = slugParts[slugParts.length - 1];
        const slugToLangMap: Record<string, string> = {
          dotnet: 'csharp',
          'objective-c': 'objc',
        };
        const primaryLanguage = slugToLangMap[slugLastPart] || slugLastPart;

        for (const language of page.languages) {
          if (language !== primaryLanguage) {
            const langUrl = `${baseUrl}?lang=${language}`;
            output.push(`- [${safeTitle} (${getLanguageLabel(language)})](${langUrl}): ${page.description}`);
          }
        }
      }
    }
  };

  for (const categoryKey of sortedCategories) {
    const category = categoryStructure[categoryKey];
    output.push(`## ${category.title}`);
    output.push('');

    if (category.pages && category.pages.length > 0) {
      serializePages(category.pages);
      output.push('');
    }

    const sortedSubcategories = Object.keys(category.subcategories).sort();

    for (const subcategoryKey of sortedSubcategories) {
      const subcategory = category.subcategories[subcategoryKey];
      output.push(`### ${subcategory.title}`);
      output.push('');
      serializePages(subcategory.pages);
      output.push('');
    }
  }

  // Ensure public directory exists
  const publicDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_PATH, output.join('\n'));
  console.log(`Successfully wrote llms.txt to ${OUTPUT_PATH}`);
}

generateLlmsTxt().catch(console.error);
