import React, { useState } from 'react';
import htmr from 'htmr';
import cn from 'classnames';
import clamp from 'lodash/clamp';

import { HitType, useKeyPress } from 'src/hooks';

import { container, snapshot, hitItem, titleStyle } from './SuggestionBox.module.css';

type Props = {
  results: HitType[] | null;
  isActive: boolean;
};

export const SuggestionBox = ({ results, isActive }: Props) => {
  const totalResults = results?.length ?? 0;
  const [selectedItem, setSelectedItem] = useState<(HitType & { index: number }) | null>(null);

  const handleSelectHit = (hit: HitType & { index: number }) => {
    setSelectedItem(hit);
    document.getElementById(`suggestion-${hit.id}`)?.focus();
  };

  const handleOptionHover = (hit: HitType, index: number) => {
    if (selectedItem?.id === hit.id) {
      return;
    }
    setSelectedItem({ ...hit, index });
  };

  const handleResultItemSelect = ({ key }: KeyboardEvent) => {
    if (key === 'ArrowDown') {
      const index = clamp(selectedItem !== null ? selectedItem.index + 1 : 0, 0, totalResults);
      const nextItem = results?.[index];

      if (nextItem) {
        handleSelectHit({ ...nextItem, index });
      }
    }

    if (key === 'ArrowUp') {
      const index = clamp(selectedItem !== null ? selectedItem.index - 1 : totalResults - 1, 0, totalResults);
      const previousItem = results?.[index];

      if (previousItem) {
        handleSelectHit({ ...previousItem, index });
      }
    }
  };

  useKeyPress(['ArrowDown', 'ArrowUp'], handleResultItemSelect);

  if (!isActive || !results || totalResults === 0) {
    return null;
  }

  return (
    <div aria-label="suggestions" className={container}>
      <div className="col-span-12 md:col-span-6 md:border-r border-mid-grey md:pr-16 py-16">
        <div className="font-light text-dark-grey uppercase text-menu3 px-16">Results from docs</div>
        {results &&
          results.map((hit, index) => {
            const { title, highlight, url, id } = hit;
            return (
              <a
                id={`suggestion-${id}`}
                key={id}
                href={url}
                tabIndex={index}
                className={cn(
                  'block p-16 hover:bg-light-grey focus:bg-light-grey focus:outline-none rounded-lg break-all',
                  hitItem,
                )}
                onMouseOver={() => handleOptionHover(hit, index)}
                onMouseLeave={() => setSelectedItem(null)}
                role="link"
              >
                <h4 className={cn('text-menu2 mb-6 font-medium', titleStyle)}>{title}</h4>
                <div className="text-menu3 font-light text-charcoal-grey">{htmr(highlight)}</div>
                {url && <div className="text-dark-grey font-light text-menu3 mt-8">{new URL(url).hostname}</div>}
              </a>
            );
          })}
      </div>
      <div className="hidden md:flex relative col-span-4 py-16 px-16 justify-center">
        {selectedItem && <img className={snapshot} src={selectedItem.images.capture} alt={selectedItem.title} />}
      </div>
    </div>
  );
};
