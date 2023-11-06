import React from 'react';
import Card from '../Card';
import { container, active_tab } from './sdks.module.css';

const MainSection = () => {
  const [urlParams] = React.useState(() => {
    const queryString = typeof window !== 'undefined' ? window.location.search : '';
    return new URLSearchParams(queryString);
  });
  const [activeTab, setActiveTab] = React.useState(urlParams.get('tab') !== Tab.SPACES ? Tab.CHANNELS : Tab.SPACES);

  const handleActiveTab = (value: Tab) => {
    urlParams.set('tab', value);

    setActiveTab(value);

    const pageUrl = `?${urlParams.toString()}`;

    window && window.history.pushState('', '', pageUrl);
  };

  return (
    <div>
      <div>
        <div className={`${container}`}>
          <button className={`text-2xl text-medium text-primary px-8 py-16 ${active_tab}`}>Pub/Sub Channels</button>
          <button className="text-2xl text-medium px-8 py-16">Spaces</button>
        </div>
        <hr />
      </div>
      <div className={`${container}`}>
        <p className="text-p1 text-charcoal-grey font-light py-72">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque mollitia, delectus voluptatibus ratione ipsam
          iste dolore quas quidem quod. Nemo officia sequi tempora doloribus exercitationem excepturi rem laudantium,
          optio voluptas similique quibusdam ullam explicabo a fugiat eum impedit nesciunt modi officiis dolorem.
        </p>
      </div>
      <div className={`${container}`}>{/* Cards container */}</div>
    </div>
  );
};

export default MainSection;
