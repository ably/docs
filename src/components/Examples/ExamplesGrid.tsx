import React, { useCallback } from 'react';
import Badge from '@ably/ui/core/Badge';
import Icon from '@ably/ui/core/Icon';
import { IconName } from '@ably/ui/core/Icon/types';
import { ProductName, products as dataProducts } from '@ably/ui/core/ProductTile/data';
import cn from '@ably/ui/core/utils/cn';
import { Image, ImageProps } from '../Image';
import { DEFAULT_EXAMPLE_LANGUAGES } from '../../data/examples/';
import { Example } from '../../data/examples/types';

const ExamplesGrid = ({
  examples = [],
  exampleImages,
  searchTerm,
}: {
  examples: Example[];
  exampleImages: ImageProps[];
  searchTerm: string;
}) => {
  const displayExampleImage = useCallback((exampleImages: ImageProps[], id: string, name: string) => {
    const productImage = exampleImages.find((image) => image.name === id);
    return productImage ? <Image image={productImage} alt={name} className="h-full" /> : null;
  }, []);

  const badgeColorForProduct = useCallback((product: ProductName) => {
    switch (product) {
      case 'chat':
        return 'text-violet-400';
      case 'spaces':
        return 'text-pink-500';
      case 'liveSync':
        return 'text-blue-600';
      case 'liveObjects':
        return 'text-green-600';
      case 'aiTransport':
        return 'text-cyan-500';
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

  // const displayUseCaseLabel = useCallback(
  //   (useCase: UseCase) =>
  //     useCasesData[useCase] ? (
  //       <Badge key={useCase} className="uppercase">
  //         {useCasesData[useCase].label}
  //       </Badge>
  //     ) : null,
  //   [],
  // );

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
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(260px,_1fr))] gap-x-5 gap-y-8">
      {examples.map(({ id, name, description, languages, products }, key) => (
        <a
          href={`/examples/${id}`}
          className="w-full relative overflow-hidden group/examples-index-card cursor-pointer focus-base"
          key={`${name}-${key}`}
          role="button"
          aria-label={`View ${name} example`}
        >
          <div className="z-0 bg-neutral-100 overflow-hidden h-64 sm:h-[12.5rem] relative flex justify-center items-center ">
            <div className="group-hover/examples-index-card:scale-105 transition-transform">
              {exampleImages ? displayExampleImage(exampleImages, id, name) : null}
            </div>
            <div className="flex bg-neutral-000 gap-x-1.5 py-1.5 px-2 absolute right-3 bottom-3 rounded border border-neutral-200 z-10">
              {(languages ?? DEFAULT_EXAMPLE_LANGUAGES).map((language) => (
                <Icon key={language} name={`icon-tech-${language}` as IconName} size="18px" />
              ))}
            </div>
          </div>
          <div className="z-10 pt-4">
            <p className="ui-text-h4 text-neutral-1300">{highlightSearchTerm(name)}</p>
            <p className="ui-text-p3 mt-2 text-neutral-900">{highlightSearchTerm(description)}</p>
            <div className="mt-4 flex gap-x-1">
              {products ? products.map((product) => displayProductLabel(product as ProductName, dataProducts)) : null}
              {/* {useCases ? useCases.map((useCase) => displayUseCaseLabel(useCase)) : null} */}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default ExamplesGrid;
