import { useMemo, useEffect, useState } from 'react';
import throttle from 'lodash.throttle';

import { SidebarData } from 'src/components';

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
    if (!topNav) {
      return;
    }
    const topNavHeight = topNav.getBoundingClientRect().height;
    const languageNavigation = document.getElementById('top-code-menu');
    const combinedTopNavHeight =
      topNavHeight + (languageNavigation ? languageNavigation?.getBoundingClientRect()?.height : 0);
    for (const headingLine of flatTableOfContents) {
      const element = document.getElementById(headingLine.link.replaceAll('#', ''));
      if (element) {
        const rectangle = element.getBoundingClientRect();
        if (isInView(rectangle, combinedTopNavHeight)) {
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

  useEffect(() => {
    window.addEventListener('scroll', () => throttledScroll(flatTableOfContents, setHighlightedHeadingId));

    return () =>
      window.removeEventListener('scroll', () => throttledScroll(flatTableOfContents, setHighlightedHeadingId));
  });

  return highlightedHeadingId;
};
