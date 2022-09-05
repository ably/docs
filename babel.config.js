module.exports = {
  presets: ['babel-preset-gatsby', '@babel/preset-typescript'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
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
          'javascript',
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
