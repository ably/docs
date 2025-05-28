import ProductTile from '@ably/ui/core/ProductTile';
import cn from '@ably/ui/core/utils/cn';
import { Image, ImageProps, getImageFromList } from 'src/components/Image';
import type { PlatformProductsSectionData, PlatformCardData } from 'src/data/content/types';
import { navigate } from '../Link';

const PlatformFeatureCard = ({
  card,
  platformStackLayers,
}: {
  card: PlatformCardData;
  platformStackLayers: (ImageProps | undefined)[];
}) => {
  const baseClasses = 'absolute right-0 md:left-0 md:right-auto w-full transition-transform duration-500 ease-in-out';
  const animationClasses = [
    'group-hover:ease-out group-hover:-translate-y-2 group-hover:duration-350',
    'group-hover:ease-out group-hover:-translate-y-1 group-hover:duration-300',
    '',
  ];
  const zIndices = ['z-30', 'z-20', 'z-10'];
  const initialTops = [
    'top-[0.9375rem] md:top-[3.125rem]',
    'top-[1.875rem] md:top-[4.6875rem]',
    'top-[2.8125rem] md:top-[6.25rem]',
  ];

  return (
    <div
      className="md:col-span-1 md:row-span-2 lg:row-span-3 p-3 bg-white dark:bg-neutral-1300 rounded-lg border border-neutral-300 dark:border-neutral-1000 flex flex-col relative group overflow-hidden cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-1200"
      onClick={() => {
        navigate(card.link);
      }}
    >
      <h3 className="block ui-text-p1 font-bold text-neutral-1000 dark:text-neutral-300 mb-1">{card.title}</h3>
      <p className="text-neutral-800 dark:text-neutral-500 ui-text-p3 flex-grow">{card.content}</p>
      {platformStackLayers && platformStackLayers.length > 0 && (
        <div className="absolute bottom-0 right-[-15px] w-[5.625rem] h-[4.6875rem] md:right-[-30px] md:w-[10.8125rem] md:h-[10.25rem]">
          {platformStackLayers.map((image, index) => {
            return image ? (
              <Image
                key={index}
                image={image}
                className={cn(baseClasses, zIndices[index], initialTops[index], animationClasses[index])}
                aria-hidden={true}
              />
            ) : null;
          })}
        </div>
      )}
    </div>
  );
};

export const PlatformAndProducts = ({
  section,
  images,
}: {
  section: PlatformProductsSectionData;
  images: ImageProps[];
}) => {
  const platformStackLayers = [
    getImageFromList(images, 'platform_layer_1.svg'),
    getImageFromList(images, 'platform_layer_2.svg'),
    getImageFromList(images, 'platform_layer_3.svg'),
  ];

  return (
    <div className="grid grid-cols-1 md:grid-rows-3 md:grid-cols-3 lg:grid-rows-2 lg:grid-cols-4 gap-3">
      <PlatformFeatureCard card={section.platformCard} platformStackLayers={platformStackLayers} />
      <div className="lg:col-span-3 md:col-span-2 md:row-span-3 grid grid-cols-2 gap-3 lg:grid-cols-3">
        {section.productCards.map((card) => (
          <ProductTile
            key={card.name}
            name={card.name}
            animateIcons={true}
            className="border border-neutral-300 dark:border-neutral-1000 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-1200"
            onClick={() => {
              if (card.link) {
                navigate(card.link);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};
