const extendConfig = require('@ably/ui/tailwind.extend.js');

const apiReferenceSpecificColors = {
  'api-reference-attribute-highlight': '#ffe6dc',
  'api-reference-attribute-border': '#ff9e7a',
};

const highlightColors = {
  'notification-background': '#0073e6',
  'active-language-button': '#ff5416',
  'disabled-tab-button': '#979798',
};

const legacyBrandColors = {
  'brand-black': '#161616',
  'brand-richOrange': '#ed760a',
};
const safelistStandard = ['mb-40', 'mb-32', 'mb-24', 'pt-128', 'pt-96', 'px-16', 'h-full', 'mx-8', 'transform'];
const safelistGreedy = [/^docs-.*/, /^col-span-.*/, /^rotate-/];

module.exports = extendConfig((ablyUIConfig) => ({
  ...ablyUIConfig,
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/@ably/ui/**/*', ...ablyUIConfig.content],
  safelist: {
    ...ablyUIConfig.safelist,
    ...Object.keys(apiReferenceSpecificColors).map((c) => `bg-${c}`),
    ...Object.keys(highlightColors).map((c) => `bg-${c}`),
    ...safelistStandard,
    ...safelistGreedy,
  },
  theme: {
    ...ablyUIConfig.theme,
    boxShadow: {
      ...ablyUIConfig.theme.boxShadow,
      'container-avoid-left': '40px 40px 40px 0px rgba(0,0,0,0.1)',
      'container-hover': '0px 24px 32px rgba(0, 0, 0, 0.05)',
      'container-levitate': '0px 4px 10px rgba(0, 0, 0, 0.06)',
    },
    spacing: {
      ...ablyUIConfig.theme.spacing,
      2: '0.125rem',
      8: '0.5rem',
      12: '0.75rem',
      13: '0.8125rem',
      22: '1.375rem',
      30: '1.875rem',
      38: '2.375rem',
      40: '2.5rem',
      78: '4.875rem',
      112: '7rem',
      128: '8rem',
      140: '8.75rem',
      200: '12.5rem',
      240: '15rem',
      244: '15.25rem',
      300: '18.75rem',
      320: '20rem',
      420: '26.25rem',
      'adapt-homepage-link-medium': 'calc(9% - 2.5rem)',
      'adapt-homepage-link-large': 'calc(0.75rem + 4%)',
      full: '100%',
    },
    screens: {
      ...ablyUIConfig.theme.screens,
      '2xl': '1920px',
    },
    extend: {
      ...ablyUIConfig.theme.extend,
      lineHeight: {
        ...ablyUIConfig.theme.lineHeight,
        normal: 'var(--lh-normal)',
      },
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
        24: '1.5rem',
        100: '6.25rem',
        140: '8.75rem',
        400: '25rem',
        512: '32rem',
        820: '51.25rem',
        1264: '79rem',
        1312: '82rem',
      },
      colors: {
        ...apiReferenceSpecificColors,
        ...highlightColors,
        ...legacyBrandColors,
      },
      gridRowStart: {
        9: '9',
        10: '10',
        11: '11',
        12: '12',
        13: '13',
        14: '14',
        15: '15',
        16: '16',
        17: '17',
      },
      gridTemplateColumns: {
        layout: 'minmax(200px, 924px) 200px',
        'large-layout': 'minmax(200px, 924px) 200px',
        'two-col-layout': 'minmax(200px, 1104px)',
        'header-layout': '173px minmax(200px, 400px) 1fr',
        'footer-layout': '244px auto',
      },
      rotate: {
        ...ablyUIConfig.theme.extend.rotate,
        270: '270deg',
      },
      zIndex: {
        ...ablyUIConfig.theme.extend.zIndex,
        1: '1',
      },
      fontSize: {
        ...ablyUIConfig.theme.extend.fontSize,
        16: ['16px', '18px'],
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
