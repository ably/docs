import { GatsbyNode } from 'gatsby';
import path from 'path';
import fs from 'fs';

export type LayoutOptions = {
  leftSidebar: boolean;
  rightSidebar: boolean;
  searchBar: boolean;
  template: string;
};

const mdxWrapper = path.resolve('src/components/Layout/MDXWrapper.tsx');

const pageLayoutOptions: Record<string, LayoutOptions> = {
  '/docs': { leftSidebar: true, rightSidebar: false, searchBar: true, template: 'index' },
  '/docs/api/control-api': { leftSidebar: false, rightSidebar: false, searchBar: true, template: 'control-api' },
  '/docs/sdks': { leftSidebar: false, rightSidebar: false, searchBar: true, template: 'sdk' },
  '/examples': { leftSidebar: false, rightSidebar: false, searchBar: true, template: 'examples' },
  '/docs/how-to/pub-sub': { leftSidebar: true, rightSidebar: true, searchBar: true, template: 'how-to' },
  '/docs/404': { leftSidebar: false, rightSidebar: false, searchBar: false, template: '404' },
};

// Function to extract code element classes from an MDX file
const extractCodeLanguages = async (filePath: string): Promise<Set<string>> => {
  try {
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return new Set();
    }

    // Read the file content
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Find all instances of code blocks with language specifiers (```language)
    const codeBlockRegex = /```(\w+)/g;
    let match;
    const languages = new Set<string>();

    while ((match = codeBlockRegex.exec(fileContent)) !== null) {
      if (match[1] && match[1].trim()) {
        languages.add(match[1].trim());
      }
    }
    return languages;
  } catch (error) {
    console.error(`Error extracting code element classes from ${filePath}:`, error);
    return new Set();
  }
};

export const onCreatePage: GatsbyNode['onCreatePage'] = async ({ page, actions }) => {
  const { createPage } = actions;
  const pathOptions = Object.entries(pageLayoutOptions).find(([path]) => page.path === path);
  const isMDX = page.component.endsWith('.mdx');
  const detectedLanguages = isMDX ? await extractCodeLanguages(page.component) : new Set();

  if (pathOptions || isMDX) {
    createPage({
      ...page,
      context: {
        ...page.context,
        layout: pathOptions ? pathOptions[1] : { sidebar: true, searchBar: true, template: 'base' },
        ...(isMDX ? { languages: Array.from(detectedLanguages) } : {}),
      },
      component: isMDX ? `${mdxWrapper}?__contentFilePath=${page.component}` : page.component,
    });
  }
};
