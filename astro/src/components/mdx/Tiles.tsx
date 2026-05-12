import type { PropsWithChildren } from 'react';

// PoC stub. The real component lives at src/components/Layout/mdx/tiles.tsx.
const Tiles = ({ children }: PropsWithChildren) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">{children}</div>
);

export default Tiles;
