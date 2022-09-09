import styled from 'styled-components';
import { spacing, mq, colors } from '../../styles';
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
  // the 70px here is just to leave some breathing room at the bottom of the page
  height: calc((100vh - 70px) - ${NAV_HEIGHT_DESKTOP + DISTANCE_FROM_TOP_DESKTOP}px);
  overflow-y: auto;
  max-width: ${spacing.page.rightCol};
  top: ${({ 'data-languages': languages }) =>
    NAV_HEIGHT_DESKTOP + (languages ? DISTANCE_FROM_TOP_WITH_LANGUAGE_MENU_DESKTOP : DISTANCE_FROM_TOP_DESKTOP)}px;

  ${mq.minWidth.medium} {
    display: block;
  }
  border-bottom: solid 1px ${colors.containers.one};

  ::after {
    content: '';
    font-size: 12px;
    text-align: bottom;
    display: block;
    position: sticky;
    width: 100%;
    height: 10%;
    bottom: 0;
    background: linear-gradient(0deg, white 0%, rgba(255, 255, 255, 0) 100%);
    touch-action: none;
    pointer-events: none;
  }
`;

export default StickySidebar;
