import React, { useCallback } from 'react';
import Badge from '@ably/ui/core/Badge';
import cn from '@ably/ui/core/utils/cn';
import { Image, ImageProps } from '../Image';
import { Guide, GuideProduct } from '../../data/guides/types';
import { products } from '../../data/guides';

const GuidesGrid = ({
  guides = [],
  guideImages,
  searchTerm,
}: {
  guides: Guide[];
  guideImages: ImageProps[];
  searchTerm: string;
}) => {
  const displayGuideImage = useCallback((guideImages: ImageProps[], id: string, name: string) => {
    const guideImage = guideImages.find((image) => image.name === id);
    return guideImage ? <Image image={guideImage} alt={name} className="h-full" /> : null;
  }, []);

  const badgeColorForProduct = useCallback((product: GuideProduct) => {
    switch (product) {
      case 'chat':
        return 'text-violet-400';
      case 'spaces':
        return 'text-pink-500';
      case 'liveobjects':
        return 'text-green-600';
      case 'ai-transport':
        return 'text-blue-600';
      default:
        return 'text-orange-700';
    }
  }, []);

  const displayProductLabel = useCallback(
    (product: GuideProduct) =>
      products[product] ? (
        <Badge key={product} className={cn('uppercase', badgeColorForProduct(product))}>
          {products[product].label}
        </Badge>
      ) : null,
    [badgeColorForProduct],
  );

  const highlightSearchTerm = useCallback(
    (text: string) => {
      if (!searchTerm) {
        return text;
      }
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
      {guides.map(({ id, name, description, link, products }, key) => (
        <a
          href={link}
          className="w-full relative overflow-hidden group/guides-index-card cursor-pointer focus-base"
          key={`${name}-${key}`}
          role="button"
          aria-label={`View ${name} guide`}
        >
          <div className="z-0 bg-neutral-100 overflow-hidden h-64 sm:h-[12.5rem] relative flex justify-center items-center">
            <div className="group-hover/guides-index-card:scale-105 transition-transform">
              {guideImages ? displayGuideImage(guideImages, id, name) : null}
            </div>
          </div>
          <div className="z-10 pt-4">
            <p className="ui-text-h4 text-neutral-1300">{highlightSearchTerm(name)}</p>
            <p className="ui-text-p3 mt-2 text-neutral-900">{highlightSearchTerm(description)}</p>
            <div className="mt-4 flex gap-x-1">
              {products ? products.map((product) => displayProductLabel(product)) : null}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default GuidesGrid;
