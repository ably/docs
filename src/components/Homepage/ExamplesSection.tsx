import type { ExamplesSectionData } from 'src/data/content/types';
import { getImageFromList, ImageProps } from 'src/components/Image';
import { Image } from 'src/components/Image';
import FeaturedLink from '@ably/ui/core/FeaturedLink';

export const ExamplesSection = ({ section, images }: { section: ExamplesSectionData; images: ImageProps[] }) => {
  const imageUrl = getImageFromList(images, section.image);
  const backgroundGrid = getImageFromList(images, 'examples_grid.png');

  return (
    <div className="relative overflow-hidden flex flex-col rounded-lg border border-neutral-300 dark:border-neutral-1000 pt-6 pl-6 md:p-6 lg:p-8 bg-gradient-to-b from-[#fff] to-[#F6F8FA]">
      {backgroundGrid && (
        <div className="w-full h-full absolute top-0 right-0 z-0">
          <Image image={backgroundGrid} />
        </div>
      )}
      <div className="md:mb-0 z-[1]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="ui-text-h3 text-neutral-1300 dark:text-neutral-000">{section.title}</h3>
          <div className="mr-6 md:mr-0">
            <FeaturedLink
              iconColor="text-orange-600"
              additionalCSS="ui-text-p3 text-neutral-1300 dark:text-neutral-000 hover:text-neutral-1300 dark:hover:text-neutral-000"
              url={section.link.href}
            >
              {section.link.text}
            </FeaturedLink>
          </div>
        </div>
        <p className="text-neutral-800 dark:text-neutral-500 ui-text-p3 max-w-[18.75rem] mb-[1.875rem]">{section.content}</p>
        {imageUrl && (
          <div className="mt-6 float-right md:mt-0 md:absolute md:bottom-0 md:right-0 md:z-0 max-w-[29.375rem]">
            <Image image={imageUrl} />
          </div>
        )}
      </div>
    </div>
  );
};
