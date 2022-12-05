const DOCUMENTATION_LANGUAGES = [
  'javascript',
  'java',
  'android',
  'kotlin',
  'python',
  'php',
  'ruby',
  'nodejs',
  'typescript',
  'objc',
  'swift',
  'go',
  'csharp',
  'cplusplus',
  'flutter',
  'c',
  'css',
  'appcelerator',
  'phonegap',
  'curl',
  'html',
  'json',
  'sh',
  'yaml',
];

const languageRegex = /<%= Ably::DOCUMENTATION_LANGUAGES.map { \|lang_id, lang\| "@#{lang_id}@" }\.join\(', '\) %>/g;

const languageReplacer = (content) =>
  content.replace(languageRegex, DOCUMENTATION_LANGUAGES.map((lang) => `@${lang}@`).join(', '));

module.exports = {
  languageReplacer,
};
