import React, { MouseEvent } from 'react';
import { safeWindow } from 'src/utilities';

const linkClickWithTracker = (tracker: () => void, destination: string) => (event: MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
  // Registers that this button was clicked, nothing else.
  tracker();
  safeWindow.location.href = destination;
};

export const InArticleOptions = ({
  primaryOptionLabel,
  primaryOptionDestination,
  primaryTracker,
  secondaryOptionLabel,
  secondaryOptionDestination,
  secondaryTracker,
}: {
  primaryOptionLabel: string;
  primaryOptionDestination: string;
  primaryTracker: () => void;
  secondaryOptionLabel: string;
  secondaryOptionDestination: string;
  secondaryTracker: () => void;
}) => (
  <div className="flex flex-row mt-16 gap-16">
    <a
      onClick={linkClickWithTracker(primaryTracker, primaryOptionDestination)}
      href={primaryOptionDestination}
      className="ui-btn"
    >
      {primaryOptionLabel}
    </a>
    <a
      onClick={linkClickWithTracker(secondaryTracker, secondaryOptionDestination)}
      href={secondaryOptionDestination}
      className="ui-btn-secondary"
    >
      {secondaryOptionLabel}
    </a>
  </div>
);
