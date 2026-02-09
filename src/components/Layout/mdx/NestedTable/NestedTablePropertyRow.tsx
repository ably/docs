import React, { useMemo } from 'react';
import cn from '@ably/ui/core/utils/cn';
import { TableData, TableProperty, useNestedTable } from './NestedTableContext';
import { NestedTableExpandButton } from './NestedTableExpandButton';

interface NestedTablePropertyRowProps {
  property: TableProperty;
  path: string;
  depth?: number;
}

export const NestedTablePropertyRow: React.FC<NestedTablePropertyRowProps> = ({ property, path, depth = 0 }) => {
  const { lookup, isExpanded, toggleExpanded, registryVersion } = useNestedTable();
  const expandPath = `${path}.${property.name}`;

  // Look up all referenced tables, re-computing when registry changes
  const referencedTables = useMemo(
    () =>
      property.typeReferences
        .map((ref) => ({ id: ref, table: lookup(ref) }))
        .filter((entry): entry is { id: string; table: TableData } => entry.table !== undefined),
    [property.typeReferences, lookup, registryVersion],
  );

  return (
    <div>
      <div className="py-4">
        {/* Header row: name, badge, and type */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Property name in monospace box - always orange */}
          <code className="bg-orange-100 dark:bg-orange-1000 border border-orange-300 dark:border-orange-900 px-2 py-0.5 rounded text-sm font-mono text-neutral-1000 dark:text-neutral-300">
            {property.name}
          </code>

          {/* Required/Optional badge - only shown for 4-column tables */}
          {property.required && (
            <span
              className={cn(
                'text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-1200',
                property.required === 'required' ? 'text-orange-600' : 'text-neutral-900 dark:text-neutral-400',
              )}
            >
              {property.required}
            </span>
          )}

          {/* Type name - use typeDisplay for cleaned-up rendering, fall back to raw type */}
          {(property.typeReferences.length > 0 || property.type) && (
            <span className="text-sm text-neutral-600 font-semibold dark:text-neutral-500">
              {property.typeDisplay ?? property.type}
            </span>
          )}
        </div>

        {/* Description - using div to support block-level elements like lists */}
        <div className="text-sm text-neutral-900 dark:text-neutral-400 ui-text-p2 mt-2 leading-relaxed">
          {property.description}
        </div>

        {/* Expand/collapse buttons and nested content - one per resolved table reference */}
        {referencedTables.map(({ id, table }) => {
          const refExpandPath = `${expandPath}.${id}`;
          const refExpanded = isExpanded(refExpandPath);

          return (
            <React.Fragment key={id}>
              {/* Collapsed: standalone button */}
              {!refExpanded && (
                <NestedTableExpandButton typeName={id} expanded={false} onClick={() => toggleExpanded(refExpandPath)} />
              )}

              {/* Expanded: button attached to nested container */}
              {refExpanded && (
                <div className="mt-3 border border-neutral-400 dark:border-neutral-900 rounded-lg overflow-hidden">
                  {/* Make the button the header of the container */}
                  <NestedTableExpandButton
                    typeName={id}
                    expanded={true}
                    onClick={() => toggleExpanded(refExpandPath)}
                  />
                  {/* Nested properties */}
                  <div className="divide-y divide-neutral-400 dark:divide-neutral-900">
                    {table.properties.map((nestedProperty) => (
                      <div key={nestedProperty.name} className="px-3 sm:px-5">
                        <NestedTablePropertyRow property={nestedProperty} path={refExpandPath} depth={depth + 1} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
