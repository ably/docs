import examples from '../../data/examples';
import Icon from '@ably/ui/core/Icon';
import { IconName } from '@ably/ui/core/Icon/types';
import Badge from '@ably/ui/core/Badge';
import React from 'react';
import cn from '@ably/ui/core/utils/cn';
import { Image, ImageProps } from '../Image';

const ExamplesGrid = ({ exampleImages }: { exampleImages: ImageProps[] }) => {
  const findExampleImage = (exampleImages: ImageProps[], selectedImage: string) =>
    exampleImages.find((image) => image.name === selectedImage) as ImageProps;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-20 gap-y-32">
      {examples.examples.map(({ name, description, languages, products, useCases, image }, key) => (
        <div className="w-full" key={cn(name, '-', key)}>
          <div className="bg-neutral-100 h-256 sm:h-200 relative flex justify-center items-center">
            <Image image={findExampleImage(exampleImages, image)} alt={name} />
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
            {products
              ? products.map((product) => (
                  <Badge key={product} className="text-orange-700">
                    {product}
                  </Badge>
                ))
              : null}

            {useCases ? useCases.map((useCase) => <Badge key={useCase}>{useCase}</Badge>) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExamplesGrid;
