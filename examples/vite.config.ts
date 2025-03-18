import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const baseConfig = defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss({ config: path.resolve(process.cwd(), 'tailwind.config.ts') }), autoprefixer()],
    },
  },
});

export default baseConfig;
