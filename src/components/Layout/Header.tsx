import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from '@reach/router';
import { graphql, useStaticQuery } from 'gatsby';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Tooltip from '@radix-ui/react-tooltip';
import { throttle } from 'es-toolkit/compat';
import cn from 'src/utilities/cn';
import Icon from 'src/components/Icon';
import TabMenu from 'src/components/ui/TabMenu';
import Logo from 'src/images/ably-logo.svg';
import LogoDark from 'src/images/ably-logo-dark.svg';
import { track } from '@ably/ui/core/insights';
import { componentMaxHeight, HEADER_BOTTOM_MARGIN, HEADER_HEIGHT } from 'src/utilities/heights';
import LeftSidebar from './LeftSidebar';
import ProductBar from './ProductBar';
import UserContext from 'src/contexts/user-context';
import ExamplesList from '../Examples/ExamplesList';
import Link from '../Link';
import { InkeepSearchBar } from '../SearchBar/InkeepSearchBar';
import { secondaryButtonClassName, iconButtonClassName, tooltipContentClassName } from './utils/styles';
import { useLayoutContext } from 'src/contexts/layout-context';
import { ProductKey } from 'src/data/types';
import {
  ArrowRightStartOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  Bars3Icon,
  CommandLineIcon,
  CubeIcon,
  LifebuoyIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

// Tailwind 'md' breakpoint from tailwind.config.js
const MD_BREAKPOINT = 1040;
const CLI_ENABLED = false;
const MAX_MOBILE_MENU_WIDTH = '560px';

const headerLinkClassName =
  'inline-flex items-center h-9 px-4 rounded-lg ui-text-label3 font-semibold transition-colors';
const activeHeaderLinkClassName = 'text-neutral-1300 dark:text-neutral-000 bg-orange-100 dark:bg-orange-1000';
const inactiveHeaderLinkClassName =
  'text-neutral-900 dark:text-neutral-500 hover:text-neutral-1300 dark:hover:text-neutral-000 hover:bg-neutral-100 dark:hover:bg-neutral-1200';

// Opens an Inkeep widget (search or chat) by reaching into its shadow DOM. The Inkeep
// instances stay mounted but hidden (see #inkeep-search-holder), so these are our own
// triggers for them. No-ops where the widget isn't loaded (e.g. local dev) or its
// internal trigger isn't a top-level button.
const openInkeepWidget = (hostSelector: string, eventName: string) => {
  const trigger = document.querySelector(`${hostSelector} > div`)?.shadowRoot?.querySelector('button');
  if (!trigger) {
    return;
  }
  track(eventName);
  trigger.click();
};

const openInkeepSearch = () => openInkeepWidget('#inkeep-search', 'docs_search_button_clicked');
const openInkeepChat = () => openInkeepWidget('#inkeep-ai-chat', 'docs_ask_ai_button_clicked');

// Custom search trigger rendered in both local and production so the header bar is a
// single, design-controlled element. In production it opens the Inkeep modal; locally
// it is inert. The modal itself is unchanged.
const SearchTrigger: React.FC = () => (
  <button
    type="button"
    aria-label="Search"
    onClick={openInkeepSearch}
    className={cn(
      'focus-base flex items-center justify-between gap-2 w-[200px] h-9 px-3 rounded-lg transition-colors',
      'bg-neutral-100 dark:bg-neutral-1200 border border-neutral-400 dark:border-neutral-900',
      'hover:border-neutral-600 dark:hover:border-neutral-700',
    )}
  >
    <span className="flex items-center gap-2 text-neutral-600 dark:text-neutral-700">
      <MagnifyingGlassIcon className="size-[16px]" aria-hidden />
      <span className="ui-text-label4 font-normal">Search</span>
    </span>
    <span className="flex items-center gap-0.5">
      {['⌘', 'K'].map((key) => (
        <kbd
          key={key}
          className="inline-flex items-center justify-center h-5 min-w-5 px-1 rounded border border-neutral-300 dark:border-neutral-900 bg-neutral-000 dark:bg-neutral-1100 text-[11px] font-medium text-neutral-700 dark:text-neutral-500"
        >
          {key}
        </kbd>
      ))}
    </span>
  </button>
);

const mobileTabs = ['Platform', 'Products', 'Examples'];

const helpResourcesItems = [
  {
    href: '/support',
    icon: <LifebuoyIcon className="size-5" aria-hidden />,
    label: 'Support',
  },
  {
    href: '/docs/sdks',
    icon: <CubeIcon className="size-5" aria-hidden />,
    label: 'SDKs',
  },
  {
    href: 'https://ably.com',
    icon: <Icon name="icon-gui-ably-badge" size="20px" />,
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
  // Which product's TOC the mobile "Products" tab shows. null until the user picks one.
  const [mobileProduct, setMobileProduct] = useState<ProductKey | null>(null);
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

    // The Inkeep search bar is initialised once. On mobile we surface it inside the open
    // menu; otherwise it lives in a hidden holder (the visible desktop trigger is our own
    // SearchTrigger button, which opens this instance's modal).
    const targetId = isMobileMenuOpen ? 'inkeep-search-mobile-mount' : 'inkeep-search-holder';
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
    // Reset the mobile product selection so reopening the menu reflects the current page.
    setMobileProduct(null);
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

  // The mobile "Products" tab shows the user's picked product, falling back to the current
  // page's product (ignoring 'platform', which has its own tab). null renders the
  // "select a product" placeholder.
  const currentProduct = activePage.product && activePage.product !== 'platform' ? activePage.product : null;
  const productsTabProduct = mobileProduct ?? currentProduct;

  // Open the burger menu on the tab matching the current page: the Products tab (with this
  // product's TOC) when viewing product docs, Examples on examples pages, else Platform.
  const defaultMobileTabIndex = currentProduct ? 1 : location.pathname.includes('/examples') ? 2 : 0;

  return (
    <div className="fixed top-0 w-full z-50 bg-neutral-000 dark:bg-neutral-1300 border-b border-neutral-300 dark:border-neutral-1000">
      <div className="flex items-center justify-between h-16 px-5 max-w-[1600px] mx-auto">
        <div className="flex items-center shrink-0">
          <a href="/docs" className="flex items-center gap-2 focus-base px-5 py-2 rounded -ml-5">
            <img src={Logo} width="96px" alt="Ably" className="dark:hidden" />
            <img src={LogoDark} width="96px" alt="Ably" className="hidden dark:block" />
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
              to="/docs/basics"
              className={cn(
                headerLinkClassName,
                activePage.hasProductBar ? activeHeaderLinkClassName : inactiveHeaderLinkClassName,
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
                    <LeftSidebar inHeader product="platform" />
                  </div>,
                  <div key="nav-mobile-products-tab">
                    <ProductBar onSelectProduct={setMobileProduct} selectedProduct={productsTabProduct} />
                    <LeftSidebar inHeader product={productsTabProduct} />
                  </div>,
                  <ExamplesList key="nav-mobile-examples-tab" />,
                ]}
                rootClassName="h-full overflow-y-hidden min-h-[3.1875rem] flex flex-col"
                contentClassName="flex-1 min-h-0 overflow-y-auto"
                tabClassName="ui-text-menu2 !px-4"
                options={{ flexibleTabWidth: true, defaultTabIndex: defaultMobileTabIndex }}
              />
            </div>
          )}
        </div>
        <div id="inkeep-search-mount" className="hidden md:flex items-center justify-end flex-1 min-w-0 ml-4 mr-2">
          <SearchTrigger />
        </div>
        <Tooltip.Provider delayDuration={0} disableHoverableContent>
          <div className="hidden md:flex gap-2 pt-3 md:py-0 px-4 md:px-0 shrink-0">
            <button className={secondaryButtonClassName} onClick={openInkeepChat}>
              <SparklesIcon className="size-[20px]" aria-hidden />
              <span>Ask AI</span>
            </button>
            <DropdownMenu.Root>
              <Tooltip.Root>
                <DropdownMenu.Trigger asChild>
                  <Tooltip.Trigger asChild>
                    <button className={iconButtonClassName} onClick={() => track('docs_help_resources_button_clicked')}>
                      <QuestionMarkCircleIcon className="size-[20px]" aria-hidden />
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
                          {item.icon}
                          <span>{item.label}</span>
                        </div>
                        {item.external && <ArrowTopRightOnSquareIcon className="size-[16px]" aria-hidden />}
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
                    <CommandLineIcon className="size-[20px]" aria-hidden />
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
                      <Tooltip.Content className={tooltipContentClassName}>
                        {sessionState.preferredEmail}
                      </Tooltip.Content>
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
                      <ArrowRightStartOnRectangleIcon className="size-[20px]" aria-hidden />
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
          <button
            className={iconButtonClassName}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Bars3Icon className="size-[20px]" aria-hidden />
          </button>
        </div>

        <div id="inkeep-search-holder" className="hidden">
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
