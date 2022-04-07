import React from 'react';
import { ChildPropTypes } from '../../../../react-utilities';
import '../../styles.css';

const MenuItemButton = ({ children, ...props }) => (
  <button className="docs-menu-item-button" {...props}>
    {children}
  </button>
);

const SelectedMenuItemButton = ({ children, ...props }) => (
  <button className="docs-menu-item-button-selected" {...props}>
    {children}
  </button>
);

MenuItemButton.propTypes = {
  children: ChildPropTypes,
};

SelectedMenuItemButton.propTypes = {
  children: ChildPropTypes,
};

export { SelectedMenuItemButton };

export default MenuItemButton;
