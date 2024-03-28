import React from 'react';
import Link from 'src/components/Link';

export const TopMainNavLink = ({
  href,
  dataId,
  external,
  children,
}: {
  href: string;
  dataId: string;
  external: boolean;
  children: React.ReactNode;
}) => (
  <Link
    to={href}
    className="hidden md:flex items-center h-full mr-24 py-24 font-medium hover:text-gui-hover whitespace-nowrap"
    data-id={dataId}
    external={external}
  >
    {children}
  </Link>
);
