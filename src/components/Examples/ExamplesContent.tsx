import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import ExamplesGrid from './ExamplesGrid';
import ExamplesFilter from './ExamplesFilter';
import { ImageProps } from '../Image';
import examples from '../../data/examples';
import { filterSearchExamples } from './filter-search-examples';
import ExamplesNoResults from './ExamplesNoResults';

export type SelectedFilters = { products: string[]; useCases: string[] };

const ExamplesContent = ({ exampleImages }: { exampleImages: ImageProps[] }) => {
  const [selected, setSelected] = useState<SelectedFilters>({ products: [], useCases: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredExamples, setFilteredExamples] = useState(examples.examples);

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  useEffect(() => {
    const filteredExamples = filterSearchExamples(examples.examples, selected, searchTerm);
    setFilteredExamples(filteredExamples);
  }, [selected, searchTerm]);

  return (
    <>
      <section className="mx-auto px-24 md:px-0 max-w-[1152px] relative">
        <div className="w-full sm:w-1/2 max-w-[600px] pt-80 sm:pt-96">
          <h1 className="ui-text-title text-title">Examples</h1>
          <p className="ui-text-sub-header mt-16">
            From avatar stacks to live cursors, learn how deliver live chat, multiplayer collaboration features, and
            more.
          </p>
        </div>
        <div className="w-full my-40 sm:my-64 flex flex-col sm:flex-row gap-x-40">
          <div className="w-full sm:w-[20%] relative">
            <ExamplesFilter selected={selected} setSelected={setSelected} handleSearch={handleSearch} />
          </div>
          <div className="w-full sm:w-[80%] mt-40 sm:mt-0">
            {filteredExamples.length > 0 ? (
              <ExamplesGrid exampleImages={exampleImages} examples={filteredExamples} searchTerm={searchTerm} />
            ) : (
              <ExamplesNoResults />
            )}
          </div>
        </div>
      </section>

      <StaticImage
        src="./images/GridPattern.png"
        placeholder="blurred"
        width={660}
        height={282}
        alt="Grid Pattern"
        className="!absolute -z-10 right-0 top-64 !hidden sm:!block w-[60%] md:w-[40%]"
      />

      <StaticImage
        src="./images/GridMobile.png"
        placeholder="blurred"
        width={260}
        alt="Grid Pattern"
        className="-z-10 right-0 top-64 !absolute !block sm:!hidden"
      />
    </>
  );
};

export default ExamplesContent;
