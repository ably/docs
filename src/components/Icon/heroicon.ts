import * as outline from '@heroicons/react/24/outline';
import * as solid from '@heroicons/react/24/solid';
import * as mini from '@heroicons/react/20/solid';
import * as micro from '@heroicons/react/16/solid';
import type { ComponentType } from 'react';

import type { GlyphProps } from './glyphs';

type HeroiconModule = Record<string, ComponentType<GlyphProps>>;

// mini -> 20/solid, micro -> 16/solid (Heroicons size conventions).
const modules: Record<string, HeroiconModule> = {
  outline: outline as unknown as HeroiconModule,
  solid: solid as unknown as HeroiconModule,
  mini: mini as unknown as HeroiconModule,
  micro: micro as unknown as HeroiconModule,
};

const toPascalCase = (value: string): string =>
  value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

// `icon-gui-<name>-<variant>` resolves to a Heroicon — this is exactly what
// @ably/ui's Icon did internally, so the glyphs are identical.
export const resolveHeroicon = (name: string): ComponentType<GlyphProps> | null => {
  const match = name.match(/^icon-gui-(.+)-(outline|solid|mini|micro)$/);
  if (!match) {
    return null;
  }
  const [, base, variant] = match;
  return modules[variant]?.[`${toPascalCase(base)}Icon`] ?? null;
};
