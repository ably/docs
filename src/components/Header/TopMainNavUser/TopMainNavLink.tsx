import React from 'react';

export const TopMainNavLink = ({
  href,
  dataId,
  children,
}: {
  href: string;
  dataId: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="hidden md:flex items-center h-full mr-24 py-24 font-medium hover:text-gui-hover"
    data-id={dataId}
  >
    {children}
  </a>
);
