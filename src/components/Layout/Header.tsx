import React, { useContext } from 'react';
import { navigate, useLocation } from '@reach/router';
import Icon from '@ably/ui/core/Icon';
import AblyHeader from '@ably/ui/core/Header';
import { SearchBar } from '../SearchBar';
import LeftSidebar from './LeftSidebar';
import UserContext from 'src/contexts/user-context';
import ExamplesList from '../Examples/ExamplesList';
import TabMenu from '@ably/ui/core/TabMenu';

type HeaderProps = {
  searchBar?: boolean;
};

const Header: React.FC<HeaderProps> = ({ searchBar = true }) => {
  const location = useLocation();
  const userContext = useContext(UserContext);
  const sessionState = {
    ...userContext.sessionState,
    signedIn: userContext.sessionState.signedIn ?? false,
    logOut: userContext.sessionState.logOut ?? { token: '', href: '' },
    accountName: userContext.sessionState.accountName ?? '',
    account: userContext.sessionState.account ?? { links: { dashboard: { href: '#' } } },
  };

  const tabs = ['Docs', 'Examples'];
  const tabLinks = ['/docs', '/examples'];

  return (
    <AblyHeader
      nav={
        <TabMenu
          tabs={tabs}
          tabClassName="ui-text-menu3 !px-4"
          tabOnClick={(index) => {
            navigate(tabLinks[index] ?? '#');
          }}
          options={{
            underline: false,
            flexibleTabHeight: true,
            defaultTabIndex: location.pathname.includes('/examples') ? 1 : 0,
          }}
        />
      }
      mobileNav={
        <TabMenu
          tabs={tabs}
          contents={[
            <LeftSidebar inHeader key="nav-mobile-documentation-tab" />,
            <ExamplesList key="nav-mobile-examples-tab" />,
          ]}
          rootClassName="h-full overflow-y-hidden min-h-[3.1875rem] flex flex-col"
          contentClassName="h-full py-4 overflow-y-scroll"
          tabClassName="ui-text-menu2 !px-4"
          options={{ flexibleTabWidth: true }}
        />
      }
      searchButton={
        <button
          className="cursor-pointer focus-base rounded px-0 pt-1 text-neutral-1300 dark:text-neutral-000"
          aria-label="Toggle search"
          onClick={() => {
            const searchContainer = document.querySelector('#inkeep-search > div');
            const searchButton = searchContainer?.shadowRoot?.querySelector('button');

            if (searchButton) {
              searchButton.click();
            }
          }}
        >
          <Icon name="icon-gui-magnifying-glass-outline" size="1.5rem" />
        </button>
      }
      searchButtonVisibility="mobile"
      searchBar={
        searchBar ? (
          <SearchBar
            displayLocation="homepage"
            extraStyleOptions={{
              wrapperContainer: { width: '100%', maxWidth: '280px' },
              inputContainer: { width: '100%', maxWidth: '280px' },
            }}
          />
        ) : null
      }
      headerCenterClassName="max-w-[17.5rem]"
      headerLinks={[
        {
          href: '/docs/sdks',
          label: 'SDKs',
          external: true,
        },
        {
          href: '/support',
          label: 'Support',
        },
      ]}
      sessionState={sessionState}
      logoHref="/docs"
      location={location}
    />
  );
};

export default Header;
