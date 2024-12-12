import React, { useCallback } from 'react';
import Badge from '@ably/ui/core/Badge';
import Icon from '@ably/ui/core/Icon';
import { IconName } from '@ably/ui/core/Icon/types';
import { ProductName, products as dataProducts } from '@ably/ui/core/ProductTile/data';
import cn from '@ably/ui/core/utils/cn';
import { Image, ImageProps } from '../Image';
import examplesData, { Example } from '../../data/examples';

const ExamplesGrid = ({
  examples = [],
  exampleImages,
  searchTerm,
}: {
  examples: Example[];
  exampleImages: ImageProps[];
  searchTerm: string;
}) => {
  const displayExampleImage = useCallback((exampleImages: ImageProps[], selectedImage: string, productName: string) => {
    const productImage = exampleImages.find((image) => image.name === selectedImage);
    return productImage ? <Image image={productImage} alt={productName} className="h-full" /> : null;
  }, []);

  const badgeColorForProduct = useCallback((product: ProductName) => {
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
  }, []);

  const displayProductLabel = useCallback(
    (product: ProductName, dataProducts: { [key: string]: { label: string } }) =>
      dataProducts[product] ? (
        <Badge key={product} className={cn('uppercase', badgeColorForProduct(product))}>
          {dataProducts[product].label}
        </Badge>
      ) : null,
    [badgeColorForProduct],
  );

  const displayUseCaseLabel = useCallback(
    (useCase: string, useCases: { [key: string]: { label: string } }) =>
      useCases ? (
        <Badge key={useCase} className="uppercase">
          {useCases[useCase].label}
        </Badge>
      ) : null,
    [],
  );

  const highlightSearchTerm = useCallback(
    (text: string) => {
      const searchRegex = new RegExp(`(${searchTerm})`, 'gi');

      return text.split(searchRegex).map((part, index) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <span key={index} className="bg-yellow-200">
            {part}
          </span>
        ) : (
          part
        ),
      );
    },
    [searchTerm],
  );

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(260px,_1fr))] gap-x-20 gap-y-32">
      {examples.map(({ name, description, languages, products, useCases, image }, key) => (
        <div className="w-full relative overflow-hidden group/examples-index-card" key={`${name}-${key}`}>
          <div className="z-0 bg-neutral-100 overflow-hidden h-256 sm:h-200 relative flex justify-center items-center ">
            <div className="group-hover/examples-index-card:scale-105 transition-transform">
              {exampleImages ? displayExampleImage(exampleImages, image, name) : null}
            </div>
            <div className="flex bg-neutral-000 gap-x-6 py-6 px-8 absolute right-12 bottom-12 rounded border border-neutral-200 z-10">
              {languages
                ? languages.map((language) => (
                    <Icon key={language} name={`icon-tech-${language}` as IconName} size="18px" />
                  ))
                : null}
            </div>
          </div>
          <div className="z-10 pt-16">
            <p className="ui-text-h4 text-neutral-1300">{highlightSearchTerm(name)}</p>
            <p className="ui-text-p3 mt-8 text-neutral-900">{highlightSearchTerm(description)}</p>
            <div className="mt-16 flex gap-x-4">
              {products ? products.map((product) => displayProductLabel(product as ProductName, dataProducts)) : null}
              {useCases ? useCases.map((useCase) => displayUseCaseLabel(useCase, examplesData.useCases)) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExamplesGrid;
