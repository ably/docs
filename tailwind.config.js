const extendConfig = require('@ably/ui/tailwind.extend.js');

const periodicTableOfRealtimeColors = {
  'low-level-transport': 'var(--color-jazzy-pink)',
  'application-transport': '#e40060',
  'realtime-transport': '#ff2739',
  'event-driven-push-transport': '#d9d9da',
  'push-notifications': '#80B9F2',
  'realtime-and-messaging-protocol': '#4af7ff',
  'event-driven-software': '#08ff13',
  'open-source-realtime-software': '#82a912',
  'cloud-native-realtime-service': '#ff5416',
  'proprietary-realtime-software': '#0073e6',
  'decentralized-protocol': '#9b4633',
  'framework-extension-for-realtime': '#b76868',
  'realtime-db-software': '#a4863b',
  'realtime-application-service': '#76767c',
  'streaming-gateway-service': '#338F9B',
  'containers-one': '#ebebeb',
  'containers-two': '#F5F5F6',
  'containers-three': '#FAFAFB',
};

module.exports = extendConfig((ablyUIConfig) => ({
  ...ablyUIConfig,
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/@ably/ui/**/*', ...ablyUIConfig.purge.content],
    options: {
      ...ablyUIConfig.purge.options,
      safelist: {
        ...ablyUIConfig.purge.options.safelist,
        /**
         * Purge exclusions must be added for all dynamic classNames.
         * We should seek to remove these where possible, replacing with docs-* classNames or static classNames.
         * If dynamic classNames are no longer present they can be removed here:
         * mb-40, mb-32, mb-24 => src/components/blocks/headings/
         * pt-128, pt-96 => src/components/Layout/index.js
         * px-16 => src/templates/document.js := see also
         *  - src/components/Sidebar/RightSidebar/index.js
         *  - src/components/Sidebar/LeftSidebar/index.js
         *  - src/components/Sidebar/index.js
         * h-full, mx-8 => src/components/Sidebar/SidebarItem.js
         * transform => src/components/Header/TopMainNav/HamburgerMenu/HamburgerDropdown/HamburgerSidebarRenderer/HamburgerSidebarSubmenu.tsx
         */
        standard: [
          ...Object.keys(periodicTableOfRealtimeColors).map((c) => `bg-${c}`),
          ...ablyUIConfig.purge.options.safelist.standard,
          'mb-40',
          'mb-32',
          'mb-24',
          'pt-128',
          'pt-96',
          'px-16',
          'h-full',
          'mx-8',
          'transform',
        ],
        /**
         * Purge exclusions must be added for all dynamic classNames.
         * We should seek to consolidate these where possible, replacing with docs-* classNames.
         * If dynamic classNames are no longer present they can be removed here:
         * docs-.* => Preferred prefix for custom classes throughout
         * col-span-.*  => src/components/Article/index.js
         * rotate- => src/components/Header/TopMainNav/HamburgerMenu/HamburgerDropdown/HamburgerSidebarRenderer/HamburgerSidebarSubmenu.tsx
         */
        greedy: [...ablyUIConfig.purge.options.safelist.greedy, /^docs-.*/, /^col-span-.*/, /^rotate-/],
      },
    },
  },
  theme: {
    ...ablyUIConfig.theme,
    boxShadow: {
      ...ablyUIConfig.theme.boxShadow,
      'container-avoid-left': '40px 40px 40px 0px rgba(0,0,0,0.1)',
    },
    spacing: {
      ...ablyUIConfig.theme.spacing,
      12: '0.75rem',
      30: '1.875rem',
      38: '2.375rem',
      128: 'var(--spacing-128)',
      300: '18.75rem',
      420: '26.25rem',
      full: '100%',
    },
    extend: {
      ...ablyUIConfig.theme.extend,
      colors: periodicTableOfRealtimeColors,
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
}));
