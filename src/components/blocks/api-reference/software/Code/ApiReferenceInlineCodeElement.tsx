import React from 'react';

export const ApiReferenceInlineCodeElement = ({ children, ...props }: { children: React.ReactNode }) => (
  <code
    {...props}
    className="font-mono p-2 text-code text-charcoal-grey font-thin bg-light-grey border border-mid-grey rounded-md"
  >
    {children}
  </code>
);
