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
  <li className="min-w-max">
    <a href={href} className="ui-meganav-link pt-22" data-id={dataId}>
      {children}
    </a>
  </li>
);
