import React, { FunctionComponent as FC} from 'react'
import '../../styles.css';

const MenuItemButton:FC = ({ children, ...props }) => (
  <button className="docs-menu-item-button" {...props}>
    {children}
  </button>
);

const SelectedMenuItemButton:FC = ({ children, ...props }) => (
  <button className="docs-menu-item-button-selected" {...props}>
    {children}
  </button>
);

export { SelectedMenuItemButton };

export default MenuItemButton;
