import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    middlewareMode: true, // Use Vite in middleware mode for server logic
  },
});
