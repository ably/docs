import React from 'react';
import cn from '@ably/ui/core/utils/cn';

// Table Root Component
interface TableRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const TableRoot: React.FC<TableRootProps> = ({ children, className, ...props }) => {
  return (
    <div className={cn('overflow-x-auto my-4 rounded-lg overflow-hidden', className)} {...props}>
      <table className="w-full border-separate border-spacing-0 text-left text-sm">{children}</table>
    </div>
  );
};

// Table Header Component
interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

const TableHeader: React.FC<TableHeaderProps> = ({ children, className, ...props }) => {
  return (
    <thead className={cn('bg-neutral-100 dark:bg-neutral-1200', className)} {...props}>
      {children}
    </thead>
  );
};

// Table Body Component
interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

const TableBody: React.FC<TableBodyProps> = ({ children, className, ...props }) => {
  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  );
};

// Table Row Component
interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
}

const TableRow: React.FC<TableRowProps> = ({ children, className, ...props }) => {
  return (
    <tr className={cn('first:border-t', className)} {...props}>
      {children}
    </tr>
  );
};

// Table Head Cell Component
interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

const TableHead: React.FC<TableHeadProps> = ({ children, className, ...props }) => {
  return (
    <th
      className={cn(
        'px-4 py-3 text-left font-bold text-neutral-1000 dark:text-neutral-300',
        'first:rounded-tl-lg last:rounded-tr-lg',
        'border-t first:border-l last:border-r border-b border-neutral-300 dark:border-neutral-1000',
        className,
      )}
      {...props}
    >
      {children}
    </th>
  );
};

// Table Cell Component
interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

const TableCell: React.FC<TableCellProps> = ({ children, className, ...props }) => {
  return (
    <td
      className={cn(
        'px-4 py-3 font-medium text-neutral-1000 dark:text-neutral-300',
        'first:border-l last:border-r border-b border-neutral-300 dark:border-neutral-1000',
        '[table>tbody:first-child_tr:first-child_&]:border-t',
        '[table>tbody:first-child_tr:first-child_&]:first:rounded-tl-lg [table>tbody:first-child_tr:first-child_&]:last:rounded-tr-lg',
        '[tr:last-child_&]:first:rounded-bl-lg [tr:last-child_&]:last:rounded-br-lg',
        className,
      )}
      {...props}
    >
      {children}
    </td>
  );
};

// Table Caption Component (optional)
interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {
  children: React.ReactNode;
}

const TableCaption: React.FC<TableCaptionProps> = ({ children, className, ...props }) => {
  return (
    <caption className={cn('mt-2 text-sm text-neutral-600 dark:text-neutral-700', className)} {...props}>
      {children}
    </caption>
  );
};

// Compound component pattern
export const Table = Object.assign(TableRoot, {
  Root: TableRoot,
  Header: TableHeader,
  Body: TableBody,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
  Caption: TableCaption,
});

export default Table;
