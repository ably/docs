import React, { HTMLAttributes } from 'react';
import cn from 'classnames';
import { ChildPropTypes } from '../../../react-utilities';

const MenuItem = ({ className, ...props }: HTMLAttributes<HTMLLIElement>) => (
  <li
    className={cn(
      'relative whitespace-nowrap break-all list-none pb-0 leading-loose text-white font-next-book',
      className,
    )}
    {...props}
  />
);

MenuItem.propTypes = {
  children: ChildPropTypes,
};

export default MenuItem;
