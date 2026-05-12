import type { PropsWithChildren } from 'react';

// PoC stub.
const MethodSignature = ({ children }: PropsWithChildren) => (
  <div className="my-2 font-mono text-sm px-4 py-2 bg-neutral-50 border-l-4 border-neutral-400 rounded-r-md">
    {children}
  </div>
);

export default MethodSignature;
