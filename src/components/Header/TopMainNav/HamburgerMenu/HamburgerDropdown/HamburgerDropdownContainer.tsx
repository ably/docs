import React from 'react';
import styled from 'styled-components';

const HamburgerDropdownContainerNonTailwindStyles = styled.div`
  max-height: calc(100% - 64px);
`;

export const HamburgerDropdownContainer = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <HamburgerDropdownContainerNonTailwindStyles
    className="fixed top-64 w-full max-w-full flex-grow right-0 xs:w-420 bg-white shadow-container overflow-y-scroll overscroll-contain box-border"
    id={id}
  >
    {children}
  </HamburgerDropdownContainerNonTailwindStyles>
);
