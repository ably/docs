import React from 'react';

export const DropdownMenuContainer = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <div className="max-h-512 left-1/4 w-3/4 bg-white flex flex-col shadow-container-avoid-left" id={id}>
    {children}
  </div>
);
