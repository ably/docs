module Ably
  DOCUMENTATION_LANGUAGES = {
    'javascript' => { name: 'Javascript', extension: 'js' },
    'java' => { name: 'Java', extension: 'java' },
    'android' => { name: 'Android', extension: 'java' },
    'python' => { name: 'Python', extension: 'py' },
    'php' => { name: 'PHP', extension: 'php' },
    'ruby' => { name: 'Ruby', extension: 'ruby' },
    'nodejs' => { name: 'Node.js', extension: 'js' },
    'objc' => { name: 'Obj-C', extension: 'm' },
    'swift' => { name: 'Swift', extension: 'swift' },
    'go' => { name: 'Go', extension: 'go' },
    'csharp' => { name: 'C# .Net', extension: 'cs' },
    'cplusplus' => { name: 'C++', extension: 'cpp' },
    'c' => { name: 'C', extension: 'c' },
    'appcelerator' => { name: 'Appcelerator', extension: 'js' },
    'phonegap' => { name: 'PhoneGap', extension: 'js' },
    'html' => { name: 'HTML', extension: 'html', ignore_from_language_selector: true },
    'json' => { name: 'JSON', extension: 'json', ignore_from_language_selector: true },
    'sh' => { name: 'Shell script', extension: 'sh', ignore_from_language_selector: true },
    'yaml' => { name: 'YAML', extension: 'yaml', ignore_from_language_selector: true }
  } unless defined?(::Ably::DOCUMENTATION_LANGUAGES)
end
