import baseConfig from '../../tailwind.config';
import type { Config } from 'tailwindcss';

const config: Config = {
  ...baseConfig,
  content: ['./src/**/*.{js,ts,tsx}', './index.html'],
};

export default config;
