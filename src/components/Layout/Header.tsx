import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from '@reach/router';
import { graphql, useStaticQuery } from 'gatsby';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Tooltip from '@radix-ui/react-tooltip';
import { throttle } from 'es-toolkit/compat';
import cn from '@ably/ui/core/utils/cn';
import Icon from '@ably/ui/core/Icon';
import TabMenu from '@ably/ui/core/TabMenu';
import Logo from '@ably/ui/core/images/logo/ably-logo.svg';
import { track } from '@ably/ui/core/insights';
import { componentMaxHeight, HEADER_BOTTOM_MARGIN, HEADER_HEIGHT } from '@ably/ui/core/utils/heights';
import { IconName } from '@ably/ui/core/Icon/types';
import LeftSidebar from './LeftSidebar';
import ProductBar from './ProductBar';
import UserContext from 'src/contexts/user-context';
import ExamplesList from '../Examples/ExamplesList';
import Link from '../Link';
import { InkeepSearchBar } from '../SearchBar/InkeepSearchBar';
import { secondaryButtonClassName, iconButtonClassName, tooltipContentClassName } from './utils/styles';
import { useLayoutContext } from 'src/contexts/layout-context';

// Tailwind 'md' breakpoint from tailwind.config.js
const MD_BREAKPOINT = 1040;
const CLI_ENABLED = false;
const MAX_MOBILE_MENU_WIDTH = '560px';

const headerLinkClassName = 'px-3 py-1.5 rounded-lg ui-text-label3 font-medium transition-colors';
const activeHeaderLinkClassName = 'text-neutral-1300 dark:text-neutral-000 bg-orange-100 dark:bg-orange-1000';
const inactiveHeaderLinkClassName =
  'text-neutral-800 dark:text-neutral-500 hover:text-neutral-1300 dark:hover:text-neutral-000 hover:bg-neutral-100 dark:hover:bg-neutral-1200';

const mobileTabs = ['Platform', 'Products', 'Examples'];

const helpResourcesItems = [
  {
    href: '/support',
    icon: 'icon-gui-lifebuoy-outline' as IconName,
    label: 'Support',
  },
  {
    href: '/docs/sdks',
    icon: 'icon-gui-cube-outline' as IconName,
    label: 'SDKs',
  },
  {
    href: 'https://ably.com',
    icon: 'icon-gui-ably-badge' as IconName,
    label: 'ably.com',
    external: true,
  },
];

const Header: React.FC = () => {
  const location = useLocation();
  const userContext = useContext(UserContext);
  const { activePage } = useLayoutContext();
  const {
    site: {
      siteMetadata: { externalScriptsData },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          externalScriptsData {
            inkeepSearchEnabled
            inkeepChatEnabled
          }
        }
      }
    }
  `);

  const sessionState = {
    ...userContext.sessionState,
    signedIn: userContext.sessionState.signedIn ?? false,
    logOut: userContext.sessionState.logOut ?? { token: '', href: '' },
    accountName: userContext.sessionState.accountName ?? '',
    account: userContext.sessionState.account ?? { links: { dashboard: { href: '#' } } },
  };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const burgerButtonRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const chatBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const clickedOutsideMenu = mobileMenuRef.current && !mobileMenuRef.current.contains(target);
      const clickedOutsideBurgerButton = burgerButtonRef.current && !burgerButtonRef.current.contains(target);

      if (isMobileMenuOpen && clickedOutsideMenu && clickedOutsideBurgerButton) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleResize = throttle(() => {
      if (window.innerWidth >= MD_BREAKPOINT && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }, 150);

    // Physically shift the inkeep search bar around given that it's initialised once
    const targetId = isMobileMenuOpen ? 'inkeep-search-mobile-mount' : 'inkeep-search-mount';
    const targetElement = document.getElementById(targetId);
    const searchBar = searchBarRef.current;

    if (targetElement && searchBar) {
      targetElement.appendChild(searchBar);
    }

    window.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
      handleResize.cancel();
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activePage]);

  const handleLogout = useCallback(async () => {
    if (sessionState.logOut.href && sessionState.logOut.token) {
      try {
        await fetch(sessionState.logOut.href, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            _method: 'delete',
            authenticity_token: sessionState.logOut.token,
          }),
        });

        track('docs_logout_button_clicked');

        // Reload the current page after successful logout
        window.location.reload();
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  }, [sessionState.logOut]);

  return (
    <div className="fixed top-0 w-full z-50 bg-neutral-000 dark:bg-neutral-1300 border-b border-neutral-300 dark:border-neutral-1000">
      <div className="flex items-center justify-between h-16 px-6 max-w-[1856px] mx-auto">
      <div className="flex items-center gap-8 shrink-0">
        <a href="/docs" className="flex items-center gap-2 focus-base p-2 rounded -ml-2">
          <img src={Logo} width="96px" alt="Ably" />
          <span className="bg-neutral-000 dark:bg-neutral-1300 border border-neutral-300 dark:border-neutral-1000 text-[10px] font-bold text-neutral-1000 dark:text-neutral-400 px-1.5 py-[3px] rounded-md uppercase">
            Docs
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-1">
          <Link
            to="/docs/platform"
            className={cn(
              headerLinkClassName,
              activePage.product === 'platform' ? activeHeaderLinkClassName : inactiveHeaderLinkClassName,
            )}
          >
            Platform
          </Link>
          <Link
            to="/docs/pub-sub"
            className={cn(
              headerLinkClassName,
              activePage.product && activePage.product !== 'platform'
                ? activeHeaderLinkClassName
                : inactiveHeaderLinkClassName,
            )}
          >
            Products
          </Link>
          <Link
            to="/examples"
            className={cn(
              headerLinkClassName,
              location.pathname.includes('/examples') ? activeHeaderLinkClassName : inactiveHeaderLinkClassName,
            )}
          >
            Examples
          </Link>
        </nav>
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            id="mobile-menu"
            className="md:hidden fixed flex flex-col top-[4.75rem] overflow-y-hidden mx-3 right-0 w-[calc(100%-24px)] bg-neutral-000 dark:bg-neutral-1300 rounded-2xl ui-shadow-lg-medium z-50"
            style={{
              maxWidth: MAX_MOBILE_MENU_WIDTH,
              maxHeight: componentMaxHeight(HEADER_HEIGHT, HEADER_BOTTOM_MARGIN),
            }}
          >
            <TabMenu
              tabs={mobileTabs}
              contents={[
                <div key="nav-mobile-platform-tab">
                  <LeftSidebar inHeader />
                </div>,
                <div key="nav-mobile-products-tab">
                  <ProductBar />
                  <LeftSidebar inHeader />
                </div>,
                <ExamplesList key="nav-mobile-examples-tab" />,
              ]}
              rootClassName="h-full overflow-y-hidden min-h-[3.1875rem] flex flex-col"
              contentClassName="h-full overflow-y-scroll"
              tabClassName="ui-text-menu2 !px-4"
              options={{ flexibleTabWidth: true }}
            />
          </div>
        )}
      </div>
      <div
        id="inkeep-search-mount"
        className="hidden md:flex items-center justify-center flex-1 min-w-0 mx-4"
      >
        {!externalScriptsData.inkeepSearchEnabled && (
          <div className="w-full max-w-[480px]">
            <button
              className={cn(
                secondaryButtonClassName,
                'w-full justify-start gap-2 text-neutral-600 dark:text-neutral-700 font-normal',
              )}
              onClick={() => {
                // Inkeep renders its chat widget inside a shadow DOM; this reaches in to
                // programmatically open it. Will silently no-op if the widget structure changes.
                const chatContainer = document.querySelector('#inkeep-ai-chat > div');
                const chatButton = chatContainer?.shadowRoot?.querySelector('button');
                if (chatButton) chatButton.click();
              }}
            >
              <Icon name="icon-gui-magnifying-glass-outline" size="16px" />
              <span>Search docs...</span>
            </button>
          </div>
        )}
      </div>
      <Tooltip.Provider delayDuration={0} disableHoverableContent>
        <div className="hidden md:flex gap-2 pt-3 md:py-0 px-4 md:px-0 shrink-0">
          {externalScriptsData.inkeepChatEnabled && (
            <button
              className={secondaryButtonClassName}
              onClick={() => {
                // Inkeep renders its chat widget inside a shadow DOM; this reaches in to
                // programmatically open it. Will silently no-op if the widget structure changes.
                const chatContainer = document.querySelector('#inkeep-ai-chat > div');
                const chatButton = chatContainer?.shadowRoot?.querySelector('button');

                track('docs_ask_ai_button_clicked');

                if (chatButton) {
                  chatButton.click();
                }
              }}
            >
              <Icon name="icon-gui-sparkles-outline" size="20px" />
              <span>Ask AI</span>
            </button>
          )}
          <DropdownMenu.Root>
            <Tooltip.Root>
              <DropdownMenu.Trigger asChild>
                <Tooltip.Trigger asChild>
                  <button className={iconButtonClassName} onClick={() => track('docs_help_resources_button_clicked')}>
                    <Icon name="icon-gui-question-mark-circle-outline" size="20px" />
                  </button>
                </Tooltip.Trigger>
              </DropdownMenu.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className={tooltipContentClassName}>Help & Resources</Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="min-w-[200px] bg-neutral-000 dark:bg-neutral-1300 border border-neutral-300 dark:border-neutral-1000 rounded-lg ui-shadow-lg-medium p-1 z-50"
                sideOffset={5}
                align="end"
              >
                {helpResourcesItems.map((item) => (
                  <DropdownMenu.Item
                    key={item.href}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-1300 dark:text-neutral-000 hover:bg-neutral-100 dark:hover:bg-neutral-1200 rounded cursor-pointer outline-none"
                    asChild
                  >
                    <a
                      href={item.href}
                      {...(item.external && { target: '_blank', rel: 'noopener noreferrer' })}
                      className={item.external ? 'justify-between' : undefined}
                    >
                      <div className="flex items-center gap-2">
                        <Icon name={item.icon} size="20px" />
                        <span>{item.label}</span>
                      </div>
                      {item.external && <Icon name="icon-gui-arrow-top-right-on-square-outline" size="16px" />}
                    </a>
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
          {CLI_ENABLED && (
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button className={iconButtonClassName} onClick={() => track('docs_cli_button_clicked')}>
                  <Icon name="icon-gui-command-line-outline" size="20px" />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className={tooltipContentClassName}>Open CLI</Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          )}
          {sessionState.signedIn ? (
            <>
              {sessionState.preferredEmail ? (
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <a href="/dashboard" className={secondaryButtonClassName}>
                      Dashboard
                    </a>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content className={tooltipContentClassName}>{sessionState.preferredEmail}</Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              ) : (
                <a href="/dashboard" className={secondaryButtonClassName}>
                  Dashboard
                </a>
              )}
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button className={iconButtonClassName} onClick={handleLogout}>
                    <Icon name="icon-gui-arrow-right-start-on-rectangle-outline" size="20px" />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content className={tooltipContentClassName}>Log out</Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </>
          ) : (
            <>
              <a href="/login" className={secondaryButtonClassName}>
                Login
              </a>
              <a href="/sign-up" className="flex-1 md:flex-none md:ui-button-primary-xs">
                Start free
              </a>
            </>
          )}
        </div>
      </Tooltip.Provider>
      <div ref={burgerButtonRef} className="flex md:hidden">
        <button className={iconButtonClassName} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Icon name="icon-gui-bars-3-outline" size="20px" />
        </button>
      </div>

      <div className="hidden">
        {externalScriptsData.inkeepSearchEnabled && (
          <InkeepSearchBar ref={searchBarRef} instanceType="search" extraInputStyle={{ backgroundColor: 'white' }} />
        )}
        {externalScriptsData.inkeepChatEnabled && (
          <InkeepSearchBar ref={chatBarRef} instanceType="chat" extraInputStyle={{ backgroundColor: 'white' }} />
        )}
      </div>
      </div>
    </div>
  );
};

export default Header;
