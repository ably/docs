import fs from 'fs';
import path from 'path';
import { examples, DEFAULT_EXAMPLE_LANGUAGES } from '../src/data/examples';
import type { Example, ExampleWithContent, ExampleFiles } from '../src/data/examples/types';
import type { LanguageKey } from '../src/data/languages/types';

const EXAMPLES_PATH = path.join(process.cwd(), 'examples');

/**
 * Get all example IDs for generateStaticParams
 */
export function getAllExampleIds(): string[] {
  return examples.map((example) => example.id);
}

/**
 * Get example metadata by ID
 */
export function getExampleById(id: string): Example | undefined {
  return examples.find((example) => example.id === id);
}

/**
 * Read all files for an example project in a specific language
 */
function readExampleFiles(exampleId: string, language: LanguageKey): Record<string, string> {
  const languagePath = path.join(EXAMPLES_PATH, exampleId, language);
  const files: Record<string, string> = {};

  if (!fs.existsSync(languagePath)) {
    return files;
  }

  function readDir(dir: string, basePath: string = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name;

      if (entry.isDirectory()) {
        // Skip node_modules and hidden directories
        if (entry.name !== 'node_modules' && !entry.name.startsWith('.')) {
          readDir(fullPath, relativePath);
        }
      } else if (entry.isFile()) {
        // Skip certain file types
        const ext = path.extname(entry.name).toLowerCase();
        const skipExtensions = ['.lock', '.log'];
        const skipFiles = ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'];

        if (!skipExtensions.includes(ext) && !skipFiles.includes(entry.name)) {
          const content = fs.readFileSync(fullPath, 'utf8');

          // For React examples, strip 'src/' prefix from paths
          if (language === 'react' && relativePath.startsWith('src/')) {
            files[relativePath.replace('src/', '')] = content;
          } else {
            files[relativePath] = content;
          }
        }
      }
    }
  }

  readDir(languagePath);
  return files;
}

/**
 * Get example with all its file contents
 */
export function getExampleWithContent(id: string): ExampleWithContent | null {
  const example = getExampleById(id);

  if (!example) {
    return null;
  }

  const languages = example.languages ?? (DEFAULT_EXAMPLE_LANGUAGES as LanguageKey[]);
  const files: ExampleFiles = {};

  for (const language of languages) {
    const languageFiles = readExampleFiles(id, language);
    if (Object.keys(languageFiles).length > 0) {
      files[language] = languageFiles;
    }
  }

  // Get README content if available
  let content = '';
  const firstLanguage = languages[0];
  if (files[firstLanguage]?.['README.md']) {
    content = files[firstLanguage]['README.md'];
  }

  return {
    ...example,
    files,
    content,
  };
}

/**
 * Get all examples with their content (for static generation)
 */
export function getAllExamplesWithContent(): ExampleWithContent[] {
  return examples
    .map((example) => getExampleWithContent(example.id))
    .filter((example): example is ExampleWithContent => example !== null);
}
