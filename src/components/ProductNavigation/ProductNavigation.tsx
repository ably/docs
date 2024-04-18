import cn from 'classnames';
import { Link, withPrefix } from 'gatsby';
import { PropsWithChildren } from 'react';

type ItemProps = {
  to: string;
  active: boolean;
};

const Item = ({ to, children, active = false }: PropsWithChildren<ItemProps>) => {
  return (
    <Link
      to={to}
      className={cn('leading-normal px-12 md:px-14 py-16 relative font-medium cursor-pointer', {
        'text-active-orange md:mr-2': active,
        'md:px-14': !active,
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
  const onLiveSync = currentProduct === 'livesync';
  const onAssetTracking = currentProduct === 'asset-tracking';

  return (
    <nav
      className="sticky z-40 flex flex-row justify-start h-48 px-8 bg-white top-64 sm:px-24"
      style={{ boxShadow: '0 1px 0 0 #E5E5E5' }}
    >
      <Item to="/" active={onHome}>
        Home
      </Item>
      <Item to="/products/channels" active={onChannels}>
        Pub/Sub Channels
      </Item>
      <Item to="/products/spaces" active={onSpaces}>
        Spaces
      </Item>
      <Item to="/products/livesync" active={onLiveSync}>
        LiveSync
      </Item>
      <Item to="/products/asset-tracking" active={onAssetTracking}>
        Asset Tracking
      </Item>
    </nav>
  );
};

export default ProductNavigation;
