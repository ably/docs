import React from 'react';
import { container, active_tab } from '../sdks.module.css';
import CardGrid from '../Card/CardGrid';
import { data } from '../data';
import Link from 'src/components/Link';

export enum Tab {
  CHANNELS = 'channels',
  SPACES = 'spaces',
}

const MainSection = ({ tab }: { tab: Tab }) => {
  const activeTab = tab !== Tab.SPACES ? Tab.CHANNELS : Tab.SPACES;

  return (
    <div>
      <div>
        <div className={`${container}`}>
          <Link
            to="/sdks"
            className={`ui-text-h3 mr-16 px-8 py-16 inline-block ${activeTab === Tab.CHANNELS ? active_tab : null}`}
          >
            Pub/Sub
          </Link>
          <Link
            to="/sdks?tab=spaces"
            className={`text-h3 font-normal px-8 py-16 inline-block ${activeTab === Tab.SPACES ? active_tab : null}`}
          >
            Spaces
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
