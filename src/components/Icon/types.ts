import { glyphs } from './glyphs';

// Static glyph names are checked against the vendored registry; `icon-tech-${language}`
// stays open for the dynamically-built language icons.
export type IconName = keyof typeof glyphs | `icon-tech-${string}`;

export type IconSize = `${number}px` | `${number}em` | `${number}rem` | `calc(${string})`;
