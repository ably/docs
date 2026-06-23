import React from 'react';
import { ButtonPropsBase, commonButtonInterior, commonButtonProps } from './Button';
import cn from 'src/utilities/cn';
import { ColorClass, ColorThemeSet } from './colors';

export type LinkButtonProps = ButtonPropsBase & {
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  iconColor?: ColorClass | ColorThemeSet;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const LinkButton: React.FC<LinkButtonProps> = ({
  variant = 'primary',
  size,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  onClick,
  iconColor,
  ...rest
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.repeat) {
      return;
    }
    // Space: prevent page scroll on keydown; activate on keyup.
    if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      return;
    }
    // Enter activates on keydown.
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!disabled) {
        e.currentTarget.click();
      }
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      if (!disabled) {
        e.currentTarget.click();
      }
    }
  };

  return (
    <a
      {...commonButtonProps({
        variant,
        size,
        leftIcon,
        rightIcon,
        className: cn(className, {
          'ui-button-disabled dark:ui-button-disabled-dark': disabled,
        }),
      })}
      role="button"
      aria-disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      tabIndex={0}
      {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
    >
      {commonButtonInterior({ leftIcon, rightIcon, iconColor, children })}
    </a>
  );
};

export default LinkButton;
