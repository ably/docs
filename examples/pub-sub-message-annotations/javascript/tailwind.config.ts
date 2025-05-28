import baseConfig from '../../tailwind.config';
import type { Config } from 'tailwindcss';

const config: Config = {
  ...baseConfig,
  content: ['./src/**/*.{js,ts,tsx}', './index.html'],
  safelist: [
    // allow dynamic classes for colors
    {
      pattern: /(bg|text|border)-(blue|green|purple|amber|red|gray)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /border-(l|t|r|b)-(blue|green|purple|amber|red|gray)-(50|100|200|300|400|500|600|700|800|900)/,
    },
  ],
};

export default config;
