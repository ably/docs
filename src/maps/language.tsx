import { DEFAULT_LANGUAGE } from '../../data/createPages/constants';

type LanguageLabels = {
  [language: string]: string;
};

type LanguageSyntaxHighlighterNames = {
  [language: string]: { label: string | null; key: string };
};

const languageLabels: LanguageLabels = {
  javascript: 'JavaScript',
  rt_javascript: 'JavaScript',
  rest_javascript: 'JavaScript',
  java: 'Java',
  rt_java: 'Java',
  rest_java: 'Java',
  kotlin: 'Kotlin',
  rt_kotlin: 'Kotlin',
  rest_kotlin: 'Kotlin',
  ruby: 'Ruby',
  rt_ruby: 'Ruby',
  rest_ruby: 'Ruby',
  python: 'Python',
  rt_python: 'Python',
  rest_python: 'Python',
  php: 'PHP',
  rt_php: 'PHP',
  rest_php: 'PHP',
  csharp: 'C# .NET',
  rt_csharp: 'C# .NET',
  rest_csharp: 'C# .NET',
  go: 'Go',
  rt_go: 'Go',
  rest_go: 'Go',
  cpp: 'C++',
  rt_cpp: 'C++',
  rest_cpp: 'C++',
  dart: 'Dart',
  rt_dart: 'Dart',
  rest_dart: 'Dart',
  swift: 'Swift',
  rt_swift: 'Swift',
  rest_swift: 'Swift',
  objc: 'Objective-C',
  rt_objc: 'Objective-C',
  rest_objc: 'Objective-C',
  nodejs: 'Node.js',
  rt_nodejs: 'Node.js',
  rest_nodejs: 'Node.js',
  flutter: 'Flutter',
  rt_flutter: 'Flutter',
  rest_flutter: 'Flutter',
  android: 'Android',
  rt_android: 'Android',
  rest_android: 'Android',
  shell: 'Shell',
  html: 'HTML',
  json: 'JSON',
  rest: 'REST',
  rt: 'Realtime',
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
  objc: { label: 'Objective-C', key: 'objectivec' },
  nodejs: { label: 'Node.js', key: 'javascript' },
  json: { label: 'JSON', key: 'json' },
  // Kotlin is now preferred, however existing examples use Java & Android interchangeably.
  android: { label: 'Android', key: 'java' },
  // Currently the Flutter platform expects the Dart language
  flutter: { label: 'Flutter', key: 'dart' },
};

export { languageSyntaxHighlighterNames, longLanguageLabels };
export default languageLabels;
