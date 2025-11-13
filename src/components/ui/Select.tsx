import { useLayoutEffect } from 'react';
import * as RadixSelect from '@radix-ui/react-select';

// Radix Select insists on locking scrolling when the dropdown is open. This is a workaround to unlock scrolling.
const useScrollUnlock = () => {
  useLayoutEffect(() => {
    const TYPE_LIST = ['wheel', 'scroll', 'touchmove'] as const;
    const stopper = (e: Event) => e.stopImmediatePropagation();

    const unlockScroll = () => {
      TYPE_LIST.forEach((type) => {
        window.addEventListener(type, stopper, { capture: true, passive: false });
      });
      document.body.removeAttribute('data-scroll-locked');
    };

    const cleanupListeners = () => {
      TYPE_LIST.forEach((type) => {
        window.removeEventListener(type, stopper, { capture: true });
      });
    };

    const mo = new MutationObserver((mutations) => {
      // Only react if data-scroll-locked was added
      const wasLocked = mutations.some(
        (m) => m.type === 'attributes' && document.body.hasAttribute('data-scroll-locked'),
      );
      if (wasLocked) {
        cleanupListeners();
        unlockScroll();
      }
    });

    mo.observe(document.body, { attributes: true, attributeFilter: ['data-scroll-locked'] });

    return () => {
      mo.disconnect();
      cleanupListeners();
    };
  }, []);
};

const Root = (props: RadixSelect.SelectProps) => {
  useScrollUnlock();
  return <RadixSelect.Root {...props} />;
};

// Re-export everything from Radix Select, then override Root
export * from '@radix-ui/react-select';
export { Root };
