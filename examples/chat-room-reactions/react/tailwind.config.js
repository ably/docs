import type { Config } from "tailwindcss";
import franken from 'franken-ui/shadcn-ui/preset-quick';

const config: Config = {
  presets: [franken()],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern: /^uk-/,
    },
    "ProseMirror",
    "ProseMirror-focused",
    "tiptap",
    "mr-2",
    "mt-2",
    "opacity-50",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
