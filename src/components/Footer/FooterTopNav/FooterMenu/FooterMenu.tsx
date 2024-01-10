import React from 'react';
import Link from 'src/components/Link';

export type FooterMenuItemType = {
  label: string;
  link: string;
  external: boolean;
};

export const FooterMenu = ({ items, label }: { items: FooterMenuItemType[]; label: string }) => {
  return (
    <div className="col-span-full sm:col-span-3 md:col-span-1">
      <h2 className="ui-footer-col-title">{label}</h2>
      <ul>
        {items.map(({ label, link, external }: FooterMenuItemType) => (
          <li key={label} className="p-menu-row-snug pb-8">
            <Link to={link} external={external} className="ui-footer-menu-row-link">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
