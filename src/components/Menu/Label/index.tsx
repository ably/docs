import React, { FunctionComponent as FC } from 'react';
import '@ably/ui/core/styles.css';

const MenuLabel: FC = ({ children }) => (
  <li className="relative whitespace-nowrap break-all list-none pb-0 leading-loose text-white font-next-book mr-auto">
    {children}
  </li>
);
const SmallMenuLabel: FC<{ htmlFor?: string }> = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor ?? undefined} className="align-middle p-4 ui-text-menu3">
    {children}
  </label>
);

export { SmallMenuLabel };
export default MenuLabel;
