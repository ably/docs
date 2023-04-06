import { DEFAULT_LANGUAGE } from '../../data/createPages/constants';

type LanguageLabels = {
  [language: string]: string;
};

type LanguageSyntaxHighlighterNames = {
  [language: string]: { label: string | null; key: string };
};

const languageLabels: LanguageLabels = {
  javascript: 'JavaScript v1.2',
  realtime_javascript: 'JavaScript v1.2',
  rest_javascript: 'JavaScript v1.2',
  java: 'Java v2.0',
  realtime_java: 'Java v2.0',
  rest_java: 'Java v2.0',
  kotlin: 'Kotlin v2.0',
  realtime_kotlin: 'Kot lin v2.0',
  rest_kotlin: 'Kotlin v2.0',
  ruby: 'Ruby v1.3',
  realtime_ruby: 'Ruby v1.3',
  rest_ruby: 'Ruby v1.3',
  python: 'Python v2.0',
  realtime_python: 'Python v2.0',
  rest_python: 'Python v2.0',
  php: 'PHP v1.0',
  realtime_php: 'PHP v1.0',
  rest_php: 'PHP v1.0',
  csharp: 'C# .NET v1.2',
  realtime_csharp: 'C# .NET v1.2',
  rest_csharp: 'C# .NET v1.2',
  go: 'Go v2.0',
  realtime_go: 'Go v2.0',
  rest_go: 'Go v2.0',
  cpp: 'C++ v1.2',
  realtime_cpp: 'C++ v1.2',
  rest_cpp: 'C++ v1.2',
  dart: 'Dart v2.0',
  realtime_dart: 'Dart v2.0',
  rest_dart: 'Dart v2.0',
  swift: 'Swift v1.0',
  realtime_swift: 'Swift v1.0',
  rest_swift: 'Swift v1.0',
  objc: 'Objective-C v2.0',
  realtime_objc: 'Objective-C v2.0',
  rest_objc: 'Objective-C v2.0',
  nodejs: 'Node.js v1.2',
  realtime_nodejs: 'Node.js v1.2',
  rest_nodejs: 'Node.js v1.2',
  flutter: 'Flutter v1.2',
  realtime_flutter: 'Flutter v1.2',
  rest_flutter: 'Flutter v1.2',
  android: 'Android v2.0',
  realtime_android: 'Android v2.0',
  rest_android: 'Android v2.0',
  shell: 'Shell',
  html: 'HTML',
  json: 'JSON',
  rest: 'REST',
  realtime: 'Realtime',
  [DEFAULT_LANGUAGE]: 'Any',
};

const longLanguageLabels: LanguageLabels = { ...languageLabels, csharp: 'C# .NET v1.2', javascript: 'JavaScript v1.2' };

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
