import styled from 'styled-components';
import { spacing, mq, colors } from '../../styles';

// Source: Voltaire. See Ably UI if we need shared component.
const NAV_HEIGHT_DESKTOP = 64;
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
    border-bottom: solid 1px ${ colors.containers.one };

    ::after {
        content: "";
        font-size: 12px;
        text-align: bottom;
        display: block;
        position: sticky;
        width: 100%;
        height: 10%;
        bottom: 0;
        background: linear-gradient(0deg, white 0%, rgba(0,0,0,0) 100%);
        touch-action: none;
        pointer-events: none;
    }
`;

export default StickySidebar;