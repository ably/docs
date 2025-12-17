const { TextEncoder, TextDecoder } = require('node:util');

Reflect.set(globalThis, 'TextEncoder', TextEncoder);
Reflect.set(globalThis, 'TextDecoder', TextDecoder);

// Polyfill setImmediate and clearImmediate for undici
// undici uses these Node.js-specific timers internally, but they don't exist in jsdom
const { setImmediate: nodeSetImmediate, clearImmediate: nodeClearImmediate } = require('node:timers');

Reflect.set(globalThis, 'setImmediate', nodeSetImmediate);
Reflect.set(globalThis, 'clearImmediate', nodeClearImmediate);

const { Blob } = require('node:buffer');
const { fetch, Request, Response, Headers, FormData } = require('undici');

Reflect.set(globalThis, 'fetch', fetch);
Reflect.set(globalThis, 'Blob', Blob);
Reflect.set(globalThis, 'Request', Request);
Reflect.set(globalThis, 'Response', Response);
Reflect.set(globalThis, 'Headers', Headers);
Reflect.set(globalThis, 'FormData', FormData);
