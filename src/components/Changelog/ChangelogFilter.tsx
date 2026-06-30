import React, { useCallback } from 'react';
import { navigate } from 'gatsby';
import { useLocation } from '@reach/router';
import cn from '@ably/ui/core/utils/cn';
import { productTags } from './tags';

// Product filter for the changelog index, rendered as a row of toggle lozenges
// below the header. Selected products are mirrored into the `?product=` query
// string so a filtered view is shareable and survives a reload. Multi-select with
// OR semantics; "All" clears the filter. Free-text search is left to site-wide search.
const ChangelogFilter = ({
  selected,
  setSelected,
}: {
  selected: string[];
  setSelected: (products: string[]) => void;
}) => {
  const location = useLocation();

  const syncUrl = useCallback(
    (products: string[]) => {
      const params = new URLSearchParams(location.search);
      if (products.length > 0) {
        params.set('product', products.join(','));
      } else {
        params.delete('product');
      }
      const query = params.toString();
      navigate(`${location.pathname}${query ? `?${query}` : ''}`, { replace: true });
    },
    [location.pathname, location.search],
  );

  const toggle = useCallback(
    (slug: string) => {
      const next =
        slug === 'all' ? [] : selected.includes(slug) ? selected.filter((item) => item !== slug) : [...selected, slug];
      setSelected(next);
      syncUrl(next);
    },
    [selected, setSelected, syncUrl],
  );

  const lozenge = (active: boolean) =>
    cn('rounded-full border px-3 py-1 ui-text-p4 transition-colors cursor-pointer', {
      'border-neutral-1300 bg-neutral-1300 text-neutral-000 dark:border-neutral-000 dark:bg-neutral-000 dark:text-neutral-1300':
        active,
      'border-neutral-300 text-neutral-1000 hover:border-neutral-500 dark:border-neutral-1000 dark:text-neutral-300 dark:hover:border-neutral-800':
        !active,
    });

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter changelog by product">
      <button
        type="button"
        data-testid="product-all"
        aria-pressed={selected.length === 0}
        onClick={() => toggle('all')}
        className={lozenge(selected.length === 0)}
      >
        All
      </button>
      {Object.entries(productTags).map(([slug, { label }]) => {
        const active = selected.includes(slug);
        return (
          <button
            key={slug}
            type="button"
            data-testid={`product-${slug}`}
            aria-pressed={active}
            onClick={() => toggle(slug)}
            className={lozenge(active)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default ChangelogFilter;
