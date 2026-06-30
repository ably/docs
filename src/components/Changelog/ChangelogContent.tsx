import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from '@reach/router';
import Button from '@ably/ui/core/Button';
import cn from '@ably/ui/core/utils/cn';
import { secondaryButtonClassName } from '../Layout/utils/styles';
import ChangelogFilter from './ChangelogFilter';
import ChangelogTimeline from './ChangelogTimeline';
import { filterChangelog, sortByDateDesc } from './filter-changelog';
import { productTags } from './tags';
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

// Top-level client component for the changelog index page. Owns the product filter
// state, hydrates it from the URL, and renders the hero, product filter lozenges,
// and a single-column, horizontally-ruled timeline. Free-text search is
// intentionally left to the site-wide (Inkeep) search.
const ChangelogContent = ({ entries, images = [] }: { entries: ChangelogEntry[]; images?: ImageProps[] }) => {
  const location = useLocation();

  // Decorative top-right background pattern (changelog-specific assets). It is
  // offset by the fixed site header height (top-[3.9375rem] = 63px) so it sits
  // directly below the header rather than underneath it.
  const mobileBackground = getImageFromList(images, 'mobile-grid.svg');
  const desktopBackground = getImageFromList(images, 'pattern-grid.svg');

  const getInitialProducts = (): string[] => {
    const params = new URLSearchParams(location.search);
    const productParam = params.get('product');
    if (!productParam) {
      return [];
    }
    const validSlugs = Object.keys(productTags);
    return productParam
      .split(',')
      .map((slug) => slug.trim())
      .filter((slug) => validSlugs.includes(slug));
  };

  const [selected, setSelected] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Hydrate the filter from a shared `?product=` URL after mount rather than in the
  // useState initializer. The server renders with no query string, so seeding state
  // from the URL up-front would mismatch the first client render; applying it in an
  // effect keeps hydration consistent and then reflects the shared filter.
  useEffect(() => {
    setSelected(getInitialProducts());
    // Mount-only: later URL changes are driven by the filter itself, not read back.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filtering happens over the full dataset; pagination is only a display cap
  // applied afterwards.
  const filteredEntries = useMemo(() => sortByDateDesc(filterChangelog(entries, selected)), [entries, selected]);
  const visibleEntries = filteredEntries.slice(0, visibleCount);
  const hasMore = filteredEntries.length > visibleCount;

  // Reset the page size whenever the filter changes so a new result set starts
  // from the top rather than inheriting a previously expanded count.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [selected]);

  return (
    <>
      {mobileBackground && (
        <Image
          image={mobileBackground}
          className="absolute top-[3.9375rem] right-0 z-[-1] block sm:hidden w-auto h-auto pointer-events-none"
          aria-hidden="true"
        />
      )}
      {desktopBackground && (
        <Image
          image={desktopBackground}
          className="absolute top-[3.9375rem] right-0 z-[-1] hidden sm:block w-auto h-auto pointer-events-none"
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
            New features, improvements, and fixes across the Ably platform and SDKs.
          </p>
          <div className="mt-6">
            <ChangelogFilter selected={selected} setSelected={setSelected} />
          </div>
        </div>

        <div className="mt-10 sm:mt-12">
          <ChangelogTimeline entries={visibleEntries} />
          {hasMore && (
            <div className="mt-12 flex flex-col items-center gap-3">
              <Button variant="secondary" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
                Show more
              </Button>
              <p className="ui-text-p3 text-neutral-800 dark:text-neutral-500 mb-0">
                Showing {visibleEntries.length} of {filteredEntries.length}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ChangelogContent;
