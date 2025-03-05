import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import wasm from 'vite-plugin-wasm';

dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

export default defineConfig({
  css: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  plugins: [wasm()],
});
