import React, { useEffect, useMemo } from 'react';
import cn from '@ably/ui/core/utils/cn';
import { TableData, useNestedTable } from './NestedTableContext';
import { parseTableChildren } from './parseTable';
import { NestedTablePropertyRow } from './NestedTablePropertyRow';
import { Table as BaseTable } from '../Table';

interface NestedTableProps {
  id?: string;
  hidden?: boolean;
  children: React.ReactNode;
  className?: string;
}

// The component that uses the nested table context
const NestedTableWithContext: React.FC<NestedTableProps> = ({ id, hidden = false, children, className }) => {
  const { register, unregister } = useNestedTable();

  // Parse the table children to extract properties
  const parsedProperties = useMemo(() => {
    if (!id) {
      return [];
    }
    return parseTableChildren(children);
  }, [id, children]);

  // Register this table in the context
  useEffect(() => {
    if (id && parsedProperties.length > 0) {
      const tableData: TableData = {
        id,
        properties: parsedProperties,
      };
      register(id, tableData);
    }
    // Cleanup: unregister when component unmounts
    return () => {
      if (id) {
        unregister(id);
      }
    };
  }, [id, parsedProperties, register, unregister]);

  // If no id, render as standard table
  if (!id) {
    return <BaseTable className={className}>{children}</BaseTable>;
  }

  // If hidden, don't render anything (table is just registered)
  if (hidden) {
    return null;
  }

  // If no properties parsed, fall back to standard table
  if (parsedProperties.length === 0) {
    console.warn(`[NestedTable] No properties parsed for ${id}, falling back to standard table`);
    return <BaseTable className={className}>{children}</BaseTable>;
  }

  // Render as nested property table
  return (
    <div className={cn('my-6', className)}>
      <div className="border border-neutral-400 dark:border-neutral-900 rounded-lg overflow-hidden">
        <div className="divide-y divide-neutral-400 dark:divide-neutral-900">
          {parsedProperties.map((property) => (
            <div key={property.name} className="px-3 sm:px-5">
              <NestedTablePropertyRow property={property} path={id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main NestedTable component
export const NestedTable: React.FC<NestedTableProps> = (props) => {
  // If no id provided, just render as standard table
  if (!props.id) {
    return <BaseTable className={props.className}>{props.children}</BaseTable>;
  }

  return <NestedTableWithContext {...props} />;
};

NestedTable.displayName = 'NestedTable';

// Compound component: NestedTable as base with BaseTable sub-components for backwards compatibility
export const Table = Object.assign(NestedTable, {
  Root: BaseTable.Root,
  Header: BaseTable.Header,
  Body: BaseTable.Body,
  Row: BaseTable.Row,
  Head: BaseTable.Head,
  Cell: BaseTable.Cell,
  Caption: BaseTable.Caption,
});

export default Table;
