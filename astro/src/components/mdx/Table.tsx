import type { HTMLAttributes } from 'react';

// PoC stub — the real NestedTable lives at src/components/Layout/mdx/NestedTable.tsx.
const Table = (props: HTMLAttributes<HTMLTableElement>) => (
  <div className="my-4 overflow-x-auto">
    <table {...props} className={`border-collapse w-full ${props.className ?? ''}`.trim()} />
  </div>
);

export default Table;
