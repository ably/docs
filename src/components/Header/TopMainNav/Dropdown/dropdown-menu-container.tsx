import React from 'react';

export const DropdownMenuContainer = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <div
    className="fixed top-64 h-256 left-1/4 w-3/4 bg-white flex flex-col"
    style={{ boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}
    id={id}
  >
    {children}
  </div>
);
