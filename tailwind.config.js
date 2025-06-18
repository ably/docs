const extendConfig = require('@ably/ui/tailwind.extend.js');

module.exports = extendConfig((ablyUIConfig) => ({
  ...ablyUIConfig,
  content: [
    './src/pages/docs/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/templates/**/*.{ts,tsx}',
    ...ablyUIConfig.content,
  ],
  theme: {
    ...ablyUIConfig.theme,
    extend: {
      ...ablyUIConfig.theme.extend,
      gridTemplateColumns: {
        'header-layout': '173px minmax(200px, 400px) 1fr',
      },
    },
  },
}));
