import React, { FunctionComponent as FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import { button, isActive } from './MenuItemButton.module.css';

type Props = {
  isSelected?: boolean;
} & HTMLAttributes<HTMLButtonElement>;

const MenuItemButton: FC<Props> = ({ isSelected = false, ...props }) => (
  <button
    className={cn(button, {
      [isActive]: isSelected,
    })}
    {...props}
  />
);

export default MenuItemButton;
