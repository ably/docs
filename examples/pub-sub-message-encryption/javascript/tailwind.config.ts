import baseConfig from '../../tailwind.config';
import type { Config } from 'tailwindcss';

const config: Config = {
  ...baseConfig,
  content: [...(Array.isArray(baseConfig.content) ? baseConfig.content : []), './src/**/*.ts'],
};

export default config;
