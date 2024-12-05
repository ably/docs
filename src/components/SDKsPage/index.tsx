import MainSection, { Tab } from './MainSection';
import { data } from './data';
import { container } from './sdks.module.css';

import hero from './images/sdk-hero.png';

const Content = ({ tab }: { tab: string }) => {
  return (
    <>
      <div className={`${container} mt-12`}>
        <div className="flex justify-between py-64">
          <div className="flex flex-col justify-center">
            <h1 className="w-full ui-text-title">{data.hero.title}</h1>
            <p className="max-w-md ui-text-sub-header pt-16">{data.hero.subtitle}</p>
          </div>
          <img className="hidden sm:block" src={hero} />
        </div>
      </div>
      <MainSection tab={tab as Tab} />
    </>
  );
};

export default Content;
