import React from 'react';
import cn from '@ably/ui/core/utils/cn';

interface MethodSignatureProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A component for displaying method signatures prominently in API reference docs.
 * Uses orange styling consistent with NestedTable property names.
 * Features an L-shaped connector line linking to the parent header.
 *
 * Note: Must be placed immediately after an h2/h3 heading with standard margins.
 * The connector line positioning assumes this layout relationship.
 *
 * Usage in MDX:
 * <MethodSignature>rooms.get(name, options)</MethodSignature>
 *
 * For signatures containing special characters like < > { }, use a template literal:
 * <MethodSignature>{`rooms.get<RoomOptions>(name, options)`}</MethodSignature>
 */
export const MethodSignature: React.FC<MethodSignatureProps> = ({ children, className }) => {
  return (
    <div className="relative pl-3 my-4">
      {/* L-shaped connector line */}
      <div className="absolute left-0 -top-8 h-[calc(50%+2rem)] w-3 border-l border-b border-orange-300 dark:border-orange-900 rounded-bl-md" />
      <code
        className={cn(
          'bg-orange-100 dark:bg-orange-1000 border border-orange-300 dark:border-orange-900 px-3 py-1.5 rounded text-sm font-mono text-neutral-1000 dark:text-neutral-300 inline-block',
          className,
        )}
      >
        {children}
      </code>
    </div>
  );
};
