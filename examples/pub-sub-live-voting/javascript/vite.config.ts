import { defineConfig } from 'vite';
import baseConfig from '../../vite.config';

export default defineConfig({
  ...baseConfig,
  envDir: '../../',
  // Clone-only convenience: when running the client on Vite's dev server,
  // proxy the auth + shows API to the local Express server (see ../server).
  // The hosted docs sandbox ignores this — it runs without a backend.
  server: {
    proxy: {
      '/auth': 'http://localhost:3000',
      '/api': 'http://localhost:3000',
    },
  },
});
