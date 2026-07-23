import React from 'react';
import cn from 'src/utilities/cn';

type ProductDescriptionProps = {
  description: string;
  selected?: boolean;
  unavailable: boolean;
  showDescription?: boolean;
  className?: string;
};

const ProductDescription = ({
  description,
  selected,
  unavailable,
  showDescription = true,
  className,
}: ProductDescriptionProps) => {
  if (!description || !showDescription) {
    return null;
  }

  return (
    <span
      className={cn(
        'block ui-text-p3 font-medium leading-snug',
        {
          'text-neutral-300 dark:text-neutral-1000': selected && !unavailable,
        },
        {
          'text-neutral-800 dark:text-neutral-500 group-hover/product-tile:text-neutral-1000 dark:group-hover/product-tile:text-neutral-300':
            !selected,
        },
        className,
      )}
    >
      {description}
    </span>
  );
};

export default ProductDescription;
