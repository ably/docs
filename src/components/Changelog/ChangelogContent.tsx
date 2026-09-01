import React, { useMemo, useState } from 'react';
import Button from 'src/components/ui/Button';
import cn from 'src/utilities/cn';
import { secondaryButtonClassName } from '../Layout/utils/styles';
import ChangelogTimeline from './ChangelogTimeline';
import { sortByDateDesc } from './sort-entries';
import { ChangelogEntry } from './types';
import { CHANGELOG_RSS_PATH } from './constants';
import { Image, ImageProps, getImageFromList } from 'src/components/Image';

// Number of entries shown initially and revealed per "Show more" click.
const PAGE_SIZE = 10;

// Icon-only RSS button linking to the generated feed. Built from the shared secondary
// button styling (sm size, squared off) so its chrome, hover, and focus match the site.
const RssButton = () => (
  <a
    href={CHANGELOG_RSS_PATH}
    aria-label="Subscribe to the changelog RSS feed"
    title="RSS feed"
    className={cn(secondaryButtonClassName, 'shrink-0 h-10 w-10 p-0')}
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 11a9 9 0 0 1 9 9" />
      <path d="M4 4a16 16 0 0 1 16 16" />
      <circle cx="5" cy="19" r="1" />
    </svg>
  </a>
);

// Top-level client component for the changelog index page: the hero and a
// single-column, horizontally-ruled timeline with "Show more" pagination. Entries
// carry product tags for context; discovery/search is left to site-wide search.
const ChangelogContent = ({ entries, images = [] }: { entries: ChangelogEntry[]; images?: ImageProps[] }) => {
  // Decorative top-right background pattern (changelog-specific assets). It is
  // offset by the fixed site header height (top-[3.9375rem] = 63px) so it sits
  // directly below the header rather than underneath it.
  const mobileBackground = getImageFromList(images, 'mobile-grid.svg');
  const desktopBackground = getImageFromList(images, 'pattern-grid.svg');

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const sortedEntries = useMemo(() => sortByDateDesc(entries), [entries]);
  const visibleEntries = sortedEntries.slice(0, visibleCount);
  const hasMore = sortedEntries.length > visibleCount;

  return (
    <>
      {mobileBackground && (
        <Image
          image={mobileBackground}
          className="absolute top-[3.9375rem] right-0 z-[-1] block sm:hidden dark:hidden w-auto h-auto pointer-events-none"
          aria-hidden="true"
        />
      )}
      {desktopBackground && (
        <Image
          image={desktopBackground}
          className="absolute top-[3.9375rem] right-0 z-[-1] hidden sm:block dark:hidden w-auto h-auto pointer-events-none"
          aria-hidden="true"
        />
      )}

      <section className="mx-auto w-full max-w-3xl px-6 md:px-0">
        <div className="pt-20 sm:pt-24">
          <div className="flex items-center gap-4">
            <h1 className="ui-text-title text-title mb-0">Changelog</h1>
            <RssButton />
          </div>
          <p className="ui-text-sub-header mt-4">
            Find out about the latest features, fixes, and enhancements to Ably&apos;s platform and products.
          </p>
        </div>

        <div className="mt-10 sm:mt-12">
          <ChangelogTimeline entries={visibleEntries} />
          {hasMore && (
            <div className="mt-12 flex flex-col items-center gap-3">
              <p className="ui-text-p3 text-neutral-800 dark:text-neutral-500 mb-0">
                Showing {visibleEntries.length} of {sortedEntries.length}
              </p>
              <Button variant="secondary" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
                Show more
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ChangelogContent;
