import React from 'react';

// Table components with responsive styling
const Table = (props: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="overflow-x-auto mb-8">
    <table className="border-0 border-collapse mb-4 border-spacing-0 ui-text-p2 text-left" {...props} />
  </div>
);

const TableHead = (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className="bg-gray-50 border-b" {...props} />
);

const TableBody = (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className="border-b divide-neutral-300" {...props} />
);

const TableRow = (props: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className="hover:bg-gray-50 border-b divide-neutral-300" {...props} />
);

const TableHeader = (props: React.HTMLAttributes<HTMLTableCellElement>) => (
  <th
    className="px-12 py-8 text-left ui-text-p1 font-bold text-neutral-1100 tracking-wider whitespace-nowrap"
    {...props}
  />
);

const TableCell = (props: React.HTMLAttributes<HTMLTableCellElement>) => (
  <td className="px-12 py-16 align-text-top text-sm" {...props} />
);

export { Table, TableHead, TableBody, TableRow, TableHeader, TableCell };
