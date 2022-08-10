import React from 'react';

// Utility purely for ensuring it's easy to cluster horizontal menu items together in a consistent way.
export const HorizontalMenuItemGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-row">{children}</div>
);
