import styled from 'styled-components';
import { text } from '../../../../styles/colors';

const UnstyledButton = styled.button`
  appearance: none !important;
  background: none;
  outline: none;
  box-shadow: none;
  border: 0;
  border-radius: 0;
`;

const MenuItemButton = styled(UnstyledButton)`
  color: ${text.aux};

  &:focus,
  &:hover {
    color: ${text.linkHoverAlternate};
  }
`;

const SelectedMenuItemButton = styled(MenuItemButton)`
  color: ${text.highlight};
`;

export { SelectedMenuItemButton };

export default MenuItemButton;
