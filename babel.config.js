module.exports = {
  presets: ['babel-preset-gatsby', '@babel/preset-typescript'],
  plugins: [
    [
      'prismjs',
      {
        languages: [
          'bash',
          'c',
          'clike',
          'csharp',
          'css',
          'dart',
          'go',
          'java',
          'javascript',
          'kotlin',
          'jsx',
          'objectivec',
          'php',
          'python',
          'ruby',
          'swift',
          'tsx',
          'typescript',
          'yaml',
        ],
        theme: 'tomorrow',
        css: true,
      },
    ],
  ],
  env: {
    production: {
      plugins: ['transform-react-remove-prop-types'],
    },
  },
};
