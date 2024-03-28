import React from 'react';
import boldChevronLeft from 'src/images/icons/bold-chevron-left.svg';

export const BackButton = ({ toggle }: { toggle: () => void }) => (
  <div
    className="cursor-pointer flex items-center max-w-full mr-24 mt-16 pb-16 flex-grow justify-between text-16 focus-within:outline-none"
    role="button"
    tabIndex={0}
    onClick={toggle}
    onKeyDown={(event) => event.key === 'Enter' && toggle()}
  >
    <span className="text-gui-default align-middle pl-24">
      <img className="pr-8 h-12" src={boldChevronLeft} />
      Back
    </span>
  </div>
);
