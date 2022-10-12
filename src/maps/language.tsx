import { DEFAULT_LANGUAGE } from '../../data/createPages/constants';

type LanguageLabels = {
  [language: string]: string;
};

type LanguageSyntaxHighlighterNames = {
  [language: string]: { label: string | null; key: string };
};

const languageLabels: LanguageLabels = {
  javascript: 'JS',
  java: 'Java',
  ruby: 'Ruby',
  python: 'Python',
  php: 'PHP',
  shell: 'Shell',
  csharp: 'C#',
  go: 'Go',
  html: 'HTML',
  cpp: 'C++',
  dart: 'Dart',
  swift: 'Swift',
  objc: 'Objective C',
  nodejs: 'Node.js',
  json: 'JSON',
  flutter: 'Flutter',
  android: 'Android',
  [DEFAULT_LANGUAGE]: 'Any',
};

const longLanguageLabels: LanguageLabels = { ...languageLabels, csharp: 'C# .NET', javascript: 'JavaScript' };

/**  Source: Ably Voltaire, src/components/code-block/code-block.js */
const languageSyntaxHighlighterNames: LanguageSyntaxHighlighterNames = {
  plaintext: { label: null, key: 'plaintext' },
  javascript: { label: 'JS', key: 'javascript' },
  java: { label: 'Java', key: 'java' },
  ruby: { label: 'Ruby', key: 'ruby' },
  python: { label: 'Python', key: 'python' },
  php: { label: 'PHP', key: 'php' },
  shell: { label: 'Shell', key: 'bash' },
  csharp: { label: 'C#', key: 'csharp' },
  go: { label: 'Go', key: 'go' },
  html: { label: 'HTML', key: 'xml' },
  cpp: { label: 'C++', key: 'cpp' },
  dart: { label: 'Dart', key: 'dart' },
  swift: { label: 'Swift', key: 'swift' },
  objc: { label: 'Objective C', key: 'objectivec' },
  nodejs: { label: 'Node.js', key: 'javascript' },
  json: { label: 'JSON', key: 'json' },
  // Kotlin is now preferred, however existing examples use Java & Android interchangeably.
  android: { label: 'Android', key: 'java' },
  // Currently the Flutter platform expects the Dart language
  flutter: { label: 'Flutter', key: 'dart' },
};

export { languageSyntaxHighlighterNames, longLanguageLabels };
export default languageLabels;
