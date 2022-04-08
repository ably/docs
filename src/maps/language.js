import { DEFAULT_LANGUAGE } from '../../data/createPages/constants';

const languageLabels = {
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

/**  Source: Ably Voltaire, src/components/code-block/code-block.js */
const languageSyntaxHighlighterNames = {
  plaintext: { label: null, key: 'plaintext' },
  javascript: { label: 'JS', key: 'javascript' },
  java: { label: 'Java', key: 'java' },
  ruby: { label: 'Ruby', key: 'ruby' },
  python: { label: 'Python', key: 'python' },
  php: { label: 'PHP', key: 'php' },
  shell: { label: 'Shell', key: 'bash' },
  csharp: { label: 'C#', key: 'cs' },
  go: { label: 'Go', key: 'go' },
  html: { label: 'HTML', key: 'xml' },
  cpp: { label: 'C++', key: 'cpp' },
  dart: { label: 'Dart', key: 'dart' },
  swift: { label: 'Swift', key: 'swift' },
  objc: { label: 'Objective C', key: 'objectivec' },
  nodejs: { label: 'Node.js', key: 'javascript' },
  json: { label: 'JSON', key: 'json' },
  android: { label: 'Android', key: 'androidstudio' },
  flutter: { label: 'Flutter', key: 'flutter' },
};

export { languageSyntaxHighlighterNames };
export default languageLabels;
