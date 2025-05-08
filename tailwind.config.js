const extendConfig = require('@ably/ui/tailwind.extend.js');

const safelistStandard = ['mb-40', 'mb-32', 'mb-24', 'pt-128', 'pt-96', 'px-16', 'h-full', 'mx-8', 'transform'];
const safelistGreedy = [/^docs-.*/, /^col-span-.*/, /^rotate-/];

module.exports = extendConfig((ablyUIConfig) => ({
  ...ablyUIConfig,
  content: [
    './src/pages/docs/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/templates/**/*.{ts,tsx}',
    ...ablyUIConfig.content,
  ],
  safelist: [...ablyUIConfig.safelist, ...safelistStandard, ...safelistGreedy],
  theme: {
    ...ablyUIConfig.theme,
    boxShadow: {
      ...ablyUIConfig.theme.boxShadow,
      'container-levitate': '0px 4px 10px rgba(0, 0, 0, 0.06)',
    },
    extend: {
      ...ablyUIConfig.theme.extend,
      width: {
        ...ablyUIConfig.theme.extend.width,
        24: '1.5rem',
        100: '6.25rem',
        140: '8.75rem',
        160: '10rem',
        244: '15.25rem',
      },
      minWidth: {
        ...ablyUIConfig.theme.extend.minWidth,
        24: '1.5rem',
        100: '6.25rem',
        140: '8.75rem',
        170: '10.625rem',
        610: '38.125rem',
      },
      maxWidth: {
        ...ablyUIConfig.theme.extend.maxWidth,
        400: '25rem',
      },
      gridTemplateColumns: {
        'header-layout': '173px minmax(200px, 400px) 1fr',
      },
      keyframes: {
        ...ablyUIConfig.theme.extend.keyframes,
        fadeInTenPercent: {
          from: { opacity: 0 },
          to: { opacity: 0.1 },
        },
      },
    },
  },
  variants: {
    ...ablyUIConfig.variants,
    extend: {
      ...ablyUIConfig.variants.extend,
      margin: ['first', 'last'],
    },
  },
}));
