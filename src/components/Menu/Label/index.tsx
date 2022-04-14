import React, { FunctionComponent as FC } from 'react';
import '@ably/ui/core/styles.css';
import '../styles.css';

const MenuLabel: FC = ({ children }) => <li className="docs-menu-item docs-menu-item-label">{children}</li>;
const SmallMenuLabel: FC = ({ children }) => <span className="align-middle p-4 ui-text-menu3">{children}</span>;

export { SmallMenuLabel };
export default MenuLabel;
