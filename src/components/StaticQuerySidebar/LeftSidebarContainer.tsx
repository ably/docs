import styled from 'styled-components';

export const LeftSidebarContainer = styled.div`
  height: 100vh;
  position: sticky;
  top: 0;
  z-index: 20;
  @media only screen and (max-width: 1040px) {
    display: none;
  }
  background-color: var(--color-extra-light-grey);
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
    }
  }
  > aside > .accordion > ol > li {
    margin-bottom: 20px;
  }
`;
