import React, { useCallback, useId } from 'react';

import cn from 'src/utilities/cn';

import { glyphs, type GlyphProps } from './glyphs';
import { setUniqueIds } from './set-unique-ids';
import type { IconName } from './types';

export type { IconName };

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'color'> {
  name: IconName;
  /** CSS width & height, e.g. "1rem" or "20px". */
  size?: string;
  /** Tailwind text-colour class, appended to the icon's className. */
  color?: string;
  additionalCSS?: string;
}

type SvgComponent = React.ForwardRefExoticComponent<GlyphProps & React.RefAttributes<SVGSVGElement>>;

// Renders a vendored Ably glyph by name; unknown names render null. Heroicons are
// imported directly as components at call sites — this only handles Ably's own icons.
const Icon = ({
  name,
  size = '0.75rem',
  color,
  additionalCSS = '',
  className,
  style,
  ...rest
}: IconProps): React.ReactElement | null => {
  const Component = glyphs[name as keyof typeof glyphs] as SvgComponent | undefined;

  // Per-instance id rewriting so a gradient/mask glyph rendered more than once on a
  // page doesn't collide on duplicate DOM ids.
  const uniqueId = useId();
  const ref = useCallback((el: SVGSVGElement | null) => setUniqueIds(el, uniqueId), [uniqueId]);

  if (!Component) {
    // Dev-only: a name with no vendored glyph renders nothing. Surfaces typos and
    // un-vendored names (e.g. a Heroicon name) that the open IconName type can't catch.
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[Icon] no glyph for "${name}", render skipped`);
    }
    return null;
  }

  return (
    <Component
      ref={ref}
      aria-hidden
      className={cn(color, additionalCSS, className) || undefined}
      style={{ width: size, height: size, ...style }}
      {...rest}
    />
  );
};

export default Icon;
