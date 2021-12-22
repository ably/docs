import styled from 'styled-components';
import { spacing, mq } from '../../styles';

// Source: Voltaire. See Ably UI if we need shared component.
const NAV_HEIGHT_DESKTOP = 56;
const DISTANCE_FROM_TOP_DESKTOP = spacing.medium.value;

const StickySidebar = styled.aside`
    transition: transform 0.3s;
    position: sticky;
    z-index: 1;
    display: none;
    // the 70px here is just to leave some breathing room at the bottom of the page
    height: calc((100vh - 70px) - ${NAV_HEIGHT_DESKTOP + DISTANCE_FROM_TOP_DESKTOP}px);
    overflow-y: auto;
    max-width: ${spacing.page.rightCol};
    top: ${NAV_HEIGHT_DESKTOP + DISTANCE_FROM_TOP_DESKTOP}px;

    ${mq.minWidth.medium} {
        display: block;
    }
`;

export default StickySidebar;