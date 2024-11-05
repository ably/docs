import React from 'react';

/* Tailwind 'text-sm' and 'tracking-widest' classes do not apply */
export const dropdownTitleStyles = { fontSize: '0.875rem', lineHeight: '1.25rem', letterSpacing: '0.1em' };

export const Title = ({ children }: { children: React.ReactNode }) => (
  <h4 className="ui-text-h4 uppercase pt-32 px-32" style={dropdownTitleStyles}>
    {children}
  </h4>
);
