import type { Config } from 'tailwindcss';
import franken from 'franken-ui/shadcn-ui/preset-quick';

const config: Config = {
  presets: [franken()],
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  safelist: [
    {
      pattern: /^uk-/,
    },
    'ProseMirror',
    'ProseMirror-focused',
    'tiptap',
    'mr-2',
    'mt-2',
    'opacity-50',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
