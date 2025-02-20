import React, { useState, useEffect, useContext } from 'react';
import Icon from '@ably/ui/core/Icon';
import AblyHeader from '@ably/ui/core/Header';
import { SearchBar } from '../SearchBar';
import LeftSidebar from './LeftSidebar';
import UserContext from 'src/contexts/user-context';
import { pathWithBase } from './utils/nav';

type HeaderProps = {
  hideSearchBar?: boolean;
};

const Header: React.FC<HeaderProps> = ({ hideSearchBar = false }) => {
  const [showMenu, setShowMenu] = useState(false);
  const userContext = useContext(UserContext);
  const sessionState = {
    ...userContext.sessionState,
    signedIn: userContext.sessionState.signedIn ?? false,
    account: userContext.sessionState.account ?? { links: { dashboard: { href: '#' } } },
  };

  // TODO: reenable when examples are ready to be released
  // const tabs = ['Documentation', { label: 'Examples', disabled: true }];
  // const tabLinks = (index: number) => {
  //   switch (index) {
  //     case 0:
  //       return pathWithBase('/');
  //     case 1:
  //       return pathWithBase('/examples');
  //     default:
  //       return '#';
  //   }
  // };

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
      //     contents={[<LeftSidebar inHeader key="nav-mobile-documentation-tab" />, null]}
      //     rootClassName="h-full overflow-y-hidden min-h-[51px] flex flex-col"
      //     contentClassName="h-full py-16 overflow-y-scroll"
      //     tabClassName="ui-text-menu2 !px-16"
      //     options={{ flexibleTabWidth: true }}
      //   />
      // }
      // TODO: remove mt-16 from inHeader link when examples are ready to be released
      mobileNav={<LeftSidebar inHeader key="nav-mobile-documentation-tab" />}
      searchButton={
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
          <Icon name="icon-gui-magnifying-glass-outline" size="1.5rem" />
        </button>
      }
      searchButtonVisibility="mobile"
      searchBar={
        !hideSearchBar ? (
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
          href: pathWithBase('/sdks'),
          label: 'SDKs',
          external: true,
        },
        {
          href: '/support',
          label: 'Support',
        },
      ]}
      sessionState={sessionState}
      logoHref={process.env.NODE_ENV === 'development' ? '/' : '/docs'}
    />
  );
};

export default Header;
