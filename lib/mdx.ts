import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Base path for MDX content - keeping in src/pages/docs for now to minimize changes
const CONTENT_PATH = path.join(process.cwd(), 'src/pages/docs');

export interface FrontmatterData {
  title: string;
  meta_description?: string;
  meta_keywords?: string;
  redirect_from?: string[];
  last_updated?: string;
  intro?: string;
  languages?: string[];
  [key: string]: unknown;
}

export interface MdxFile {
  slug: string;
  frontmatter: FrontmatterData;
  content: string;
  filePath: string;
}

/**
 * Recursively find all MDX files in a directory
 */
function findMdxFiles(dir: string, baseDir: string = dir): string[] {
  const files: string[] = [];

  if (!fs.existsSync(dir)) {
    return files;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...findMdxFiles(fullPath, baseDir));
    } else if (entry.isFile() && (entry.name.endsWith('.mdx') || entry.name.endsWith('.md'))) {
      // Skip non-MDX/MD files and TypeScript files
      if (!entry.name.endsWith('.tsx') && !entry.name.endsWith('.ts')) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

/**
 * Convert a file path to a URL slug
 */
function filePathToSlug(filePath: string): string {
  // Get path relative to content directory
  const relativePath = path.relative(CONTENT_PATH, filePath);

  // Remove extension
  let slug = relativePath.replace(/\.(mdx|md)$/, '');

  // Handle index files - they should be the directory slug
  if (slug.endsWith('/index') || slug === 'index') {
    slug = slug.replace(/\/?index$/, '');
  }

  // Ensure slug starts without a slash
  return slug || '';
}

/**
 * Get all MDX slugs for generateStaticParams
 */
export async function getAllMdxSlugs(): Promise<string[]> {
  const files = findMdxFiles(CONTENT_PATH);

  return files
    .map((filePath) => filePathToSlug(filePath))
    .filter((slug) => slug !== ''); // Filter out empty slugs (root index)
}

/**
 * Get MDX content and frontmatter by slug
 */
export async function getMdxBySlug(slug: string): Promise<MdxFile | null> {
  // Try different file path patterns
  const possiblePaths = [
    path.join(CONTENT_PATH, `${slug}.mdx`),
    path.join(CONTENT_PATH, `${slug}.md`),
    path.join(CONTENT_PATH, slug, 'index.mdx'),
    path.join(CONTENT_PATH, slug, 'index.md'),
  ];

  let filePath: string | null = null;

  for (const possiblePath of possiblePaths) {
    if (fs.existsSync(possiblePath)) {
      filePath = possiblePath;
      break;
    }
  }

  if (!filePath) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data as FrontmatterData,
    content,
    filePath,
  };
}

/**
 * Get all MDX files with their frontmatter (useful for generating redirects)
 */
export async function getAllMdxWithFrontmatter(): Promise<MdxFile[]> {
  const files = findMdxFiles(CONTENT_PATH);

  return files.map((filePath) => {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const slug = filePathToSlug(filePath);

    return {
      slug,
      frontmatter: data as FrontmatterData,
      content,
      filePath,
    };
  });
}

/**
 * Extract all redirects from MDX frontmatter
 */
export async function extractRedirects(): Promise<Array<{ source: string; destination: string; permanent: boolean }>> {
  const files = await getAllMdxWithFrontmatter();
  const redirects: Array<{ source: string; destination: string; permanent: boolean }> = [];

  for (const file of files) {
    if (file.frontmatter.redirect_from && Array.isArray(file.frontmatter.redirect_from)) {
      for (const redirectFrom of file.frontmatter.redirect_from) {
        // Skip hash fragments
        if (redirectFrom.includes('#')) {
          continue;
        }

        redirects.push({
          source: redirectFrom,
          destination: `/docs/${file.slug}`,
          permanent: true,
        });
      }
    }
  }

  return redirects;
}

/**
 * Extract languages from MDX content by scanning for code blocks
 */
export function extractLanguagesFromContent(content: string): string[] {
  const languagePattern = /```(\w+)/g;
  const languages = new Set<string>();
  let match;

  while ((match = languagePattern.exec(content)) !== null) {
    const lang = match[1].toLowerCase();
    // Filter to only include programming languages we care about
    const supportedLanguages = [
      'javascript',
      'typescript',
      'python',
      'ruby',
      'java',
      'csharp',
      'go',
      'swift',
      'kotlin',
      'dart',
      'php',
      'objc',
      'flutter',
      'react',
      'nodejs',
    ];
    if (supportedLanguages.includes(lang)) {
      languages.add(lang);
    }
  }

  return Array.from(languages);
}
