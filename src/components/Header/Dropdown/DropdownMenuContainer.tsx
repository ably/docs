import React from 'react';

export const DropdownMenuContainer = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <div className="max-h-512 w-3/4 flex flex-col" id={id}>
    {children}
  </div>
);
