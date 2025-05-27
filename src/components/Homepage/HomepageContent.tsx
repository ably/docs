import type { ContentData } from 'src/data/content/types';
import { Image, ImageProps, getImageFromList } from 'src/components/Image';
import { HeroSection } from './HeroSection';
import { PlatformAndProducts } from './PlatformAndProducts';
import { ExamplesSection } from './ExamplesSection';
import { ChangelogSection } from './Changelog';

export const HomepageContent = ({
  homepageContent,
  images,
}: {
  homepageContent: ContentData;
  images: ImageProps[];
}) => {
  const { platformProducts, examples } = homepageContent;

  const mobileImage = getImageFromList(images, 'background_pattern_mobile.svg');
  const desktopImage = getImageFromList(images, 'background_pattern.svg');

  return (
    <div className="mx-auto mb-16">
      {mobileImage && (
        <Image
          image={mobileImage}
          className="absolute top-[3.9375rem] right-0 z-[-1] block sm:hidden w-auto h-auto pointer-events-none"
          aria-hidden="true"
        />
      )}
      {desktopImage && (
        <Image
          image={desktopImage}
          className="absolute top-[3.9375rem] right-0 z-[-1] hidden sm:block w-auto h-auto pointer-events-none"
          aria-hidden="true"
        />
      )}

      <div className="mt-4">
        <HeroSection />
      </div>

      <div className="mb-3 md:mb-5">
        <h3 className="ui-text-h3 pb-6">{platformProducts.title}</h3>
        <PlatformAndProducts section={platformProducts} images={images} />
      </div>

      <div className="grid grid-cols-1 gap-y-[1.875rem] mt-16 md:gap-y-0 md:grid-cols-2 md:gap-x-3 lg:gap-x-6">
        <ExamplesSection section={examples} images={images} />

        <ChangelogSection />
      </div>
    </div>
  );
};
