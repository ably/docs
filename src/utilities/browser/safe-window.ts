import { identity } from 'lodash';

export const safeWindow =
  typeof window === 'undefined'
    ? {
        location: '',
        localStorage: {
          length: 0,
          getItem: identity,
          setItem: identity,
          removeItem: identity,
          key: identity,
          clear: identity,
        },
      }
    : window;
