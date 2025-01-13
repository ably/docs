import React from 'react';
import cn from '@ably/ui/core/utils/cn';
import { container } from '../sdks.module.css';
import CardGrid from '../Card/CardGrid';
import { data } from '../data';
import Link from 'src/components/Link';

export enum Tab {
  CHANNELS = 'channels',
  SPACES = 'spaces',
  CHAT = 'chat',
}

const MainSection = ({ tab }: { tab: Tab }) => {
  const activeTab = Object.values(Tab).includes(tab as Tab) ? tab : Tab.CHANNELS;

  const activeTabClasses =
    "font-extrabold text-orange-600 after:content-[''] after:absolute after:w-full after:h-2 after:-bottom-[9px] after:left-0 after:bg-orange-600 after:rounded";

  return (
    <div>
      <div>
        <div className={`${container}`}>
          <Link
            to="/sdks"
            className={cn(
              'ui-text-h3 mr-16 px-8 py-16 inline-block relative',
              activeTab === Tab.CHANNELS && activeTabClasses,
            )}
          >
            Pub/Sub
          </Link>
          <Link
            to="/sdks?tab=spaces"
            className={cn(
              'ui-text-h3 mr-16 px-8 py-16 inline-block relative',
              activeTab === Tab.SPACES && activeTabClasses,
            )}
          >
            Spaces
          </Link>
          <Link
            to="/sdks?tab=chat"
            className={cn(
              'ui-text-h3 mr-16 px-8 py-16 inline-block relative',
              activeTab === Tab.CHAT && activeTabClasses,
            )}
          >
            Chat
          </Link>
        </div>
        <hr />
      </div>
      <div className={`${container}`}>
        <p className="ui-text-p1 text-charcoal-grey py-72">{data.tabs[activeTab].text}</p>
      </div>
      <CardGrid currentProduct={data.tabs[activeTab].cards} />
    </div>
  );
};

export default MainSection;
