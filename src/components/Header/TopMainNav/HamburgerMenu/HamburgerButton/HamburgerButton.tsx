import React, { useState } from 'react';
import { HamburgerIcon } from './HamburgerIcon';

export const HamburgerButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      <HamburgerIcon isOpen={isOpen} />
    </button>
  );
};
