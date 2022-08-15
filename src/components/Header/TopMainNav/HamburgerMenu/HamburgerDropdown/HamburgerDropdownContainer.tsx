import React from 'react';

export const HamburgerDropdownContainer = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <div className="fixed top-64 max-h-full h-256 left-0 w-full bg-white shadow-container" id={id}>
    {children}
  </div>
);
