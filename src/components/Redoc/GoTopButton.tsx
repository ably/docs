import React, { useEffect, useState } from 'react';
import Icon from '@ably/ui/core/Icon';

export const GoTopButton = () => {
  const [showGoTop, setShowGoTop] = useState(false);

  const handleVisibleButton = () => {
    setShowGoTop(window.scrollY > 20);
  };

  const handleScrollUp = () => {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleVisibleButton);
  }, []);

  return (
    <div className={showGoTop ? 'block' : 'hidden'} onClick={handleScrollUp}>
      <div className="rounded text-white py-8 px-8 bg-cool-black bottom-0 left-0 fixed m-16 z-20 cursor-pointer">
        <Icon
          name="icon-gui-link-arrow"
          size="1.5rem"
          additionalCSS="block text-white transform -rotate-90 align-text-bottom w-24 h-24 m-10"
        />
      </div>
    </div>
  );
};
