import React from 'react';
import MainSection from './MainSection';
import { StaticImage } from '../StaticImage';

const Content = () => {
  return (
    <div>
      <div className="mx-auto mt-12" style={{ maxWidth: '960px' }}>
        <div className="flex justify-between">
          <div className="flex flex-col justify-center">
            <h1 className="w-full text-title font-medium">SDKs</h1>
            <p className="ui-text-h3 text-dark-grey font-medium pt-16" style={{ maxWidth: '480px' }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus, voluptate vero?
            </p>
          </div>
          <div>
            <StaticImage src="/images/sdks/sdk-hero.png"></StaticImage>
          </div>
        </div>
      </div>
      <MainSection />
    </div>
  );
};

export default Content;
