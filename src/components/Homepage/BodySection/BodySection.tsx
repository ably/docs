import React from 'react';
import cn from 'classnames';
import { SectionProps } from '../HomepageContent';
import { BodySectionDescription } from './BodySectionDescription';
import { HeroCard } from './Card/HeroCard';
import { CallToAction } from './CallToAction';
import { FeatureCard } from './Card/FeatureCard';
import { SdkCard } from './Card/SdkCard';

const cardTypes = {
  hero: HeroCard,
  feature: FeatureCard,
  sdk: SdkCard,
};

const gridColVariants = {
  1: 'lg:grid-cols-1',
  2: 'sm:grid-cols-2 lg:grid-cols-2',
  4: 'sm:grid-cols-4 lg:grid-cols-4',
};

const sectionBottomMarginVariants = {
  48: 'mb-48',
  72: 'mb-72',
};

const gridGapVariants = {
  2: 'gap-32',
  4: 'gap-24',
};

export const BodySection = ({ section }: { section: SectionProps }) => {
  const cards = section.cards ?? [];
  const cardsExist = cards.length > 0;
  const columns = section.columns;
  const singleColumn = columns == 1;
  const bottomMargin = sectionBottomMarginVariants[section.bottomMargin];

  return (
    <section className={bottomMargin}>
      {section.title && <h2 className="ui-text-h2">{section.title}</h2>}
      {section.description && <BodySectionDescription description={section.description} />}
      {cardsExist && (
        <div
          className={cn({
            [`grid grid-cols-1 ${gridColVariants[columns]} ${gridGapVariants[columns]}`]: !singleColumn,
          })}
        >
          {cards.map((card, index) => {
            const Card = cardTypes[card.type];
            return <Card key={index} {...card} />;
          })}
        </div>
      )}
      {section.callToAction && <CallToAction {...section.callToAction}></CallToAction>}
    </section>
  );
};
