import React, { useState, MouseEvent } from 'react';
import { HitType } from 'src/hooks';
import htmr from 'htmr';

import { container } from './SuggestionBox.module.css';

type Props = {
  results: HitType[] | null;
  isActive: boolean;
};

export const SuggestionBox = ({ results, isActive }: Props) => {
  const [captureLink, setCaptureLink] = useState<string | null>(null);

  const handleOptionHover = (event: MouseEvent<HTMLAnchorElement>) => {
    const newCaptureLink = event.currentTarget.getAttribute('data-capture');
    if (captureLink === newCaptureLink) {
      return;
    }
    setCaptureLink(newCaptureLink);
  };

  const handleOptionHoverOut = () => {
    setCaptureLink(null);
  };

  if (!isActive || !results || results.length === 0) {
    return null;
  }

  return (
    <div className={container}>
      <div className="col-span-6">
        <div className="font-light text-dark-grey uppercase text-menu3 px-16">Results from docs</div>
        {results &&
          results.map(({ title, highlight, url, id, images: { capture } }) => (
            <a
              key={id}
              href={url}
              className="block p-16 hover:bg-light-grey rounded-lg"
              data-capture={capture}
              onMouseOver={handleOptionHover}
              onMouseLeave={handleOptionHoverOut}
            >
              <h4 className="text-menu2 mb-6 font-medium">{title}</h4>
              <div className="text-menu3 font-light text-charcoal-grey">{htmr(highlight)}</div>
              {url && <div className="text-dark-grey font-light text-menu3 mt-8">{new URL(url).hostname}</div>}
            </a>
          ))}
      </div>
      <div className="col-span-4 relative">
        {captureLink && <img className="sticky top-16" src={captureLink} alt="current link capture" />}
      </div>
    </div>
  );
};
