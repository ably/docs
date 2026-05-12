const extendConfig = require('@ably/ui/tailwind.extend.js');
const typography = require('@tailwindcss/typography');

module.exports = extendConfig((ablyUIConfig) => ({
  ...ablyUIConfig,
  content: [
    './src/**/*.{astro,ts,tsx,mdx,html}',
    // Pull in the Gatsby tree so we can reuse MDX + components unchanged.
    '../src/pages/**/*.{ts,tsx,mdx}',
    '../src/components/**/*.{ts,tsx}',
    ...ablyUIConfig.content,
  ],
  // @ably/ui's preset disables preflight (its host sites own their resets).
  // We do the same and add Tailwind Typography to style MDX prose content.
  plugins: [...(ablyUIConfig.plugins ?? []), typography],
}));
