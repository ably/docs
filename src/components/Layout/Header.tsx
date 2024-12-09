import React, { useState, useEffect } from 'react';
import TabMenu from '@ably/ui/core/TabMenu';
import Icon from '@ably/ui/core/Icon';
import Button from '@ably/ui/core/Button';
import cn from '@ably/ui/core/utils/cn';

import { SearchBar } from '../SearchBar';
import AblyLogo from './images/ably-logo.png';
import { LeftSidebar } from './LeftSidebar';

type HeaderProps = {
  hideSearchBar?: boolean;
};

const HeaderLinks = () => {
  const headerLinkClasses =
    'ui-text-menu3 font-bold py-16 text-neutral-1300 dark:text-neutral-000 md:text-neutral-1000 dark:md:text-neutral-300 hover:text-neutral-1300 dark:hover:text-neutral-000 active:text-neutral-1300 dark:active:text-neutral-000 transition-colors';

  return (
    <div className="flex md:items-center flex-col md:flex-row border-t-[1px] border-neutral-300 md:border-t-0 px-12 pb-12 md:pb-0">
      <a
        className={cn(headerLinkClasses, 'flex items-center gap-4 md:mr-16 mt-8 md:mt-0')}
        href="/docs/sdks"
        target="_blank"
        rel="noreferrer"
      >
        SDKs
        <Icon name="icon-gui-external-link" />
      </a>
      <a className={cn(headerLinkClasses, 'md:mr-16 mb-8 md:mb-0')} href="/support">
        Support
      </a>
      <div className="flex">
        <Button variant="secondary" className="mr-12 flex-1 md:flex-none md:ui-button-secondary-xs">
          Login
        </Button>
        <Button variant="primary" className="flex-1 md:flex-none md:ui-button-primary-xs">
          Start free
        </Button>
      </div>
    </div>
  );
};

const Header: React.FC<HeaderProps> = ({ hideSearchBar = false }) => {
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

  useEffect(() => {
    if (showMenu) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [showMenu]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-10 bg-neutral-000 dark:bg-neutral-1300 flex px-24 md:px-64 h-64 border-b border-neutral-300">
        <a className="flex items-center" href="/">
          <img src={AblyLogo} width="108px" alt="Ably logo" className="mr-32" />
        </a>
        <div className="flex md:hidden flex-1 items-center justify-end gap-24">
          <div id="inkeep-search" className="cursor-pointer">
            <Icon name="icon-gui-search" size="1.5rem" />
          </div>
          <div className="cursor-pointer" onClick={() => setShowMenu(!showMenu)}>
            <Icon name={showMenu ? 'icon-gui-close' : 'icon-gui-burger-menu'} size="1.5rem" />
          </div>
        </div>
        <div className="hidden md:flex flex-1 items-center">
          <TabMenu
            tabs={tabs}
            tabClassName="ui-text-menu3 !px-16"
            options={{ underline: false, flexibleTabHeight: true }}
          />
          <div className="flex-1 flex justify-center pl-16 pr-32">
            {!hideSearchBar ? (
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
        <>
          <div className="absolute inset-0 bg-neutral-1300 dark:bg-neutral-1300 animate-[fadeInTenPercent_150ms_ease-in-out_forwards]" />
          <div className="md:hidden absolute flex flex-col top-[76px] h-[calc(100vh-88px)] overflow-y-hidden left-0 right-0 mx-12 bg-neutral-000 dark:bg-neutral-1300 rounded-2xl ui-shadow-lg-medium z-20">
            <TabMenu
              tabs={tabs}
              contents={[<LeftSidebar isStatic key="nav-mobile-documentation-tab" />, null]}
              rootClassName="h-full overflow-y-hidden min-h-[51px]"
              contentClassName="h-full p-16 overflow-y-scroll"
              tabClassName="ui-text-menu3 !px-16"
              options={{ flexibleTabWidth: true }}
            />
            <HeaderLinks />
          </div>
        </>
      ) : null}
    </>
  );
};

export default Header;
