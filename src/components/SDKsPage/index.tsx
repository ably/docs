import { StaticImage } from '../StaticImage';
import MainSection, { Tab } from './MainSection';
import { data } from './data';
import { container } from './sdks.module.css';

const Content = ({ tab }: { tab: string }) => {
  return (
    <>
      <div className={`${container} mt-12`}>
        <div className="flex justify-between py-64">
          <div className="flex flex-col justify-center">
            <h1 className="w-full text-title-xl font-medium">{data.hero.title}</h1>
            <p className="max-w-md text-h3 text-dark-grey font-medium pt-16">{data.hero.subtitle}</p>
          </div>
          <StaticImage className="hidden sm:block" src="/images/sdks/sdk-hero.png"></StaticImage>
        </div>
      </div>
      <MainSection tab={tab as Tab} />
    </>
  );
};

export default Content;
