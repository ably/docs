import React from 'react';

// Table components with responsive styling
const Table = (props: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="overflow-x-auto mb-8">
    <table className="min-w-full border-collapse" {...props} />
  </div>
);

const TableHead = (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className="bg-gray-50 border-b" {...props} />
);

const TableBody = (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className="divide-y divide-gray-200" {...props} />
);

const TableRow = (props: React.HTMLAttributes<HTMLTableRowElement>) => <tr className="hover:bg-gray-50" {...props} />;

const TableHeader = (props: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
  <th
    className="px-8 py-8 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
    {...props}
  />
);

const TableCell = (props: React.TdHTMLAttributes<HTMLTableDataCellElement>) => (
  <td className="px-6 py-4 text-sm" {...props} />
);

export { Table, TableHead, TableBody, TableRow, TableHeader, TableCell };
