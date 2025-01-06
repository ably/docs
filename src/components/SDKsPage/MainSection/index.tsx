import React from 'react';
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

  return (
    <div>
      <div>
        <div className={`${container}`}>
          <Link
            to="/sdks"
            className={`ui-text-h3 mr-16 px-8 py-16 inline-block relative ${activeTab === Tab.CHANNELS ? 'font-extrabold text-orange-600' : null}`}
          >
            Pub/Sub
          </Link>
          <Link
            to="/sdks?tab=spaces"
            className={`ui-text-h3 mr-16 px-8 py-16 inline-block relative ${activeTab === Tab.SPACES ? 'font-extrabold text-orange-600' : null}`}
          >
            Spaces
          </Link>
          <Link
            to="/sdks?tab=chat"
            className={`ui-text-h3 mr-16 px-8 py-16 inline-block relative ${activeTab === Tab.CHAT ? 'font-extrabold text-orange-600' : null}`}
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
