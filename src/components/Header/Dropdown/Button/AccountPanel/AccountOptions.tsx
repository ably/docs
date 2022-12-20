import React from 'react';
import { DropdownContentLink } from '../../Contents';

export const AccountOptions = ({ links }: { links: DropdownContentLink[] }) => (
  <div className="p-16">
    <p className="ui-meganav-overline mb-16">Your account</p>
    <menu className="p-0 list-none">
      {links.map((item) => (
        <li key={item.href}>
          <a className="ui-meganav-account-link" href={item.href}>
            {item.text}
          </a>
        </li>
      ))}
    </menu>
  </div>
);
