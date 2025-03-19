import type { Config } from 'tailwindcss';
import franken from 'franken-ui/shadcn-ui/preset-quick';

const baseConfig: Config = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore (franken-ui/shadcn-ui/preset-quick is not properly typed - JH)
  presets: [franken()],
  content: ['./**/*.{js,ts,tsx}'],
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
    extend: { sizing: true },
  },
  plugins: [],
};

export default baseConfig;
