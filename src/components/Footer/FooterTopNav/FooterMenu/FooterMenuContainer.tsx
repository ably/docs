import { FooterMenu, FooterMenuItemType } from './FooterMenu';
import React from 'react';

export const FooterMenuContainer = ({
  menuDataItems,
}: {
  menuDataItems: { items: FooterMenuItemType[]; label: string }[];
}) => (
  <>
    {menuDataItems.map((item: { items: FooterMenuItemType[]; label: string }) => (
      <FooterMenu label={item.label} items={item.items} key={item.label} />
    ))}
  </>
);
