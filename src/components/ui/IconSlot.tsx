import React, { ReactNode } from 'react';
import type { ClassValue } from 'clsx';
import cn from 'src/utilities/cn';

// Sizes an icon element (a Heroicon or an Ably <Icon> glyph) to `size` and tints it via
// `colorClass`. The `!` forces the dimensions onto a glyph <Icon>, which otherwise sets its
// own inline width/height. The single home for the icon-sizing convention across the vendored
// components (Button/Badge/SegmentedControl/CodeSnippet).
const IconSlot = ({ icon, size, colorClass }: { icon: ReactNode; size: string; colorClass?: ClassValue }) => (
  <span
    className={cn('inline-flex shrink-0 [&>svg]:!w-full [&>svg]:!h-full', colorClass)}
    style={{ width: size, height: size }}
  >
    {icon}
  </span>
);

export default IconSlot;
