import { LanguageKey } from '../languages/types';

export type Example = {
  id: string;
  name: string;
  description: string;
  products: string[];
  languages?: LanguageKey[];
  layout?: 'single-horizontal' | 'double-horizontal' | 'single-vertical' | 'double-vertical' | 'single-large';
  visibleFiles?: string[];
  metaTitle?: string;
  metaDescription?: string;
  // Override for the "View on GitHub" button. Defaults to this example's folder
  // in the ably/docs repo; set it when the canonical source lives elsewhere
  // (e.g. a standalone ably-demos repo).
  githubUrl?: string;
};

export type ExampleWithContent = Example & {
  files: ExampleFiles;
  content: string;
};

export type Examples = {
  examples: Example[];
  useCases: { [key: string]: { label: string } };
};

export type ExampleFiles = Partial<Record<LanguageKey, Record<string, string>>>;
