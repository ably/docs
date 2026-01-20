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
      fontFamily: {
        serif: ['IBM Plex Serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
      gridTemplateColumns: {
        'header-layout': '173px minmax(200px, 400px) 1fr',
      },
      keyframes: {
        ...ablyUIConfig.theme.extend.keyframes,
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        ...ablyUIConfig.theme.extend.animation,
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
}));
