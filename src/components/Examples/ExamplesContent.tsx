import React, { useEffect, useState } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import ExamplesGrid from './ExamplesGrid';
import ExamplesFilter from './ExamplesFilter';
import { ImageProps } from '../Image';
import examples from '../../data/examples';
import { filterSearchExamples } from './filter-search-examples';

const ExamplesContent = ({ exampleImages }: { exampleImages: ImageProps[] }) => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>(['all']);
  const [selectedUseCases, setSelectedUseCases] = useState<string[]>(['all']);
  const [filteredExamples, setFilteredExamples] = useState(examples.examples);

  const selectProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedProducts([...selectedProducts, e.target.value]);
    } else {
      setSelectedProducts(selectedProducts.filter((product) => product !== e.target.value));
    }
  };

  const selectUseCases = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedUseCases([...selectedUseCases, e.target.value]);
    } else {
      setSelectedUseCases(selectedUseCases.filter((product) => product !== e.target.value));
    }
  };

  useEffect(() => {
    const filteredExamples = filterSearchExamples(examples.examples, selectedProducts, selectedUseCases);
    setFilteredExamples(filteredExamples);
  }, [selectedProducts, selectedUseCases]);

  return (
    <>
      <section className="mx-auto px-24 md:px-0 max-w-[1152px] relative z-10">
        <div className="w-full sm:w-1/2 max-w-[600px] pt-80 sm:pt-96">
          <h1 className="ui-text-title text-title">Examples</h1>
          <p className="ui-text-sub-header mt-16">
            From avatar stacks to live cursors, learn how deliver live chat, multiplayer collaboration features, and
            more.
          </p>
        </div>
        <div className="w-full my-40 sm:my-64 flex flex-col sm:flex-row gap-x-40">
          <div className="w-full sm:w-[20%] relative">
            <ExamplesFilter selectProduct={selectProduct} selectUseCases={selectUseCases} />
          </div>
          <div className="w-full sm:w-[80%] mt-40 sm:mt-0">
            <ExamplesGrid exampleImages={exampleImages} examples={filteredExamples} />
          </div>
        </div>
      </section>

      <StaticImage
        src="./images/GridPattern.png"
        placeholder="blurred"
        width={660}
        height={282}
        alt="Grid Pattern"
        className="absolute z-0 right-0 top-64 hidden sm:block w-[60%] md:w-[40%]"
      />

      <StaticImage
        src="./images/GridMobile.png"
        placeholder="blurred"
        width={260}
        alt="Grid Pattern"
        className="z-0 right-0 top-64 absolute block sm:hidden"
      />
    </>
  );
};

export default ExamplesContent;
