import React from 'react';
import Icon from 'src/components/Icon';
import { IconName } from 'src/components/Icon/types';
import cn from 'src/utilities/cn';

type ProductIconProps = {
  name?: IconName;
  hoverName?: IconName;
  selected?: boolean;
  size: number;
  unavailable: boolean;
  className?: string;
};

const ProductIcon = ({ name, hoverName, selected, size, unavailable, className }: ProductIconProps) => {
  if (!name) {
    return null;
  }

  // Padding around the icon is 1/4 the icon's size, so the icon is 4 of 6 parts
  const iconSize = (size / 6) * 4;

  return (
    // Carries the gradient stroke; CSS has no native gradient border.
    <span
      className={cn(
        'flex items-center justify-center border border-neutral-300 dark:border-neutral-1000 rounded-xl',
        'bg-neutral-100 dark:bg-neutral-1200 hover:bg-neutral-000 dark:hover:bg-neutral-1300 active:bg-neutral-000 dark:active:bg-neutral-1300',
        className,
      )}
      style={{ width: size, height: size }}
    >
      {hoverName ? (
        <Icon
          name={hoverName}
          size={`${iconSize}px`}
          additionalCSS={cn({
            'hidden group-hover/product-tile:flex': !selected,
            flex: selected,
          })}
        />
      ) : null}
      <Icon
        name={name}
        size={`${iconSize}px`}
        additionalCSS={cn({
          'text-neutral-000 dark:text-neutral-1300': selected && !unavailable,
          'text-neutral-1300 dark:text-neutral-000': !selected && !unavailable,
          'text-neutral-700 dark:text-neutral-600': selected && unavailable,
          'text-neutral-600 dark:text-neutral-700': !selected && unavailable,
          'flex group-hover/product-tile:hidden': hoverName && !selected,
          hidden: hoverName && selected,
        })}
      />
    </span>
  );
};

export default ProductIcon;
