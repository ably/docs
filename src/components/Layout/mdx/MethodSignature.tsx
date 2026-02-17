import React, { useRef, useLayoutEffect, useState } from 'react';
import cn from '@ably/ui/core/utils/cn';

interface MethodSignatureProps {
  children: React.ReactNode;
  className?: string;
}

const headingOffsets: Record<string, { top: string; height: string }> = {
  h2: { top: '-2rem', height: 'calc(50% + 2rem)' },
  h3: { top: '-1.25rem', height: 'calc(50% + 1.25rem)' },
  h4: { top: '-1rem', height: 'calc(50% + 1rem)' },
  h5: { top: '-0.75rem', height: 'calc(50% + 0.75rem)' },
};

/**
 * A component for displaying method signatures prominently in API reference docs.
 * Uses orange styling consistent with NestedTable property names.
 * Features an L-shaped connector line linking to the parent header.
 *
 * The connector line automatically adjusts based on the preceding heading level.
 *
 * Usage in MDX:
 * <MethodSignature>rooms.get(name, options)</MethodSignature>
 *
 * For signatures containing special characters like < > { }, use a template literal:
 * <MethodSignature>{`rooms.get<RoomOptions>(name, options)`}</MethodSignature>
 */
export const MethodSignature: React.FC<MethodSignatureProps> = ({ children, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(headingOffsets.h2);

  useLayoutEffect(() => {
    if (containerRef.current) {
      const prev = containerRef.current.previousElementSibling;
      if (prev) {
        const tag = prev.tagName.toLowerCase();
        if (tag in headingOffsets) {
          setOffset(headingOffsets[tag]);
        } else {
          setOffset({ top: '-0.5rem', height: 'calc(50% + 0.5rem)' });
        }
      }
    }
  }, []);

  return (
    <div ref={containerRef} className="relative pl-3 my-4">
      {/* L-shaped connector line */}
      <div
        className="absolute left-0 w-3 border-l border-b border-orange-300 dark:border-orange-900 rounded-bl-md"
        style={{ top: offset.top, height: offset.height }}
      />
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
