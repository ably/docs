import React, { useState, useEffect } from 'react';
import TabMenu from '@ably/ui/core/TabMenu';
import Icon from '@ably/ui/core/Icon';
import Button from '@ably/ui/core/Button';
import cn from '@ably/ui/core/utils/cn';

import { SearchBar } from '../SearchBar';
import AblyLogo from './images/ably-logo.png';

interface HeaderProps {
  showSearchBar?: boolean;
}

const HeaderLinks = () => (
  <div className="flex md:items-center flex-col md:flex-row">
    <a
      className="ui-text-menu3 font-bold flex items-center gap-4 md:mr-16 py-16"
      href="/docs/sdks"
      target="_blank"
      rel="noreferrer"
    >
      SDKs
      <Icon name="icon-gui-external-link" />
    </a>
    <a className="ui-text-menu3 font-bold md:mr-16 py-16" href="/support">
      Help
    </a>
    <div className="flex">
      <Button variant="secondary" size="xs" className="mr-12 flex-1 md:flex-none">
        Login
      </Button>
      <Button variant="primary" size="xs" className="flex-1 md:flex-none">
        Start free
      </Button>
    </div>
  </div>
);

const Header: React.FC<HeaderProps> = ({ showSearchBar }) => {
  const [showMenu, setShowMenu] = useState(false);

  const tabs = ['Documentation', { label: 'Examples', disabled: true }];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1040) {
        setShowMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-10 bg-neutral-000 dark:bg-neutral-1300 flex px-24 md:px-64 h-64 border-b border-neutral-300">
        <a className="flex items-center" href="/">
          <img src={AblyLogo} width="108px" alt="Ably logo" className="mr-32" />
        </a>
        <div className="flex md:hidden flex-1 items-center justify-end gap-24">
          <div className="cursor-pointer" onClick={() => undefined}>
            <Icon name="icon-gui-search" size="1.5rem" />
          </div>
          <div className="cursor-pointer" onClick={() => setShowMenu(!showMenu)}>
            <Icon name="icon-gui-burger-menu" size="1.5rem" />
          </div>
        </div>
        <div className="hidden md:flex flex-1 items-center">
          <TabMenu
            tabs={tabs}
            tabClassName="ui-text-menu3 !px-16"
            options={{ underline: false, flexibleTabHeight: true }}
          />
          <div className={cn('flex-1 flex justify-center', { 'pl-16 pr-32': showSearchBar })}>
            {showSearchBar ? (
              <SearchBar
                displayLocation="homepage"
                extraStyleOptions={{
                  wrapperContainer: { width: '100%', maxWidth: '280px' },
                  inputContainer: { width: '100%', maxWidth: '280px' },
                }}
              />
            ) : null}
          </div>
          <HeaderLinks />
        </div>
      </header>
      {showMenu ? (
        <div className="block md:hidden absolute top-[76px] left-12 right-12 p-12 bg-neutral-000 dark:bg-neutral-1300 rounded-2xl ui-shadow-lg-medium">
          <div>
            <TabMenu
              tabs={tabs}
              contents={[<div key="nav-mobile-documentation-tab">Example docs content</div>, null]}
              tabClassName="ui-text-menu3 !px-16"
              options={{ flexibleTabWidth: true }}
            />
            <HeaderLinks />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Header;
