import React from 'react';

export const Title = ({ children }: { children: React.ReactNode }) => (
  <h4
    className="uppercase pt-32 px-32 font-medium"
    /* Tailwind 'text-sm' and 'tracking-widest' classes do not apply */
    style={{ fontSize: '0.875rem', lineHeight: '1.25rem', letterSpacing: '0.1em' }}
  >
    {children}
  </h4>
);
