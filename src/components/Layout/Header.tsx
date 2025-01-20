import React, { useState, useEffect, useRef, useContext, useMemo } from 'react';
import { navigate } from '@reach/router';
import TabMenu from '@ably/ui/core/TabMenu';
import Icon from '@ably/ui/core/Icon';
import cn from '@ably/ui/core/utils/cn';
import LinkButton from '@ably/ui/core/LinkButton';
import Logo from '@ably/ui/core/Logo';

import { SearchBar } from '../SearchBar';
import LeftSidebar from './LeftSidebar';
import UserContext from 'src/contexts/user-context';
import { pathWithBase } from './utils/nav';
import { componentMaxHeight, HEADER_BOTTOM_MARGIN, HEADER_HEIGHT } from './utils/heights';

type HeaderProps = {
  hideSearchBar?: boolean;
};

const HeaderLinks: React.FC = () => {
  const userContext = useContext(UserContext);
  const sessionState = userContext.sessionState;
  const signedIn = useMemo(() => sessionState.signedIn || !!process.env.GATSBY_DOCS_SIGNED_IN, [sessionState.signedIn]);

  const headerLinkClasses =
    'ui-text-menu2 md:ui-text-menu3 !font-bold py-16 text-neutral-1300 dark:text-neutral-000 md:text-neutral-1000 dark:md:text-neutral-300 hover:text-neutral-1300 dark:hover:text-neutral-000 active:text-neutral-1300 dark:active:text-neutral-000 transition-colors';

  return (
    <div className="flex md:items-center flex-col md:flex-row border-t-[1px] border-neutral-300 md:border-t-0 px-12 pb-12 md:pb-0">
      <a
        className={cn(headerLinkClasses, 'flex items-center gap-4 md:mr-16 mt-8 md:mt-0')}
        href={pathWithBase('/sdks')}
        target="_blank"
        rel="noopener"
      >
        SDKs
        <Icon name="icon-gui-external-link" />
      </a>
      <a className={cn(headerLinkClasses, 'md:mr-16 mb-8 md:mb-0')} href="/support">
        Support
      </a>
      {signedIn && sessionState.account ? (
        <LinkButton
          href={sessionState.account.links?.dashboard.href}
          variant="secondary"
          className="md:ui-button-secondary-xs"
        >
          Dashboard
        </LinkButton>
      ) : (
        <div className="flex">
          <LinkButton href="/login" variant="secondary" className="mr-12 flex-1 md:flex-none md:ui-button-secondary-xs">
            Login
          </LinkButton>
          <LinkButton href="/sign-up" variant="primary" className="flex-1 md:flex-none md:ui-button-primary-xs">
            Start free
          </LinkButton>
        </div>
      )}
    </div>
  );
};

const Header: React.FC<HeaderProps> = ({ hideSearchBar = false }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const tabs = ['Documentation', { label: 'Examples', disabled: true }];

  const tabLinks = (index: number) => {
    switch (index) {
      case 0:
        return pathWithBase('/');
      case 1:
        return pathWithBase('/examples');
      default:
        return '#';
    }
  };

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
      <header
        role="banner"
        className="fixed top-0 left-0 w-full z-10 bg-neutral-000 dark:bg-neutral-1300 flex px-24 md:px-64 h-64 border-b border-neutral-300 items-center"
        style={{ height: HEADER_HEIGHT }}
      >
        <Logo additionalLinkAttrs={{ className: 'flex h-full focus-base rounded mr-32' }} />
        <div className="flex md:hidden flex-1 items-center justify-end gap-24 h-full">
          <button
            className="cursor-pointer focus-base rounded"
            aria-label="Toggle search"
            onClick={() => {
              const searchContainer = document.querySelector('#inkeep-search > div');
              const searchButton = searchContainer?.shadowRoot?.querySelector('button');

              if (searchButton) {
                searchButton.click();
              }
            }}
          >
            <Icon name="icon-gui-search" size="1.5rem" />
          </button>
          <button
            className="cursor-pointer focus-base rounded"
            onClick={() => setShowMenu(!showMenu)}
            aria-expanded={showMenu}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            <Icon name={showMenu ? 'icon-gui-close' : 'icon-gui-burger-menu'} size="1.5rem" />
          </button>
        </div>
        <div className="hidden md:flex flex-1 items-center h-full">
          <TabMenu
            tabs={tabs}
            tabClassName="ui-text-menu3 !px-16"
            tabOnClick={(index) => {
              navigate(tabLinks(index));
            }}
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
          <div
            className="absolute inset-0 bg-neutral-1300 dark:bg-neutral-1300 animate-[fadeInTenPercent_150ms_ease-in-out_forwards]"
            onClick={() => setShowMenu(!showMenu)}
            onKeyDown={(e) => e.key === 'Escape' && setShowMenu(false)}
            role="presentation"
          />
          <div
            id="mobile-menu"
            className="md:hidden absolute flex flex-col top-[76px] overflow-y-hidden left-0 right-0 mx-12 bg-neutral-000 dark:bg-neutral-1300 rounded-2xl ui-shadow-lg-medium z-20"
            style={{ maxHeight: componentMaxHeight(HEADER_HEIGHT, HEADER_BOTTOM_MARGIN) }}
            ref={menuRef}
            role="navigation"
          >
            <TabMenu
              tabs={tabs}
              contents={[<LeftSidebar inHeader key="nav-mobile-documentation-tab" />, null]}
              rootClassName="h-full overflow-y-hidden min-h-[51px] flex flex-col"
              contentClassName="h-full py-16 overflow-y-scroll"
              tabClassName="ui-text-menu2 !px-16"
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
