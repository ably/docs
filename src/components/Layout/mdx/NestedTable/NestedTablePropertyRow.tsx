import React, { useMemo } from 'react';
import cn from '@ably/ui/core/utils/cn';
import { TableProperty, useNestedTable } from './NestedTableContext';
import { NestedTableExpandButton } from './NestedTableExpandButton';

interface NestedTablePropertyRowProps {
  property: TableProperty;
  path: string;
  depth?: number;
}

export const NestedTablePropertyRow: React.FC<NestedTablePropertyRowProps> = ({ property, path, depth = 0 }) => {
  const { lookup, isExpanded, toggleExpanded, registryVersion } = useNestedTable();
  const expandPath = `${path}.${property.name}`;
  const expanded = isExpanded(expandPath);

  // Look up the referenced table, re-computing when registry changes
  const referencedTable = useMemo(
    () => (property.typeReference ? lookup(property.typeReference) : undefined),
    [property.typeReference, lookup, registryVersion],
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

          {/* Type name - only shown for 3 or 4-column tables. Use typeReference if available for cleaner display. */}
          {(property.typeReference || property.type) && (
            <span className="text-sm text-neutral-600 font-semibold dark:text-neutral-500">
              {property.typeReference ?? property.type}
            </span>
          )}
        </div>

        {/* Description - using div to support block-level elements like lists */}
        <div className="text-sm text-neutral-900 dark:text-neutral-400 ui-text-p2 mt-2 leading-relaxed">
          {property.description}
        </div>

        {/* Expand/collapse button and nested content */}
        {referencedTable && property.typeReference && (
          <>
            {/* Collapsed: standalone button */}
            {!expanded && (
              <NestedTableExpandButton
                typeName={property.typeReference}
                expanded={false}
                onClick={() => toggleExpanded(expandPath)}
              />
            )}

            {/* Expanded: button attached to nested container */}
            {expanded && (
              <div className="mt-3 border border-neutral-400 dark:border-neutral-900 rounded-lg overflow-hidden">
                {/* Hide button as header of the container */}
                <NestedTableExpandButton
                  typeName={property.typeReference}
                  expanded={true}
                  onClick={() => toggleExpanded(expandPath)}
                />
                {/* Nested properties */}
                <div className="divide-y divide-neutral-400 dark:divide-neutral-900">
                  {referencedTable.properties.map((nestedProperty) => (
                    <div key={nestedProperty.name} className="px-3 sm:px-5">
                      <NestedTablePropertyRow property={nestedProperty} path={expandPath} depth={depth + 1} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
