import React from 'react';
import { DropdownContentLink } from '../../Contents';

export const AccountOptions = ({ links }: { links: DropdownContentLink[] }) => (
  <>
    <p className="ui-meganav-overline mt-16 mx-16">Your account</p>
    <menu className="mb-16 mx-16 list-none">
      {links.map((item) => (
        <li key={item.href}>
          <a className="ui-meganav-account-link" href={item.href}>
            {item.text}
          </a>
        </li>
      ))}
    </menu>
  </>
);
