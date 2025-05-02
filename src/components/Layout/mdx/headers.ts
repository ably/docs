import { useEffect } from 'react';

export const useCopyableHeaders = () => {
  useEffect(() => {
    // Set href of every gatsby-copyable-header based on name or href of first anchor
    const setHeaderHrefs = () => {
      document.querySelectorAll('.gatsby-copyable-header').forEach((header) => {
        if (!(header instanceof HTMLAnchorElement)) {
          return;
        }

        const firstAnchor = header.parentElement?.querySelector('a');
        if (!firstAnchor) {
          return;
        }

        // Prioritize name attribute, fall back to href
        if (firstAnchor.hasAttribute('id')) {
          header.setAttribute('href', `#${firstAnchor.getAttribute('id')}`);
        } else if (firstAnchor.hasAttribute('href')) {
          header.setAttribute('href', firstAnchor.getAttribute('href') || '');
        }
      });
    };

    // Call once on mount
    setHeaderHrefs();

    const handleCopyableHeaderClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const headerLink = target.closest('.gatsby-copyable-header');

      if (!(headerLink instanceof HTMLAnchorElement)) {
        return;
      }

      event.preventDefault();

      // Determine the anchor to use in the URL
      const firstAnchor = headerLink.parentElement?.querySelector('a');
      let anchor = '';

      if (firstAnchor?.hasAttribute('id')) {
        // First priority: name attribute on first anchor
        anchor = `#${firstAnchor.getAttribute('id')}`;
      } else if (firstAnchor?.hasAttribute('href')) {
        // Second priority: href attribute on first anchor
        anchor = firstAnchor.getAttribute('href') || '';
      } else {
        // Fallback: header's own href
        anchor = headerLink.getAttribute('href') || '';
      }

      const linkToCopy = `${window.location.href.split('#')[0]}${anchor}`;

      // Copy to clipboard
      navigator.clipboard.writeText(linkToCopy).catch((err) => {
        console.error('Failed to copy link: ', err);
      });
    };

    document.addEventListener('click', handleCopyableHeaderClick);

    return () => {
      document.removeEventListener('click', handleCopyableHeaderClick);
    };
  }, []);
};
