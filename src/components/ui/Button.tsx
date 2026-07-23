import React, { PropsWithChildren, ReactNode } from 'react';
import cn from 'src/utilities/cn';
import { ColorClass, ColorThemeSet } from './colors';
import IconSlot from './IconSlot';

export type ButtonType = 'priority' | 'primary' | 'secondary';

type ButtonSize = 'lg' | 'md' | 'sm' | 'xs';

export type ButtonPropsBase = {
  /**
   * The type of button: priority, primary, or secondary.
   */
  variant?: ButtonType;
  /**
   * The button size: lg, sm, or xs. Leave empty for md.
   */
  size?: ButtonSize;
  /**
   * An icon element to render on the left side of the button label. Pass a Heroicon
   * (e.g. `<PlusIcon />`) or an Ably glyph (`<Icon name="icon-tech-…" />`) unsized — the
   * button sizes it.
   */
  leftIcon?: ReactNode;
  /**
   * An icon element to render on the right side of the button label. See `leftIcon`.
   */
  rightIcon?: ReactNode;
  /**
   * Optional classes to add to the button element.
   */
  className?: string;
  /**
   * Optional color to apply to the icon on either left and/or right side of the button.
   */
  iconColor?: ColorClass | ColorThemeSet;
};

type ButtonProps = ButtonPropsBase & React.ButtonHTMLAttributes<HTMLButtonElement>;

// got to go the long way round because of ol' mate Taily Waily
const buttonClasses: Record<ButtonType, Record<ButtonSize, string>> = {
  priority: {
    lg: 'ui-button-priority-lg',
    md: 'ui-button-priority',
    sm: 'ui-button-priority-sm',
    xs: 'ui-button-priority-xs',
  },
  primary: {
    lg: 'ui-button-primary-lg',
    md: 'ui-button-primary',
    sm: 'ui-button-primary-sm',
    xs: 'ui-button-primary-xs',
  },
  secondary: {
    lg: 'ui-button-secondary-lg',
    md: 'ui-button-secondary',
    sm: 'ui-button-secondary-sm',
    xs: 'ui-button-secondary-xs',
  },
};

export const iconModifierClasses: Record<ButtonSize, { left: string; right: string }> = {
  lg: { left: 'ui-button-lg-left-icon', right: 'ui-button-lg-right-icon' },
  md: { left: 'ui-button-left-icon', right: 'ui-button-right-icon' },
  sm: { left: 'ui-button-sm-left-icon', right: 'ui-button-sm-right-icon' },
  xs: { left: '', right: '' },
};

export const commonButtonProps = (props: ButtonPropsBase) => {
  const { variant = 'primary', size, leftIcon, rightIcon, className } = props;

  return {
    className: cn(
      buttonClasses[variant][size ?? 'md'],
      { [iconModifierClasses[size ?? 'md'].left]: leftIcon },
      { [iconModifierClasses[size ?? 'md'].right]: rightIcon },
      className,
    ),
  };
};

// Per-size icon dimensions, matching the `[&>svg]:!w-6/5/4` rules the button base classes
// applied to a direct <svg> child (buttons.css) — reapplied via IconSlot since the icon is
// now wrapped in a <span>.
const iconSizeByButtonSize: Record<ButtonSize, string> = {
  lg: '1.5rem',
  md: '1.5rem',
  sm: '1.25rem',
  xs: '1rem',
};

export const commonButtonInterior = (props: PropsWithChildren<ButtonPropsBase>) => {
  const { leftIcon, rightIcon, iconColor, size = 'md', children } = props;
  const iconSize = iconSizeByButtonSize[size];
  return (
    <>
      {leftIcon ? <IconSlot icon={leftIcon} size={iconSize} colorClass={iconColor} /> : null}
      {children}
      {rightIcon ? <IconSlot icon={rightIcon} size={iconSize} colorClass={iconColor} /> : null}
    </>
  );
};

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  variant = 'primary',
  size,
  leftIcon,
  rightIcon,
  children,
  className,
  iconColor,
  ...rest
}) => {
  return (
    <button
      {...commonButtonProps({ variant, size, leftIcon, rightIcon, className })}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {commonButtonInterior({ leftIcon, rightIcon, iconColor, size, children })}
    </button>
  );
};

export default Button;
