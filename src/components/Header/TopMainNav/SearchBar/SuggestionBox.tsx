import React, { useState } from 'react';
import cn from 'classnames';
import htmr from 'htmr';
import { HitType, useKeyPress } from 'src/hooks';

import { container, snapshot } from './SuggestionBox.module.css';

type Props = {
  results: HitType[] | null;
  isActive: boolean;
};

export const SuggestionBox = ({ results, isActive }: Props) => {
  const [selectedItem, setSelectedItem] = useState<(HitType & { index: number }) | null>(null);

  const handleOptionHover = (hit: HitType, index: number) => {
    if (selectedItem?.url === hit.url) {
      return;
    }

    setSelectedItem({ ...hit, index });
  };

  const handleResultItemSelect = ({ key }: KeyboardEvent) => {
    if (key === 'ArrowDown') {
      const index = selectedItem !== null ? selectedItem.index + 1 : 0;
      console.log(index);
      const nextItem = results?.[index];
      if (nextItem) {
        handleOptionHover(nextItem, index);
      }
    }

    if (key === 'ArrowUp') {
      const index = selectedItem !== null ? selectedItem.index - 1 : -1;

      const previousItem = results?.[index];
      if (previousItem) {
        handleOptionHover(previousItem, index);
      }
    }
  };

  useKeyPress(['ArrowDown', 'ArrowUp'], handleResultItemSelect);

  if (!isActive || !results || results.length === 0) {
    return null;
  }

  return (
    <div aria-label="suggestions" className={container}>
      <div className="col-span-12 md:col-span-6 md:border-r border-mid-grey md:pr-16 py-16">
        <div className="font-light text-dark-grey uppercase text-menu3 px-16">Results from docs</div>
        {results &&
          results.map((hit, hitIndex) => {
            const { title, highlight, url, id } = hit;
            return (
              <a
                key={id}
                href={url}
                className={cn('block p-16 hover:bg-light-grey rounded-lg break-all', {
                  'bg-light-grey': hitIndex === selectedItem?.index,
                })}
                onMouseOver={() => handleOptionHover(hit, hitIndex)}
                onMouseLeave={() => setSelectedItem(null)}
                role="link"
              >
                <h4 className="text-menu2 mb-6 font-medium">{title}</h4>
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
