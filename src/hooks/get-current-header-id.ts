import { useMemo, useLayoutEffect, useState } from 'react';
import throttle from 'lodash.throttle';
import { SidebarData } from '../components/Sidebar/sidebar-data';

// Source: ably/voltaire: src/templates/ghost/utils/get-current-header-id.ts

const TOLERANCE_THRESHOLD_IN_PIXELS = 20;
const MILLISECOND_DELAY_ON_THROTTLE = 200;

const isInView = (elementRectangle: DOMRect, megaNavHeight: number) => {
  return (
    elementRectangle.top >= megaNavHeight - TOLERANCE_THRESHOLD_IN_PIXELS &&
    elementRectangle.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) + TOLERANCE_THRESHOLD_IN_PIXELS
  );
};

//Watches as the user scrolls and returns the highest on the screen heading item to keep
//the table of contents up to date
export const useGetCurrentHeader = (flatTableOfContents: SidebarData[]) => {
  const [highlightedHeadingId, setHighlightedHeadingId] = useState<string | null>(null);

  const checkTableOfContentsForWhatHeadingIsInView = (
    flatTableOfContents: SidebarData[],
    setHeadingId: typeof setHighlightedHeadingId,
  ) => {
    const topNav = document.getElementById('top-main-nav') as HTMLElement;
    const topNavHeight = topNav.getBoundingClientRect().height;
    for (const headingLine of flatTableOfContents) {
      const element = document.getElementById(headingLine.link.replaceAll('#', ''));
      if (element) {
        const rectangle = element.getBoundingClientRect();
        if (isInView(rectangle, topNavHeight)) {
          setHeadingId(headingLine.link);
          break;
        }
      }
    }
  };

  const throttledScroll = useMemo(
    () => throttle(checkTableOfContentsForWhatHeadingIsInView, MILLISECOND_DELAY_ON_THROTTLE),
    [],
  );

  useLayoutEffect(() => {
    window.addEventListener('scroll', () => throttledScroll(flatTableOfContents, setHighlightedHeadingId));

    return () =>
      window.removeEventListener('scroll', () => throttledScroll(flatTableOfContents, setHighlightedHeadingId));
  });

  return highlightedHeadingId;
};
