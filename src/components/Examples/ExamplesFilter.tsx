import React from 'react';
import Icon from '@ably/ui/core/Icon';
import { products } from '@ably/ui/core/ProductTile/data';
import ExamplesCheckbox from './ExamplesCheckbox';
import examples from '../../data/examples';

const ExamplesFilter = ({
  selectProduct,
  selectUseCases,
  handleSearch,
  selectedProducts,
  selectedUseCases,
}: {
  selectProduct: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectUseCases: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedProducts: string[];
  selectedUseCases: string[];
}) => {
  const filters = [
    { key: 'product', data: products, selected: selectedProducts, handleSelect: selectProduct },
    { key: 'use-case', data: examples.useCases, selected: selectedUseCases, handleSelect: selectUseCases },
  ];

  return (
    <>
      <div className="h-[34px] sm:h-[30px] w-20 absolute left-8 top-4 flex items-center justify-center select-none cursor-default">
        <Icon name={'icon-gui-search'} size="1rem" />
      </div>
      <input
        type="search"
        className="ui-input pl-36 w-full h-40 sm:h-34 ui-text-p3"
        placeholder="Find an example"
        autoComplete="off"
        aria-label="Search examples"
        role="searchbox"
        onChange={(e) => handleSearch(e)}
      />
      <div className="flex flex-col gap-20 mt-20">
        {filters.map(({ key, selected, handleSelect, data }) => (
          <div key={key}>
            <p className="ui-text-overline2 font-medium text-neutral-700">{key.replace(/-/g, ' ').toUpperCase()}</p>
            <div className="mt-8 flex ui-text-p4 flex-col gap-8">
              <ExamplesCheckbox
                label="All"
                name={`${key}-all`}
                value="all"
                disabled={selected.length === 0}
                isChecked={selected.length === 0}
                selectProductOrUseCase={handleSelect}
              />
              {Object.entries(data).map(([itemKey, item]) => (
                <ExamplesCheckbox
                  key={itemKey}
                  label={item.label}
                  name={`${key}-${itemKey}`}
                  value={itemKey}
                  selectProductOrUseCase={handleSelect}
                  isChecked={selected.includes(itemKey)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ExamplesFilter;
