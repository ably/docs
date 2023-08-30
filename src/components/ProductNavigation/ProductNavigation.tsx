import React, { PropsWithChildren } from 'react';
import cn from 'classnames';
import { Link } from 'gatsby';

import { Home } from './Icons';

type ItemProps = {
  to: string;
  active: boolean;
};

const Item = ({ to, children, active = false }: PropsWithChildren<ItemProps>) => {
  return (
    <Link
      to={to}
      className={cn('px-12 md:px-40 py-16 relative font-medium cursor-pointer', {
        'text-active-orange': active,
      })}
      style={{ lineHeight: 'var(--lh-normal)' }}
    >
      {children}
      {active && (
        <div
          className="absolute left-0 right-0 -bottom-1 bg-active-orange"
          style={{ borderRadius: '0.625rem', height: '0.15625rem' }}
        ></div>
      )}
    </Link>
  );
};

const ProductNavigation = ({ currentProduct = 'channels' }: { currentProduct?: string }) => {
  const onHome = currentProduct === 'home';
  const onSpaces = currentProduct === 'spaces';
  const onChannels = currentProduct === 'channels';

  return (
    <nav
      className="sticky top-64 z-40 bg-white flex flex-row justify-start h-48 px-8 sm:px-24"
      style={{ boxShadow: '0 1px 0 0 #E5E5E5' }}
    >
      <Item to="/docs" active={onHome}>
        <div className="inline-block align-middle mr-8">
          <Home active={onHome} />
        </div>
        Home
      </Item>
      <Item to="/docs/products/channels" active={onChannels}>
        Pub/Sub Channels
      </Item>
      <Item to="/docs/products/spaces" active={onSpaces}>
        Spaces
      </Item>
    </nav>
  );
};

export default ProductNavigation;
