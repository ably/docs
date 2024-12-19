import React from 'react';
import Icon from '@ably/ui/core/Icon';
import { products } from '@ably/ui/core/ProductTile/data';
import ExamplesCheckbox from './ExamplesCheckbox';
import examples from '../../data/examples';
import './examples-checkbox.css';

const ExamplesFilter = ({
  selectProduct,
  selectUseCases,
  handleSearch,
  checkAllProducts,
  selectedProducts,
  checkAllUseCases,
  selectedUseCases,
}: {
  selectProduct: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectUseCases: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checkAllProducts: boolean;
  selectedProducts: string[];
  checkAllUseCases: boolean;
  selectedUseCases: string[];
}) => {
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
        onChange={(e) => handleSearch(e)}
      />
      <div className="mt-20 mb-8">
        <p className="ui-text-overline2 font-medium text-neutral-700">PRODUCT</p>
        <div className="mt-8 flex ui-text-p4 flex-col gap-8">
          <ExamplesCheckbox
            label="All"
            name="products-all"
            value="all"
            disabled={checkAllProducts}
            isChecked={checkAllProducts}
            selectProductOrUseCase={selectProduct}
          />
          {Object.entries(products).map(([key, product]) => (
            <ExamplesCheckbox
              key={key}
              label={product.label}
              name="products-all"
              value={key}
              selectProductOrUseCase={selectProduct}
              isDefaultChecked={!checkAllProducts}
              isChecked={selectedProducts.includes(key)}
            />
          ))}
        </div>
      </div>
      <div className="mt-20">
        <p className="ui-text-overline2 font-medium text-neutral-700">USE CASE</p>
        <div className="mt-8 flex ui-text-p4 flex-col gap-8">
          <ExamplesCheckbox
            label="All"
            name="use-case-all"
            value="all"
            disabled={checkAllUseCases}
            isChecked={checkAllUseCases}
            selectProductOrUseCase={selectUseCases}
          />
          {Object.entries(examples.useCases).map(([key, useCase]) => (
            <ExamplesCheckbox
              key={key}
              label={useCase.label}
              name="use-case-all"
              value={key}
              selectProductOrUseCase={selectUseCases}
              isDefaultChecked={!checkAllUseCases}
              isChecked={selectedUseCases.includes(key)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ExamplesFilter;
