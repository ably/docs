import React, { useCallback, useId } from 'react';

import cn from 'src/utilities/cn';

import { glyphs, type GlyphProps } from './glyphs';
import { resolveHeroicon } from './heroicon';
import { setUniqueIds } from './set-unique-ids';
import type { IconName } from './types';

export type { IconName };

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'color'> {
  name: IconName;
  /** CSS width & height, e.g. "1rem" or "20px". */
  size?: string;
  /** Tailwind text-colour class — applied via `currentColor`. */
  color?: string;
  additionalCSS?: string;
}

type SvgComponent = React.ForwardRefExoticComponent<GlyphProps & React.RefAttributes<SVGSVGElement>>;

//
// docs-local Icon (DX-1128), replacing @ably/ui/core/Icon. `icon-gui-*` names
// resolve to Heroicons; everything else (custom gui, product, social and tech
// logos) comes from the vendored glyph registry. Unknown names render nothing,
// matching @ably/ui's behaviour for an unrecognised icon.
//
const Icon = ({
  name,
  size = '0.75rem',
  color,
  additionalCSS = '',
  className,
  style,
  ...rest
}: IconProps): React.ReactElement | null => {
  const Component = (glyphs[name] ?? resolveHeroicon(name)) as SvgComponent | null;

  // Per-instance id rewriting so a gradient/mask-bearing glyph rendered more than
  // once on a page doesn't collide on duplicate DOM ids (ported from @ably/ui).
  const uniqueId = useId();
  const ref = useCallback((el: SVGSVGElement | null) => setUniqueIds(el, uniqueId), [uniqueId]);

  if (!Component) {
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
