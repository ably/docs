import React, { FunctionComponent as FC, HTMLProps } from 'react';
import cn from 'classnames';

import { smallMenuLabel } from './Label.module.css';

const MenuLabel: FC = ({ children }) => (
  <li className="relative whitespace-nowrap break-all list-none pb-0 leading-loose text-white font-next-book mr-auto">
    {children}
  </li>
);

const SmallMenuLabel = ({ htmlFor, className = '', ...labelProps }: HTMLProps<HTMLLabelElement>) => (
  <label htmlFor={htmlFor ?? undefined} className={cn(smallMenuLabel, className)} {...labelProps} />
);

export { SmallMenuLabel };
export default MenuLabel;
