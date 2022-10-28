import React from 'react';

export type FooterMenuItemType = { label: string; link: string };

export const FooterMenu = ({ items, label }: { items: FooterMenuItemType[]; label: string }) => {
  return (
    <div className="col-span-full sm:col-span-3 md:col-span-1">
      <h2 className="ui-footer-col-title">{label}</h2>
      <ul>
        {items
          ? items.map((item: FooterMenuItemType) => (
              <li className="p-menu-row-snug" key={item.label}>
                <a href={item.link} className="ui-footer-menu-row-link">
                  {item.label}
                </a>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};
