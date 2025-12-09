import cn from '@ably/ui/core/utils/cn';
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
      className={cn('px-3 md:px-3.5 py-4 relative cursor-pointer ui-text-label3', {
        'text-neutral-1300 md:mr-0.5': active,
        'text-neutral-1000 md:px-3.5': !active,
      })}
    >
      {children}
      {active && <div className="absolute left-0 right-0 -bottom-px bg-neutral-1300 rounded-lg h-0.5"></div>}
    </Link>
  );
};

const ProductNavigation = ({ currentProduct = 'channels' }: { currentProduct?: string }) => {
  const onHome = currentProduct === 'home';
  const onSpaces = currentProduct === 'spaces';
  const onChannels = currentProduct === 'channels';
  const onLiveSync = currentProduct === 'livesync';
  const onChat = currentProduct === 'chat';
  const onLiveObjects = currentProduct === 'liveobjects';

  return (
    <nav
      className="sticky z-40 flex flex-row justify-start h-12 px-2 bg-white top-16 sm:px-6"
      style={{ boxShadow: '0 1px 0 0 #E5E5E5' }}
    >
      <Item to="/docs" active={onHome}>
        Home
      </Item>
      <Item to="/docs/products/channels" active={onChannels}>
        Pub/Sub
      </Item>
      <Item to="/docs/products/spaces" active={onSpaces}>
        Spaces
      </Item>
      <Item to="/docs/products/livesync" active={onLiveSync}>
        LiveSync
      </Item>
      <Item to="/docs/products/chat" active={onChat}>
        Chat
      </Item>
      <Item to="/docs/products/liveobjects" active={onLiveObjects}>
        LiveObjects
      </Item>
    </nav>
  );
};

export default ProductNavigation;
