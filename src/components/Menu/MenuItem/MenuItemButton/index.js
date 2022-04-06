import styled from 'styled-components';
import { primary, text } from '../../../../styles/colors';

const UnstyledButton = styled.button`
  appearance: none !important;
  background: none;
  outline: none;
  box-shadow: none;
  border: 0;
  border-radius: 0;
`;

const MenuItemButton = styled(UnstyledButton)`
  color: ${primary.black};

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
