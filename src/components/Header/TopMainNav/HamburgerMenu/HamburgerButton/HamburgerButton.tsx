import React from 'react';
import { HamburgerIcon } from './HamburgerIcon';

export const HamburgerButton = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <button onClick={() => setIsOpen(!isOpen)}>
    <HamburgerIcon isOpen={isOpen} />
  </button>
);
