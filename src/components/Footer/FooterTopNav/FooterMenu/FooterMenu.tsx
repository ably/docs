import React from 'react';
import { FooterMenuItem } from './FooterMenuItem';

export type FooterMenuItemType = { label: string; link: string };

export const FooterMenu = ({ items, label }: { items: FooterMenuItemType[]; label: string }) => {
  return (
    <div className="col-span-full sm:col-span-3 md:col-span-1">
      <h2 className="ui-footer-col-title">{label}</h2>
      <ul>
        {items.map((item: FooterMenuItemType) => (
          <FooterMenuItem label={item.label} link={item.link} key={item.label} />
        ))}
      </ul>
    </div>
  );
};
