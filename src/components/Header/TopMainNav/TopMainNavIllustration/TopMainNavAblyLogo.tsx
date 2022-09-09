import React, { useLayoutEffect, useState } from 'react';
import { safeWindow } from '../../../../utilities/browser/safe-window';

export const TopMainNavAblyLogo = ({ href = '/' }: { href?: string }) => {
  const [width, setWidth] = useState(1920);
  useLayoutEffect(() => {
    safeWindow.addEventListener('resize', () => setWidth(window.innerWidth));
    setWidth(window.innerWidth);
  }, []);
  return (
    <a href={href} className="h-32 flex-non self-center">
      {width > 1024 ? (
        <img src="/images/icons/ably-docs-logo.svg" />
      ) : (
        <img className="h-32" src="/images/icons/ably-logo.svg" />
      )}
    </a>
  );
};
