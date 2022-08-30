import React, { FunctionComponent as FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './MenuItemButton.module.css';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  isSelected: boolean;
}

const MenuItemButton: FC<Props> = ({ isSelected, ...props }) => (
  <button
    className={cn(styles.button, {
      [styles.isSelected]: isSelected,
    })}
    {...props}
  />
);

export default MenuItemButton;
