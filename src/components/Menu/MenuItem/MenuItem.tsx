import React, { HTMLAttributes } from 'react';
import cn from 'classnames';

const MenuItem = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'relative whitespace-nowrap break-all list-none pb-0 leading-loose text-white font-next-book',
      className,
    )}
    {...props}
  />
);

export default MenuItem;
