import React from 'react';
import Badge from '@ably/ui/core/Badge';
import Icon from '@ably/ui/core/Icon';
import { IconName } from '@ably/ui/core/Icon/types';
import { ProductName, products as dataProducts } from '@ably/ui/core/ProductTile/data';
import cn from '@ably/ui/core/utils/cn';
import { Image, ImageProps } from '../Image';
import examplesData, { Example } from '../../data/examples';

const ExamplesGrid = ({ examples, exampleImages }: { examples: Example[]; exampleImages: ImageProps[] }) => {
  const displayExampleImage = (exampleImages: ImageProps[], selectedImage: string, productName: string) => {
    const productImage = exampleImages.find((image) => image.name === selectedImage);
    return productImage ? <Image image={productImage} alt={productName} /> : null;
  };

  const badgeColorForProduct = (product: ProductName) => {
    switch (product) {
      case 'chat':
        return 'text-violet-400';
      case 'spaces':
        return 'text-pink-500';
      case 'liveSync':
        return 'text-blue-600';
      case 'assetTracking':
        return 'text-green-600';
      case 'liveObjects':
        return 'text-green-600';
      default:
        return 'text-orange-700';
    }
  };

  const displayProductLabel = (product: ProductName, dataProducts: { [key: string]: { label: string } }) =>
    dataProducts[product] ? (
      <Badge key={product} className={cn('uppercase', badgeColorForProduct(product))}>
        {dataProducts[product].label}
      </Badge>
    ) : null;

  const displayUseCaseLabel = (useCase: string, useCases: { [key: string]: { label: string } }) =>
    useCases ? (
      <Badge key={useCase} className="uppercase">
        {useCases[useCase].label}
      </Badge>
    ) : null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-20 gap-y-32">
      {examples
        ? examples.map(({ name, description, languages, products, useCases, image }, key) => (
            <div className="w-full" key={`${name}-${key}`}>
              <div className="bg-neutral-100 h-256 sm:h-200 relative flex justify-center items-center">
                {exampleImages ? displayExampleImage(exampleImages, image, name) : null}
                <div className="flex bg-neutral-000 gap-x-6 py-6 px-8 absolute right-12 bottom-12 rounded	border border-neutral-200 z-20">
                  {languages
                    ? languages.map((language) => (
                        <Icon key={language} name={`icon-tech-${language}` as IconName} size="18px" />
                      ))
                    : null}
                </div>
              </div>
              <p className="ui-text-h4 mt-16 text-neutral-1300">{name}</p>
              <p className="ui-text-p3 mt-8 text-neutral-900">{description}</p>
              <div className="mt-16 flex gap-x-4">
                {products ? products.map((product) => displayProductLabel(product as ProductName, dataProducts)) : null}
                {useCases ? useCases.map((useCase) => displayUseCaseLabel(useCase, examplesData.useCases)) : null}
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default ExamplesGrid;
