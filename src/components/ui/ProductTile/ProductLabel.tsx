import React from 'react';
import cn from 'src/utilities/cn';

type ProductLabelProps = {
  label: string;
  unavailable: boolean;
  selected?: boolean;
  numericalSize: number;
  showLabel?: boolean;
  className?: string;
};

const LABEL_FONT_SIZE_RATIO = 4;
const NAME_FONT_SIZE_RATIO = 2.6;

const ProductLabel = ({ label, unavailable, selected, numericalSize, showLabel, className }: ProductLabelProps) => {
  if (!label || !showLabel) {
    return null;
  }

  const dynamicFontSize = numericalSize / LABEL_FONT_SIZE_RATIO;

  return (
    <span className="flex flex-col justify-center">
      {unavailable ? (
        <span className="block">
          <span
            className="table-cell font-sans bg-neutral-300 dark:bg-neutral-1000 rounded-full text-gui-disabled-light dark:text-gui-disabled-dark tracking-[0.04em] font-bold leading-snug"
            style={{
              fontSize: dynamicFontSize * 0.6,
              padding: `${dynamicFontSize * 0.25}px ${dynamicFontSize * 0.5}px`,
            }}
          >
            COMING SOON
          </span>
        </span>
      ) : (
        <span
          className={cn(
            'block font-bold uppercase ui-text-p2 leading-snug',
            { 'text-neutral-500 dark:text-neutral-700': selected },
            { 'text-neutral-700 dark:text-neutral-500': !selected },
          )}
          style={{
            fontSize: dynamicFontSize,
            letterSpacing: '0.06em',
          }}
        >
          Ably
        </span>
      )}
      <span
        className={cn(
          'block ui-text-p2 font-bold',
          {
            'text-neutral-000 dark:text-neutral-1300': selected === true && !unavailable,
          },
          {
            'text-neutral-1000 dark:text-neutral-300 group-hover/product-tile:text-neutral-1300 dark:group-hover/product-tile:text-neutral-000':
              selected === false && !unavailable,
          },
          {
            'text-neutral-1300 dark:text-neutral-000': selected === undefined && !unavailable,
          },
          {
            'text-neutral-700 dark:text-neutral-600': unavailable,
          },
          { 'mt-[-3px]': !unavailable },
          className,
        )}
        style={{ fontSize: numericalSize / NAME_FONT_SIZE_RATIO }}
      >
        {label}
      </span>
    </span>
  );
};

export default ProductLabel;
