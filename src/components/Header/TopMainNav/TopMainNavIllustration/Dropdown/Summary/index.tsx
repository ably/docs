import React from 'react';

export const Summary = ({ titleText, descriptionText }: { titleText: string; descriptionText: string }) => (
  <div className="bg-extra-light-grey top-64 left-0 h-256 w-1/4 fixed">
    <strong className="uppercase">{titleText}</strong>
    <p>{descriptionText}</p>
  </div>
);
