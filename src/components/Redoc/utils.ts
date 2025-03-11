import throttle from 'lodash.throttle';

/*
  This function introduces click listeners to override the functionality for each menu item in the sidebar,
  and also listens for hash changes via scroll to update the currently opened menu section.
  Sadly, this is necessary because Redoc opens the wrong menu item when clicking on a menu trigger, and is a bit
  broken in general.
*/
export const overrideMenuItemNavigation = () => {
  let trackedSection = '';
  const menuItems = document.querySelectorAll('#redoc-container .menu-content .scrollbar-container > ul > li');

  const scrollHandler = throttle(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('clicked') === 'true') {
      setTimeout(() => {
        params.delete('clicked');
        window.history.replaceState({}, '', window.location.pathname + '?' + params.toString());
      }, 500);
      return;
    }

    const decodedHash = decodeURIComponent(window.location.hash).split('/')?.[1];

    if (decodedHash !== trackedSection) {
      trackedSection = decodedHash;

      menuItems.forEach((item) => {
        const ul = item.querySelector('ul');
        const svg = item.querySelector('svg');

        if (ul) {
          ul.style.display = '';
        }
        if (svg) {
          svg.style.transform = '';
        }
      });
    }
  }, 500);

  document.addEventListener('scroll', scrollHandler);

  const clickHandlers = new Map();

  menuItems.forEach((targetItem) => {
    const clickHandler = () => {
      // Add clicked query param
      const url = new URL(window.location.href);
      url.searchParams.set('clicked', 'true');
      window.history.replaceState({}, '', url);

      menuItems.forEach((item) => {
        const isOther = item !== targetItem;
        const ul = item.querySelector('ul');
        const svg = item.querySelector('svg');

        if (ul) {
          ul.style.display = isOther ? 'none' : 'block';
        }
        if (svg) {
          svg.style.transform = isOther ? 'rotate(-90deg)' : 'rotate(0deg)';
        }
      });
    };

    clickHandlers.set(targetItem, clickHandler);
    targetItem.addEventListener('click', clickHandler);
  });

  // Clean up function to remove all event listeners
  const cleanup = () => {
    document.removeEventListener('scroll', scrollHandler);
    menuItems.forEach((item) => {
      const handler = clickHandlers.get(item);
      if (handler) {
        item.removeEventListener('click', handler);
      }
    });
    clickHandlers.clear();
  };

  // Watch for URL changes
  const observer = new MutationObserver(() => {
    if (window.location.pathname !== '/docs/api/control-api') {
      cleanup();
    }
  });

  const body = document.querySelector('body');
  if (body) {
    observer.observe(body, { childList: true, subtree: true });
  }

  return cleanup;
};
