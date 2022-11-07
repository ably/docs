import React, { useState } from 'react';
import htmr from 'htmr';
import cn from 'classnames';
import clamp from 'lodash/clamp';

import { HitType, useKeyPress } from 'src/hooks';

import { DOCUMENTATION_PATH } from '../../../../../data/transform/constants';
import { container, hitItem, titleStyle } from './SuggestionBox.module.css';

type Props = {
  results: HitType[] | null;
  isActive: boolean;
};

export const SuggestionBox = ({ results, isActive }: Props) => {
  const totalResults = results?.length ?? 0;
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const handleSelectHit = (index: number) => {
    setSelectedItem(index);
    document.getElementById(`suggestion-${index}`)?.focus();
  };

  const handleResultItemSelect = ({ key }: KeyboardEvent) => {
    const index =
      key === 'ArrowDown'
        ? clamp(selectedItem !== null ? selectedItem + 1 : 0, 0, totalResults)
        : clamp(selectedItem !== null ? selectedItem - 1 : totalResults - 1, 0, totalResults);

    handleSelectHit(index);
  };

  useKeyPress(['ArrowDown', 'ArrowUp'], handleResultItemSelect);

  if (!isActive || !results || totalResults === 0) {
    return null;
  }

  return (
    <div aria-label="suggestions" className={container}>
      <div className="font-light text-dark-grey uppercase text-menu3 px-16 mb-2">Results from docs</div>
      {results &&
        results.map((hit, index) => {
          const { title, highlight, meta_description, url, id } = hit;
          const [pageTitle, ...breadcrumbs] = title.split(' / ').filter(
            (item) =>
              // We need to get rid of 'Docs' because it's redundant and
              // 'Root` because there are no root section it gets redirected to '/docs/'
              !DOCUMENTATION_PATH.toLowerCase().includes(item.trim().toLowerCase()) ||
              item.trim().toLowerCase() === 'root',
          );

          return (
            <a
              id={`suggestion-${index}`}
              key={id}
              href={url}
              tabIndex={index}
              className={cn(
                'block p-16 hover:bg-light-grey focus:bg-light-grey focus:outline-none rounded-lg break-all mb-4',
                hitItem,
              )}
              role="link"
            >
              <h4 className={cn('text-menu2 mb-6 font-medium', titleStyle)}>{pageTitle}</h4>
              <div className="text-menu3 font-light text-charcoal-grey leading-5">
                {htmr(meta_description ?? highlight)}
              </div>
              {breadcrumbs.length > 0 && (
                <div className="text-dark-grey font-light text-menu3 mt-8">{breadcrumbs.join(' > ').toLowerCase()}</div>
              )}
            </a>
          );
        })}
    </div>
  );
};
