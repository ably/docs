import cn from 'classnames';
import { Link } from 'gatsby';
import { PropsWithChildren } from 'react';

type ItemProps = {
  to: string;
  active: boolean;
};

const Item = ({ to, children, active = false }: PropsWithChildren<ItemProps>) => {
  return (
    <Link
      to={to}
      className={cn('leading-normal px-12 md:px-40 py-16 relative font-medium cursor-pointer', {
        'text-active-orange mr-2': active,
        'px-14': !active,
      })}
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
      className="sticky z-40 flex flex-row justify-start h-48 px-8 bg-white top-64 sm:px-24"
      style={{ boxShadow: '0 1px 0 0 #E5E5E5' }}
    >
      <Item to="/docs" active={onHome}>
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
