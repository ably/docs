import React, { useState, MouseEvent } from 'react';
import cn from 'classnames';
import { HitType } from 'src/hooks';
import htmr from 'htmr';

import { container, snapshot } from './SuggestionBox.module.css';

type Props = {
  results: HitType[] | null;
  isActive: boolean;
};

export const SuggestionBox = ({ results, isActive }: Props) => {
  const [capture, setCapture] = useState<{ link: string; title: string } | null>(null);

  const handleOptionHover = (event: MouseEvent<HTMLAnchorElement>) => {
    const link = event.currentTarget.getAttribute('data-capture') as string;
    const title = event.currentTarget.getAttribute('data-title') as string;
    if (capture?.link === link) {
      return;
    }
    setCapture({ link, title });
  };

  const handleOptionHoverOut = () => {
    setCapture(null);
  };

  if (!isActive || !results || results.length === 0) {
    return null;
  }

  return (
    <div aria-label="suggestions" className={container}>
      <div className={`col-span-6 border-r border-mid-grey pr-16 py-16`}>
        <div className="font-light text-dark-grey uppercase text-menu3 px-16">Results from docs</div>
        {results &&
          results.map(({ title, highlight, url, id, images: { capture } }) => (
            <a
              key={id}
              href={url}
              className="block p-16 hover:bg-light-grey rounded-lg"
              data-capture={capture}
              data-title={title}
              onMouseOver={handleOptionHover}
              onMouseLeave={handleOptionHoverOut}
              role="link"
            >
              <h4 className="text-menu2 mb-6 font-medium">{title}</h4>
              <div className="text-menu3 font-light text-charcoal-grey">{htmr(highlight)}</div>
              {url && <div className="text-dark-grey font-light text-menu3 mt-8">{new URL(url).hostname}</div>}
            </a>
          ))}
      </div>
      <div className="relative col-span-4 py-16 pl-16 flex justify-center">
        {capture && <img className={snapshot} src={capture.link} alt={capture.title} />}
      </div>
    </div>
  );
};
