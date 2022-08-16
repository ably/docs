import React from 'react';

export const HamburgerDropdownContainer = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <div className="fixed top-64 max-h-full flex-grow right-0 w-full xs:w-300 bg-white shadow-container" id={id}>
    {children}
  </div>
);
