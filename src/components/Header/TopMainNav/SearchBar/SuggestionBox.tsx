import React, { useState } from 'react';
import htmr from 'htmr';
import cn from 'classnames';
import clamp from 'lodash/clamp';
import Icon from '@ably/ui/core/Icon';

import { HitType, useKeyPress } from 'src/hooks';

import { DOCUMENTATION_PATH } from '../../../../../data/transform/constants';
import { EmptyState } from './EmptyState';
import { container, hitItem, titleStyle } from './SuggestionBox.module.css';

type Props = {
  results: HitType[] | null;
  isActive: boolean;
  error?: { message: string } | null;
  query: string;
};

export const SuggestionBox = ({ results, isActive, error, query }: Props) => {
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

  if (!isActive || !query) {
    return null;
  }

  return (
    <div aria-label="suggestions" className={container}>
      <div className="font-light text-dark-grey uppercase text-menu3 px-16 mb-2">Results from docs</div>
      {results && totalResults > 0 ? (
        results.map((hit, index) => {
          const { title, highlight, meta_description, url, id } = hit;
          console.log(title);
          const [pageTitle, ...breadcrumbs] = title.split(' / ').filter(
            (item) =>
              // We need to get rid of 'Docs' because it's redundant
              !DOCUMENTATION_PATH.toLowerCase().includes(item.trim().toLowerCase()),
          );

          const body = meta_description ?? highlight;

          return (
            <a
              id={`suggestion-${index}`}
              key={id}
              href={url}
              tabIndex={index}
              className={cn(
                'block p-16 hover:bg-light-grey focus:bg-light-grey focus:outline-none rounded-lg mb-4 overflow-hidden',
                { 'break-all': body.match(/[^\s]{109,}/) },
                hitItem,
              )}
              role="link"
            >
              <h4 className={cn('text-menu2 mb-6 font-medium', titleStyle)}>{pageTitle}</h4>
              <div className="text-menu3 font-light text-charcoal-grey leading-5">{htmr(body)}</div>
              {breadcrumbs.length > 0 && (
                <div className="text-dark-grey font-light text-menu3 mt-8">{breadcrumbs.join(' > ').toLowerCase()}</div>
              )}
            </a>
          );
        })
      ) : error ? (
        <EmptyState>
          We couldn&apos;t perform the search due to an API error. Please try again or{' '}
          <a
            href="https://ably.com/support"
            target="_blank"
            rel="noreferrer"
            className="text-gui-active hover:underline"
          >
            raise a support ticket
          </a>{' '}
          if the problem persists.
        </EmptyState>
      ) : (
        <EmptyState>
          We couldn&apos;t find an exact match for <span className="font-medium">‘{query}’</span> in the docs, but you
          may be able to find the results you&apos;re looking for on{' '}
          <a
            href={`https://ably.com/search?q=${query}`}
            target="_blank"
            rel="noreferrer"
            className="text-gui-active hover:underline"
          >
            our main site
            <Icon name="icon-gui-external-link" size="12px" additionalCSS="inline-block ml-4" />
          </a>
          .
        </EmptyState>
      )}
    </div>
  );
};
