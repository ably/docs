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
  'containers-two': '#f1f1f1',
  'containers-three': '#f8f8f8',
};

module.exports = extendConfig((ablyUIConfig) => ({
  ...ablyUIConfig,
  purge: {
    content: ['./src/**/*.{js,jsx}', './node_modules/@ably/ui/**/*', ...ablyUIConfig.purge.content],
    options: {
      ...ablyUIConfig.purge.options,
      safelist: {
        ...ablyUIConfig.purge.options.safelist,
        standard: [
          ...Object.keys(periodicTableOfRealtimeColors).map((c) => `bg-${c}`),
          ...ablyUIConfig.purge.options.safelist.standard,
        ],
      },
    },
  },
  theme: {
    ...ablyUIConfig.theme,
    spacing: {
      ...ablyUIConfig.theme.spacing,
      128: 'var(--spacing-128)',
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
    },
  },
}));
