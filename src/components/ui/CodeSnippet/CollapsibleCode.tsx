import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import cn from 'src/utilities/cn';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

/**
 * Number of lines shown before a code block collapses behind a "Show more" toggle.
 */
export const DEFAULT_COLLAPSED_LINE_COUNT = 15;

type CollapsibleCodeProps = {
  /**
   * The rendered code block to collapse.
   */
  children: React.ReactNode;
  /**
   * Number of lines in the active snippet. Used to decide whether to collapse and to
   * compute the collapsed height.
   */
  lineCount: number;
  /**
   * Number of lines to show before collapsing. Defaults to {@link DEFAULT_COLLAPSED_LINE_COUNT}.
   */
  maxLines?: number;
};

/**
 * Clips a rendered code block to `maxLines` with a fade-out and a "Show more" toggle when the
 * snippet is longer. Snippets at or under the limit render untouched.
 */
const CollapsibleCode: React.FC<CollapsibleCodeProps> = ({
  children,
  lineCount,
  maxLines = DEFAULT_COLLAPSED_LINE_COUNT,
}) => {
  const collapsible = lineCount > maxLines;
  const contentRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [collapsedHeight, setCollapsedHeight] = useState<number>();

  const measure = useCallback(() => {
    const element = contentRef.current;
    if (!element || !collapsible || lineCount === 0) {
      return;
    }

    // scrollHeight reflects the full content height regardless of the maxHeight clip.
    const fullHeight = element.scrollHeight;
    const inner = element.firstElementChild ?? element;
    const styles = window.getComputedStyle(inner);
    const paddingTop = parseFloat(styles.paddingTop) || 0;
    const paddingBottom = parseFloat(styles.paddingBottom) || 0;
    const perLine = (fullHeight - paddingTop - paddingBottom) / lineCount;

    setCollapsedHeight(Math.round(paddingTop + perLine * maxLines));
  }, [collapsible, lineCount, maxLines]);

  useLayoutEffect(() => {
    measure();
  }, [measure, children]);

  // Re-measure when the block resizes (responsive wrapping, font loading).
  useEffect(() => {
    const element = contentRef.current;
    if (!element || !collapsible || typeof ResizeObserver === 'undefined') {
      return;
    }

    const observer = new ResizeObserver(() => measure());
    observer.observe(element);

    return () => observer.disconnect();
  }, [collapsible, measure]);

  if (!collapsible) {
    return <>{children}</>;
  }

  // A compact centered pill rather than a full-width bordered bar, so it never reads as a
  // second footer row when another band (e.g. the API key selector) sits directly below.
  const toggle = (
    <button
      type="button"
      onClick={() => setExpanded((value) => !value)}
      aria-expanded={expanded}
      className={cn(
        'pointer-events-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold shadow-sm transition-colors',
        'border border-neutral-300 dark:border-neutral-1000',
        'bg-neutral-000 dark:bg-neutral-1300 text-neutral-800 dark:text-neutral-400',
        'hover:bg-neutral-100 dark:hover:bg-neutral-1100 focus-base',
      )}
    >
      <span>{expanded ? 'Show less' : 'Show more'}</span>
      <ChevronDownIcon className={cn('size-[12px] transition-transform', expanded && 'rotate-180')} aria-hidden />
    </button>
  );

  return (
    <>
      <div
        ref={contentRef}
        className={cn('relative', !expanded && 'overflow-hidden')}
        style={!expanded && collapsedHeight ? { maxHeight: collapsedHeight } : undefined}
      >
        {children}
        {!expanded && (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-neutral-000 dark:from-neutral-1300 to-transparent"
            />
            {/* Float the pill over the fade so it doesn't add a bordered band of its own. */}
            <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">{toggle}</div>
          </>
        )}
      </div>
      {expanded && (
        // Seamless extension of the code block (same background, no border) so the pill sits
        // below the content without introducing a divider that competes with rows beneath it.
        // The pill sits in its own band (no negative margin) so it never overlaps the code
        // content above, which would otherwise paint over — and clip — the pill's top edge.
        <div className="flex justify-center bg-neutral-000 pt-1 pb-4 dark:bg-neutral-1300">{toggle}</div>
      )}
    </>
  );
};

export default CollapsibleCode;
