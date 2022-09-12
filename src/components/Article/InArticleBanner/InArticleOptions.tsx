import React from 'react';

export const InArticleOptions = ({
  primaryOptionLabel,
  primaryOptionDestination,
  secondaryOptionLabel,
  secondaryOptionDestination,
}: {
  primaryOptionLabel: string;
  primaryOptionDestination: string;
  secondaryOptionLabel: string;
  secondaryOptionDestination: string;
}) => (
  <div className="flex flex-row mt-16 gap-16">
    <a href={primaryOptionDestination} className="ui-btn">
      {primaryOptionLabel}
    </a>
    <a href={secondaryOptionDestination} className="ui-btn-secondary">
      {secondaryOptionLabel}
    </a>
  </div>
);
