import baseConfig from '../../vite.config';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

export default defineConfig({
  ...baseConfig,
});
