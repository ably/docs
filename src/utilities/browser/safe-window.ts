import { identity } from 'lodash';

export const safeWindow =
  typeof window === 'undefined'
    ? {
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
        addEventListener: identity,
      }
    : window;
