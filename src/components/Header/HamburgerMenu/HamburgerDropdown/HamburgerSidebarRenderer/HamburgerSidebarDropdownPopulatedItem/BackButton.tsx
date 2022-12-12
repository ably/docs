import React from 'react';
import { StaticImage } from 'src/components/StaticImage';

export const BackButton = ({ toggle }: { toggle: () => void }) => (
  <div
    className="cursor-pointer flex items-center max-w-full mr-24 pb-16 flex-grow justify-between text-16 focus-within:outline-none"
    role="button"
    tabIndex={0}
    onClick={toggle}
    onKeyDown={(event) => event.key === 'Enter' && toggle()}
  >
    <span className="text-gui-default align-middle pl-24">
      <StaticImage className="pr-8 h-12" src="/images/icons/bold-chevron-left.svg" />
      Back
    </span>
  </div>
);
