module Ably
  DOCUMENTATION_LANGUAGES = {
    'javascript' => { name: 'Javascript', extension: 'js' },
    'java' => { name: 'Java', extension: 'java' },
    'python' => { name: 'Python', extension: 'java' },
    'ruby' => { name: 'Ruby', extension: 'java' },
    'nodejs' => { name: 'Node.js', extension: 'java' },
    'ios' => { name: 'iOS', extension: 'java' },
    'csharp' => { name: 'C# .Net', extension: 'cs' },
    'cplusplus' => { name: 'C++', extension: 'cpp' },
    'c' => { name: 'C', extension: 'c' },
    'appcelerator' => { name: 'Appcelerator', extension: 'js' },
    'phonegap' => { name: 'PhoneGap', extension: 'js' },
    'html' => { name: 'HTML', extension: 'html', ignore_from_language_selector: true },
    'json' => { name: 'JSON', extension: 'json' },
    'sh' => { name: 'Shell script', extension: 'sh', ignore_from_language_selector: true },
    'yaml' => { name: 'YAML', extension: 'yaml', ignore_from_language_selector: true }
  } unless defined?(::Ably::DOCUMENTATION_LANGUAGES)
end