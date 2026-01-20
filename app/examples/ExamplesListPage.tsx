'use client';

import React, { ChangeEvent, useCallback, useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import ExamplesGrid from '@/src/components/Examples/ExamplesGrid';
import ExamplesFilter from '@/src/components/Examples/ExamplesFilter';
import { examples } from '@/src/data/examples/';
import { filterSearchExamples } from '@/src/components/Examples/filter-search-examples';
import ExamplesNoResults from '@/src/components/Examples/ExamplesNoResults';
import { ProductName, products as dataProducts } from '@ably/ui/core/ProductTile/data';
import { useSearchParams } from 'next/navigation';
import { ImageProps } from '@/src/components/Image';

export type SelectedFilters = { products: ProductName[]; useCases: string[] };

export function ExamplesListPage() {
  const searchParams = useSearchParams();

  // Generate image props from example IDs
  const exampleImages: ImageProps[] = useMemo(() => {
    return examples.map((example) => ({
      name: example.id,
      src: `/images/examples/${example.id}.png`,
      width: 400,
      height: 300,
    }));
  }, []);

  // Parse product query parameters and filter for valid ProductName values
  const getInitialProducts = (): ProductName[] => {
    const productParam = searchParams?.get('product');
    const validProductNames = Object.keys(dataProducts).map((product) => product.toLowerCase());

    if (!productParam) {
      return [];
    }

    // Split comma-separated products and filter only valid ProductName values
    return productParam
      .split(',')
      .map((p) => p.trim())
      .filter((product): product is ProductName =>
        validProductNames.includes(product as string),
      ) as ProductName[];
  };

  const [selected, setSelected] = useState<SelectedFilters>({
    products: getInitialProducts(),
    useCases: [],
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredExamples, setFilteredExamples] = useState(examples);

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  useEffect(() => {
    const filteredExamples = filterSearchExamples(examples, selected, searchTerm);
    setFilteredExamples(filteredExamples);
  }, [selected, searchTerm]);

  return (
    <>
      <section className="max-w-screen-lg mx-auto px-6 md:px-0 relative">
        <div className="w-full sm:w-1/2 max-w-[37.5rem] pt-20 sm:pt-24">
          <h1 className="ui-text-title text-title">Examples</h1>
          <p className="ui-text-sub-header mt-4">
            From avatar stacks to live cursors, learn how deliver live chat, multiplayer collaboration features, and
            more.
          </p>
        </div>
        <div className="w-full my-10 sm:my-16 flex flex-col sm:flex-row gap-x-10">
          <div className="w-full sm:w-[20%] relative">
            <ExamplesFilter selected={selected} setSelected={setSelected} handleSearch={handleSearch} />
          </div>
          <div className="w-full sm:w-[80%] mt-10 sm:mt-0">
            {filteredExamples.length > 0 ? (
              <ExamplesGrid exampleImages={exampleImages} examples={filteredExamples} searchTerm={searchTerm} />
            ) : (
              <ExamplesNoResults />
            )}
          </div>
        </div>
      </section>

      {/* Background pattern images */}
      <Image
        src="/images/examples/pattern-grid.png"
        width={660}
        height={282}
        alt="Grid Pattern"
        className="absolute -z-10 right-0 top-16 hidden sm:block w-[60%] md:w-[40%]"
      />

      <Image
        src="/images/examples/mobile-grid.png"
        width={260}
        height={200}
        alt="Grid Pattern"
        className="-z-10 right-0 top-16 absolute block sm:hidden"
      />
    </>
  );
}
