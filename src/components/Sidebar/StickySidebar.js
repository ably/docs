import styled from 'styled-components';
import { spacing, mq } from '../../styles';
import {
  DISTANCE_FROM_TOP_DESKTOP,
  DISTANCE_FROM_TOP_WITH_LANGUAGE_MENU_DESKTOP,
  NAV_HEIGHT_DESKTOP,
} from '../../utilities/layout/sticky-positioning-constants';

const StickySidebar = styled.aside`
  transition: transform 0.3s;
  position: sticky;
  z-index: 1;
  display: none;
  // the 96px here is just to leave some breathing room at the bottom of the page
  height: calc((100vh - 96px) - ${NAV_HEIGHT_DESKTOP + DISTANCE_FROM_TOP_DESKTOP}px);
  overflow-y: auto;
  max-width: ${spacing.page.rightCol};
  top: ${({ 'data-languages': languages }) =>
    NAV_HEIGHT_DESKTOP + (languages ? DISTANCE_FROM_TOP_WITH_LANGUAGE_MENU_DESKTOP : DISTANCE_FROM_TOP_DESKTOP)}px;

  ${mq.minWidth.medium} {
    display: block;
  }
`;

export default StickySidebar;
