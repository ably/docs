import { identity } from 'lodash';

export const safeWindow =
  typeof window === 'undefined'
    ? {
        navigator: {
          platform: '',
        },
        location: {
          pathname: '',
          hash: '',
          host: '',
          hostname: '',
          href: '',
          origin: '',
          port: '',
          protocol: '',
        },
        localStorage: {
          length: 0,
          getItem: identity,
          setItem: identity,
          removeItem: identity,
          key: identity,
          clear: identity,
        },
        sessionStorage: {
          length: 0,
          getItem: identity,
          setItem: identity,
          removeItem: identity,
          key: identity,
          clear: identity,
        },
        addEventListener: identity,
        Boomerang: null,
        Headway: null,
        dataLayer: null,
      }
    : (window as Window &
        typeof globalThis & {
          Boomerang?: { init: (params: unknown) => void };
          Headway?: { init: (params: unknown) => void };
          dataLayer?: Record<string, string | number>[];
        });
