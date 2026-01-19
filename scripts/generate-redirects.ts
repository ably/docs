#!/usr/bin/env ts-node

/**
 * Generate redirects from MDX frontmatter for Next.js
 *
 * This script reads all MDX files and extracts redirect_from frontmatter
 * to generate a redirects configuration that can be used in next.config.mjs
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_PATH = path.join(process.cwd(), 'src/pages/docs');
const OUTPUT_PATH = path.join(process.cwd(), 'generated-redirects.json');

interface Redirect {
  source: string;
  destination: string;
  permanent: boolean;
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
 * Main function to generate redirects
 */
async function generateRedirects() {
  console.log('Generating redirects from MDX frontmatter...');

  const files = findMdxFiles(CONTENT_PATH);
  const redirects: Redirect[] = [];

  // Add root redirect
  redirects.push({
    source: '/',
    destination: '/docs',
    permanent: true,
  });

  for (const filePath of files) {
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      const slug = filePathToSlug(filePath);

      if (data.redirect_from && Array.isArray(data.redirect_from)) {
        for (const redirectFrom of data.redirect_from) {
          // Skip hash fragments
          if (redirectFrom.includes('#')) {
            console.log(`  Skipping hash fragment redirect: ${redirectFrom}`);
            continue;
          }

          redirects.push({
            source: redirectFrom,
            destination: `/docs/${slug}`,
            permanent: true,
          });
        }
      }
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error);
    }
  }

  // Write redirects to JSON file
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(redirects, null, 2));
  console.log(`Generated ${redirects.length} redirects to ${OUTPUT_PATH}`);

  // Also output for next.config.mjs
  console.log('\nTo use in next.config.mjs, add:\n');
  console.log(`import redirects from './generated-redirects.json' assert { type: 'json' };`);
  console.log('\nThen in your config:');
  console.log(`async redirects() { return redirects; }`);
}

generateRedirects().catch(console.error);
