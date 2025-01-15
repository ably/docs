import cn from '@ably/ui/core/utils/cn';
import { ImageProps, getImageFromList } from 'src/components/Image';
import { BodySectionDescription } from './BodySectionDescription';
import { HeroCard } from './Card/HeroCard';
import { FeatureCard } from './Card/FeatureCard';
import { SdkCard } from './Card/SdkCard';
import FeatureLink from '@ably/ui/core/FeaturedLink';
import { ContentSection } from 'src/data/content/types';

const gridColVariants: Record<number, string> = {
  1: 'lg:grid-cols-1',
  2: 'sm:grid-cols-2 lg:grid-cols-2',
  4: 'sm:grid-cols-4 lg:grid-cols-4',
};

const sectionBottomMarginVariants: Record<number, string> = {
  48: 'mb-48',
  72: 'mb-72',
  80: 'mb-80',
  160: 'mb-160',
};

const gridGapVariants: Record<number, string> = {
  1: '',
  2: 'gap-32',
  4: 'gap-24',
};

export const BodySection = ({ section, images }: { section: ContentSection; images: ImageProps[] }) => {
  const cards = section.cards ?? [];
  const cardsExist = cards.length > 0;
  const columns = section.columns;
  const singleColumn = columns == 1;
  const bottomMargin = sectionBottomMarginVariants[section.bottomMargin ?? 48] ?? sectionBottomMarginVariants[48];

  return (
    <section className={bottomMargin}>
      {section.title && <h2 className="ui-text-h2">{section.title}</h2>}
      {section.description && <BodySectionDescription description={section.description} />}
      {cardsExist && (
        <div
          className={cn({
            [`grid grid-cols-1 ${gridColVariants[columns ?? 1]} ${gridGapVariants[columns ?? 1]}`]: !singleColumn,
          })}
        >
          {cards.map((card, index) => {
            switch (card.type) {
              case 'hero':
                return <HeroCard key={index} {...card} />;
              case 'feature':
                return <FeatureCard key={index} {...card} image={getImageFromList(images, card.image)} />;
              case 'sdk':
                return <SdkCard key={index} {...card} image={getImageFromList(images, card.image)} />;
              default:
                return null;
            }
          })}
        </div>
      )}
      {section.callToAction && (
        <FeatureLink {...section.callToAction} url={section.callToAction.href}>
          {section.callToAction.text}
        </FeatureLink>
      )}
    </section>
  );
};
