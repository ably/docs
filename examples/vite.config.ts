import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const baseConfig = defineConfig({
  css: {
    postcss: {
      config: path.resolve(process.cwd(), 'postcss.config.mts'),
      plugins: [tailwindcss({ config: path.resolve(process.cwd(), 'tailwind.config.ts') }), autoprefixer()],
    },
  },
});

export default baseConfig;
