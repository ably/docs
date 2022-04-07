import React from 'react';
import styled from 'styled-components';
import { ChildPropTypes } from '../../../../react-utilities';
import { text } from '../../../../styles/colors';
import '../../styles.css';

const MenuItemButton = ({ children }) => <button className="docs-menu-item-button">{children}</button>;

// Replace this with tailwind alternative
const SelectedMenuItemButton = styled(MenuItemButton)`
  color: ${text.highlight};
`;

MenuItemButton.propTypes = {
  children: ChildPropTypes,
};

export { SelectedMenuItemButton };

export default MenuItemButton;
