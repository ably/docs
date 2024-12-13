import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import Icon from '@ably/ui/core/Icon';
import ExamplesGrid from './ExamplesGrid';

const ExamplesContent = () => {
  return (
    <section className="mx-auto px-24 md:px-0 max-w-[1152px] relative">
      <div className="w-1/2 max-w-[600px] pt-96">
        <h1 className="ui-text-title text-title">Examples</h1>
        <p className="ui-text-sub-header mt-16">
          From avatar stacks to live cursors, learn how deliver live chat, multiplayer collaboration features, and more.
        </p>
      </div>
      <div className="absolute right-0 top-0 z-0 w-1/2">
        <StaticImage src="./images/GridPattern.png" placeholder="blurred" width={800} alt="Grid Pattern" />
      </div>

      <div className="w-full my-64 flex flex-row">
        <div className="w-[20%] relative">
          <div className="h-20 w-20 absolute left-8 top-4 flex items-center justify-center select-none cursor-default">
            <Icon name={'icon-gui-search'} size={'1rem'} />
          </div>
          <input
            type="search"
            className="ui-input pl-40 h-22 w-[176px] ui-text-p3"
            placeholder="Find an example"
            autoComplete="off"
          />
          <div className="mt-20">
            <p className="ui-text-overline2 font-medium text-neutral-700">PRODUCT</p>
            <div className="mt-8 flex ui-text-p4 flex-col gap-8">
              <div className="ui-checkbox-p1 flex items-center">
                <input
                  data-ui-checkbox-native=""
                  type="checkbox"
                  id="checkbox-example-1"
                  name="checkbox-example-1"
                  className="ui-checkbox-input"
                  value="yes"
                />
                <div data-ui-checkbox-styled="" className="ui-checkbox-styled">
                  <svg className="ui-checkbox-styled-tick w-[1rem] h-[1rem]">
                    <use xlinkHref="#sprite-icon-gui-tick"></use>
                  </svg>
                </div>
                <label htmlFor="checkbox-example-1" className="ui-text-p4">
                  All
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[80%]">
          <ExamplesGrid />
        </div>
      </div>
    </section>
  );
};

export default ExamplesContent;
