import React, { useContext } from 'react';
import { useLocation } from '@reach/router';
import Icon from '@ably/ui/core/Icon';
import AblyHeader from '@ably/ui/core/Header';
import { SearchBar } from '../SearchBar';
import LeftSidebar from './LeftSidebar';
import UserContext from 'src/contexts/user-context';

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

  // TODO: reenable when examples are ready to be released
  // const tabs = ['Documentation', { label: 'Examples', disabled: true }];
  // const tabLinks = (index: number) => {
  //   switch (index) {
  //     case 0:
  //       return '/docs';
  //     case 1:
  //       return '/docs/examples';
  //     default:
  //       return '#';
  //   }
  // };

  return (
    <AblyHeader
      // TODO: reenable when examples are ready to be released
      // nav={
      //   <TabMenu
      //     tabs={tabs}
      //     tabClassName="ui-text-menu3 !px-16"
      //     tabOnClick={(index) => {
      //       navigate(tabLinks(index));
      //     }}
      //     options={{ underline: false, flexibleTabHeight: true }}
      //   />
      // }
      // mobileNav={
      //   <TabMenu
      //     tabs={tabs}
      //     contents={[<LeftSidebar inHeader key="nav-mobile-documentation-tab" />, <ExamplesList key="nav-mobile-examples-tab" />]}
      //     rootClassName="h-full overflow-y-hidden min-h-[51px] flex flex-col"
      //     contentClassName="h-full py-16 overflow-y-scroll"
      //     tabClassName="ui-text-menu2 !px-16"
      //     options={{ flexibleTabWidth: true }}
      //   />
      // }
      // TODO:
      // - remove mt-16 from inHeader link when examples are ready to be released
      // - add ExamplesList to mobileNav when examples are ready to be released
      mobileNav={<LeftSidebar inHeader key="nav-mobile-documentation-tab" />}
      searchButton={
        <button
          className="cursor-pointer focus-base rounded px-0 pt-4 text-neutral-1300 dark:text-neutral-000"
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
