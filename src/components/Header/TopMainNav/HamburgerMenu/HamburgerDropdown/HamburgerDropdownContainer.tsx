import React from 'react';

export const HamburgerDropdownContainer = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <div
    className="fixed top-64 max-h-full w-full max-w-full flex-grow right-0 xs:w-420 bg-white shadow-container"
    id={id}
  >
    {children}
  </div>
);
