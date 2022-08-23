import styled from 'styled-components';

export const LeftSidebarContainer = styled.div`
  > aside > .accordion > ol > li {
    > .accordion__item {
      > .accordion__heading {
        span {
          text-transform: uppercase;
          font-weight: 500;
          letter-spacing: 0.1em;
          height: 40px;
        }
        svg {
          visibility: hidden;
        }
      }
      > .accordion__panel > .accordion > ol > li {
        span {
          padding-left: 0;
        }
      }
    }
  }
`;
