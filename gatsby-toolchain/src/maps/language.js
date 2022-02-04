import { DEFAULT_LANGUAGE } from "../../data/createPages/createPageVariants";

const languageLabels = {
    'javascript': 'JS',
    'java': 'Java',
    'ruby': 'Ruby',
    'python': 'Python',
    'php': 'PHP',
    'shell': 'Shell',
    'csharp': 'C#',
    'go': 'Go',
    'html': 'HTML',
    'cpp': 'C++',
    'dart': 'Dart',
    'swift': 'Swift',
    'objc': 'Objective C',
    'nodejs': 'Node.js',
    'json': 'JSON',
    'flutter': 'Flutter',
    'android': 'Android',
    [DEFAULT_LANGUAGE]: 'Any'
};

/**  Source: Ably Voltaire, src/components/code-block/code-block.js */
const languageSyntaxHighlighterNames = {
    plaintext: { label: null, key: 'plaintext' },
    Javascript: { label: 'JS', key: 'javascript' },
    Java: { label: 'Java', key: 'java' },
    Ruby: { label: 'Ruby', key: 'ruby' },
    Python: { label: 'Python', key: 'python' },
    PHP: { label: 'PHP', key: 'php' },
    Shell: { label: 'Shell', key: 'bash' },
    'C#': { label: 'C#', key: 'cs' },
    Go: { label: 'Go', key: 'go' },
    HTML: { label: 'HTML', key: 'xml' },
    'C++': { label: 'C++', key: 'cpp' },
    Dart: { label: 'Dart', key: 'dart' },
    Swift: { label: 'Swift', key: 'swift' },
    'Objective C': { label: 'Objective C', key: 'objectivec' },
    'Node.js': { label: 'Node.js', key: 'javascript' },
    JSON: { label: 'JSON', key: 'json' },
};
  
export { languageSyntaxHighlighterNames };
export default languageLabels;