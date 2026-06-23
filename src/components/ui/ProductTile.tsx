import React from 'react';
import cn from 'src/utilities/cn';
import { IconSize } from 'src/components/Icon/types';
import LinkButton from './LinkButton';
import { ProductName, products } from './ProductTile/data';
import ProductIcon from './ProductTile/ProductIcon';
import ProductLabel from './ProductTile/ProductLabel';
import ProductDescription from './ProductTile/ProductDescription';

/**
 * Props for the ProductTile component.
 */
export type ProductTileProps = {
  /**
   * The name of the product.
   */
  name: ProductName;

  /**
   * Indicates if the product tile is selected. If `undefined`, the product tile is not selectable.
   * @default false
   */
  selected?: boolean;

  /**
   * Indicates if the product tile is on the "current" page. Changes CTA copy.
   * @default false
   */
  currentPage?: boolean;

  /**
   * Additional CSS class names to apply to the product tile outer container.
   */
  className?: string;

  /**
   * Additional CSS class names to apply to the product description container.
   */
  descriptionClassName?: string;

  /**
   * Additional CSS class names to apply to the product name / label container.
   */
  labelClassName?: string;

  /**
   * Additional CSS class names to apply to the product icon.
   */
  iconClassName?: string;

  /**
   * Callback function to handle click events on the product tile.
   */

  onClick?: () => void;

  /**
   * Indicates if the product description should be shown.
   * @default true
   */
  showDescription?: boolean;

  /**
   * Indicates if the product label should be shown.
   * @default true
   */
  showLabel?: boolean;

  /**
   * The size of the product icon.
   * @default "40px"
   */
  size?: IconSize;

  /**
   * Indicates if the product icons should be animated.
   * @default false
   */
  animateIcons?: boolean;
};

const CONTAINER_GAP_RATIO = 3;

const ProductTile = ({
  name,
  selected,
  currentPage,
  className,
  onClick,
  showDescription = true,
  showLabel = true,
  size = '40px',
  animateIcons = false,
  descriptionClassName,
  labelClassName,
  iconClassName,
}: ProductTileProps) => {
  const { icon, hoverIcon, label, description, link, unavailable } = products[name] ?? {};
  const numericalSize = parseInt(size, 10);
  const containerPresent = showDescription || showLabel;

  return (
    <div
      className={cn(
        'transition-colors group/product-tile',
        { 'flex flex-col p-3 rounded-lg gap-2': containerPresent },
        { 'bg-neutral-1300 dark:bg-neutral-000': selected },
        {
          'bg-neutral-000 dark:bg-neutral-1300': !selected,
        },
        {
          'hover:bg-neutral-100 dark:hover:bg-neutral-1200': selected === false && !unavailable,
        },
        { 'cursor-pointer': selected !== undefined && !unavailable },
        { 'pointer-events-none': unavailable },
        { [`${className}`]: className },
      )}
      aria-hidden={unavailable}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div
        className={cn('items-center', { flex: containerPresent }, { 'inline-flex': !containerPresent })}
        style={{
          gap: containerPresent ? numericalSize / CONTAINER_GAP_RATIO : 0,
        }}
      >
        <ProductIcon
          size={numericalSize}
          name={icon}
          hoverName={animateIcons ? hoverIcon : undefined}
          selected={selected}
          unavailable={!!unavailable}
          className={iconClassName}
        />
        <ProductLabel
          label={label}
          selected={selected}
          unavailable={!!unavailable}
          numericalSize={numericalSize}
          showLabel={showLabel}
          className={labelClassName}
        />
      </div>
      <ProductDescription
        description={description}
        selected={selected}
        unavailable={!!unavailable}
        showDescription={showDescription}
        className={descriptionClassName}
      />
      {selected && link ? (
        <LinkButton
          variant="secondary"
          size="xs"
          className="mt-2 !text-neutral-000 dark:!text-neutral-1300"
          rightIcon="icon-gui-arrow-right-micro"
          iconColor="text-orange-600"
          href={link}
        >
          {currentPage ? 'View docs' : 'Explore'}
        </LinkButton>
      ) : null}
    </div>
  );
};

export default ProductTile;
