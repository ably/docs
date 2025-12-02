import { useEffect, useRef, useState, useCallback } from 'react';
import { useLocation } from '@reach/router';
import cn from '@ably/ui/core/utils/cn';
import { componentMaxHeight, HEADER_HEIGHT, HEADER_BOTTOM_MARGIN } from '@ably/ui/core/utils/heights';
import { INKEEP_ASK_BUTTON_HEIGHT } from './utils/heights';

type SidebarHeader = {
  id: string;
  type: string;
  label: string;
  stepNumber?: string;
};

const getHeaderId = (element: Element) =>
  element.querySelector('a')?.getAttribute('id') ?? element.querySelector('a')?.getAttribute('name') ?? element.id;

// Paddings for various indentations of headers, 12px apart
const INDENT_MAP: Record<string, string> = {
  H2: 'pl-4',
  H3: 'pl-7',
  H4: 'pl-10',
  H5: 'pl-[52px]', // there is no pl-13
  H6: 'pl-16',
} as const;

// Paddings for various indentations of stepped headers, 12px apart with a 1rem buffer for the step indicators
const STEPPED_INDENT_MAP: Record<string, string> = {
  H2: 'pl-8',
  H3: 'pl-11',
  H4: 'pl-14',
  H5: 'pl-[68px]', // there is no pl-17
  H6: 'pl-20',
} as const;

// The height of a single line row
const FALLBACK_HEADER_HEIGHT = 28;

const getElementIndent = (type: string, isStepped: boolean) => {
  if (isStepped && STEPPED_INDENT_MAP[type]) {
    return STEPPED_INDENT_MAP[type];
  }

  if (INDENT_MAP[type]) {
    return INDENT_MAP[type];
  }

  return 'pl-0';
};

const RightSidebar = () => {
  const location = useLocation();
  const [headers, setHeaders] = useState<SidebarHeader[]>([]);
  const [activeHeader, setActiveHeader] = useState<Pick<SidebarHeader, 'id'>>({
    id: location.hash ? location.hash.slice(1) : '#',
  });
  const [isStepped, setIsStepped] = useState<boolean>(false);
  const [sidebarDimensions, setSidebarDimensions] = useState<{
    indicatorHeights: number[];
    indicatorPosition: { yOffset: number; height: number };
  }>({
    indicatorHeights: [],
    indicatorPosition: { yOffset: 0, height: 28 },
  });
  const intersectionObserver = useRef<IntersectionObserver | undefined>(undefined);
  const manualSelection = useRef<boolean>(false);

  // Extract headers from article element
  const extractHeaders = useCallback((articleElement: Element): { headers: SidebarHeader[]; hasSteps: boolean } => {
    const headerElements = articleElement.querySelectorAll('h2, h3, h4, h5, h6');
    let hasSteps = false;

    const headers = Array.from(headerElements)
      .filter((element) => element.id && element.textContent)
      .map((header) => {
        const stepNumber = header.querySelector('[data-step]')?.getAttribute('data-step');
        if (stepNumber) {
          hasSteps = true;
        }

        return {
          type: header.tagName,
          label: header.textContent ?? '',
          id: getHeaderId(header),
          stepNumber: stepNumber || undefined,
        };
      });

    return { headers, hasSteps };
  }, []);

  // Callback that fires when header intersects with the viewport
  const handleIntersect = useCallback(
    (
      entries: {
        target: Element;
        isIntersecting: boolean;
        boundingClientRect: DOMRect;
      }[],
    ) => {
      // Skip updates if the header was manually selected
      if (manualSelection.current) {
        return;
      }

      // Get all currently intersecting headers
      const intersectingEntries = entries.filter((entry) => entry.isIntersecting);

      if (intersectingEntries.length > 0) {
        // Find the entry nearest to the top of the viewport
        const topEntry = intersectingEntries.reduce((nearest, current) => {
          return current.boundingClientRect.top < nearest.boundingClientRect.top ? current : nearest;
        }, intersectingEntries[0]);

        if (topEntry.target.id) {
          setActiveHeader({
            id: getHeaderId(topEntry.target),
          });
        }
      }
    },
    [],
  );

  // Setup intersection observer and update headers when page changes
  useEffect(() => {
    const articleElement = document.querySelector('article');
    if (!articleElement) {
      return;
    }

    // Extract and set headers
    const { headers: headerData, hasSteps } = extractHeaders(articleElement);
    setHeaders(headerData);
    setIsStepped(hasSteps);

    // Set the first header as active when page changes
    if (headerData.length > 0) {
      setActiveHeader({ id: headerData[0].id });
    }

    // Create intersection observer
    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      threshold: 0,
      rootMargin: '-64px 0px -80% 0px', // Account for header and focus on top of viewport
    });

    // Observe all headers
    const headerElements = articleElement.querySelectorAll('h2, h3, h4, h5, h6');
    headerElements.forEach((header) => observer.observe(header));

    // Store observer reference for cleanup
    intersectionObserver.current = observer;

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [location.pathname, location.search, extractHeaders, handleIntersect]);

  // Calculate sidebar dimensions after DOM is ready
  useEffect(() => {
    if (headers.length === 0) {
      return;
    }

    const calculateDimensions = () => {
      // Calculate step indicator heights (for stepped mode)
      const indicatorHeights = isStepped
        ? headers.map((header) => {
            const sidebarElement = document.getElementById(`sidebar-${header.id}`);
            const sidebarElementDimensions = sidebarElement?.getBoundingClientRect();
            return sidebarElementDimensions?.height ?? FALLBACK_HEADER_HEIGHT;
          })
        : [];

      // Calculate indicator position (for non-stepped mode)
      const sidebarElement = document.getElementById(`sidebar-${activeHeader?.id}`);
      const sidebarParentElement = sidebarElement?.parentElement;
      const sidebarElementDimensions = sidebarElement?.getBoundingClientRect();

      const indicatorPosition =
        sidebarParentElement && sidebarElementDimensions
          ? {
              yOffset: Math.abs(sidebarParentElement.getBoundingClientRect().top - sidebarElementDimensions.top),
              height: sidebarElementDimensions.height,
            }
          : { yOffset: 0, height: FALLBACK_HEADER_HEIGHT };

      setSidebarDimensions({
        indicatorHeights,
        indicatorPosition,
      });
    };

    calculateDimensions();

    window.addEventListener('resize', calculateDimensions);

    // Watch each individual sidebar item for dimension changes (catches async updates, i.e. font pop-in)
    const resizeObservers: ResizeObserver[] = [];
    headers.forEach((header) => {
      const sidebarElement = document.getElementById(`sidebar-${header.id}`);
      if (sidebarElement) {
        const observer = new ResizeObserver(() => {
          calculateDimensions();
        });
        observer.observe(sidebarElement);
        resizeObservers.push(observer);
      }
    });

    return () => {
      window.removeEventListener('resize', calculateDimensions);
      resizeObservers.forEach((observer) => observer.disconnect());
    };
  }, [headers, isStepped, activeHeader]);

  const { indicatorHeights, indicatorPosition } = sidebarDimensions;

  const steppedHeader = useCallback(
    (header: SidebarHeader, index: number) => (
      <div
        key={[header.id, 'step-indicator', index].join('-')}
        className="flex items-center justify-center"
        style={{
          height: indicatorHeights[index],
        }}
      >
        <div
          className={cn(
            'bg-neutral-000 dark:bg-neutral-1300',
            header.stepNumber ? 'py-0.5' : 'py-1',
            index === 0 && 'pt-[100%] -mt-[75%]',
            index === headers.length - 1 && 'pb-[100%] -mb-[75%]',
          )}
        >
          <div
            className={cn(
              'flex items-center justify-center rounded-full text-[10px] font-semibold transition-colors bg-neutral-300 dark:bg-neutral-1000 text-neutral-1000 dark:text-neutral-300',
              header.id === activeHeader?.id && 'bg-orange-600 text-neutral-000',
              header.stepNumber ? 'size-4' : 'size-2',
            )}
          >
            {header.stepNumber ?? ''}
          </div>
        </div>
      </div>
    ),
    [indicatorHeights, headers.length, activeHeader?.id],
  );

  return (
    <div
      className="absolute md:sticky w-60 my-10 top-[104px]"
      style={{
        height: componentMaxHeight(HEADER_HEIGHT, HEADER_BOTTOM_MARGIN, INKEEP_ASK_BUTTON_HEIGHT),
      }}
    >
      <div className="hidden md:flex flex-col h-full overflow-y-auto">
        {headers.length > 0 ? (
          <>
            <p className="ui-text-label4 font-semibold text-neutral-1300 dark:text-neutral-000 mb-3">On this page</p>
            <div
              className={cn(
                'flex shadow-[0.5px_0px_var(--color-neutral-000)_inset,1.5px_0px_var(--color-neutral-300)_inset]',
                isStepped && 'ml-2',
              )}
            >
              {isStepped ? (
                <div className="-ml-[7px]">{headers.map((header, index) => steppedHeader(header, index))}</div>
              ) : (
                <div
                  className="h-7 w-px bg-orange-600 rounded-full transition-[transform,height,colors] z-0 ml-[0.5px]"
                  style={{
                    transform: `translateY(${indicatorPosition.yOffset}px)`,
                    height: `${indicatorPosition.height}px`,
                  }}
                ></div>
              )}
              <div className="flex flex-col">
                {headers.map((header, index) => (
                  <a
                    href={`#${header.id}`}
                    key={[location.pathname, header.id, index].join('-')}
                    id={`sidebar-${header.id}`}
                    tabIndex={0}
                    data-heading={header.type.toLowerCase()}
                    className={cn(
                      'ui-text-label4 font-medium text-neutral-900 dark:text-neutral-400 hover:text-neutral-1300 dark:hover:text-neutral-000 active:text-neutral-1100 dark:active:text-neutral-200 py-[5px] pr-2 transition-colors focus-base',
                      { 'text-neutral-1300 dark:text-neutral-000': header.id === activeHeader?.id },
                      isStepped && '-ml-4',
                      getElementIndent(header.type, isStepped),
                    )}
                    onClick={() => setActiveHeader({ id: header.id })}
                  >
                    {header.label}
                  </a>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default RightSidebar;
