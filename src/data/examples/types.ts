import { LanguageKey } from '../languages/types';
import { UseCase } from './index';

export type Example = {
  id: string;
  name: string;
  description: string;
  products: string[];
  useCases: UseCase[];
  languages?: LanguageKey[];
  layout?: 'one-ui' | 'two-ui' | 'ui-console';
  visibleFiles?: string[];
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
