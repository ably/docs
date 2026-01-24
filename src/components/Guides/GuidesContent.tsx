import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import GuidesGrid from './GuidesGrid';
import GuidesFilter from './GuidesFilter';
import { ImageProps } from '../Image';
import { guides } from '../../data/guides';
import { filterSearchGuides, SelectedFilters } from './filter-search-guides';
import GuidesNoResults from './GuidesNoResults';
import { useLocation } from '@reach/router';
import { GuideProduct, AIProvider } from '../../data/guides/types';
import { products } from '../../data/guides';

const GuidesContent = ({ guideImages }: { guideImages: ImageProps[] }) => {
  const location = useLocation();

  // Parse product and provider query parameters
  const getInitialFilters = (): SelectedFilters => {
    const params = new URLSearchParams(location.search);
    const productParam = params.get('product');
    const providerParam = params.get('provider');
    const validProductNames = Object.keys(products);

    const initialProducts: GuideProduct[] = productParam
      ? productParam
          .split(',')
          .map((p) => p.trim())
          .filter((product): product is GuideProduct => validProductNames.includes(product))
      : [];

    const validProviderNames: AIProvider[] = ['anthropic', 'openai'];
    const initialProviders: AIProvider[] = providerParam
      ? providerParam
          .split(',')
          .map((p) => p.trim())
          .filter((provider): provider is AIProvider => validProviderNames.includes(provider as AIProvider))
      : [];

    return {
      products: initialProducts,
      aiProviders: initialProviders,
    };
  };

  const [selected, setSelected] = useState<SelectedFilters>(getInitialFilters);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGuides, setFilteredGuides] = useState(guides);

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  useEffect(() => {
    const filtered = filterSearchGuides(guides, selected, searchTerm);
    setFilteredGuides(filtered);
  }, [selected, searchTerm]);

  return (
    <>
      <section className="mx-auto px-6 md:px-0 relative">
        <div className="w-full sm:w-1/2 max-w-[37.5rem] pt-20 sm:pt-24">
          <h1 className="ui-text-title text-title">Guides</h1>
          <p className="ui-text-sub-header mt-4">
            In-depth guides to help you build realtime features with Ably and understand how best to architect an app
            for your use case.
          </p>
        </div>
        <div className="w-full my-10 sm:my-16 flex flex-col sm:flex-row gap-x-10">
          <div className="w-full sm:w-[20%] relative">
            <GuidesFilter selected={selected} setSelected={setSelected} handleSearch={handleSearch} />
          </div>
          <div className="w-full sm:w-[80%] mt-10 sm:mt-0">
            {filteredGuides.length > 0 ? (
              <GuidesGrid guideImages={guideImages} guides={filteredGuides} searchTerm={searchTerm} />
            ) : (
              <GuidesNoResults />
            )}
          </div>
        </div>
      </section>

      <StaticImage
        src="../Examples/images/pattern-grid.png"
        placeholder="blurred"
        width={660}
        height={282}
        alt="Grid Pattern"
        className="!absolute -z-10 right-0 top-16 !hidden sm:!block w-[60%] md:w-[40%]"
      />

      <StaticImage
        src="../Examples/images/mobile-grid.png"
        placeholder="blurred"
        width={260}
        alt="Grid Pattern"
        className="-z-10 right-0 top-16 !absolute !block sm:!hidden"
      />
    </>
  );
};

export default GuidesContent;
