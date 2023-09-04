import React from 'react';
import cn from 'classnames';
import { SectionProps } from '../HomepageContent';
import { BodySectionDescription } from './BodySectionDescription';
import { HeroCard } from './Card/HeroCard';
import { CallToAction } from './CallToAction';

const cardTypes = {
  hero: HeroCard,
};

export const BodySection = ({ section }: { section: SectionProps }) => {
  const cards = section.cards ?? [];
  const cardsExist = cards.length > 0;
  const columns = section.columns;
  const singleColumn = columns == 1;

  const gridColVariants = {
    1: 'lg:grid-cols-1',
    2: 'sm:grid-cols-2 lg:grid-cols-2',
    4: 'sm:grid-cols-4 lg:grid-cols-4',
  };

  const sectionBottomMarginVariants = {
    48: 'mb-48',
    72: 'mb-72',
  };

  return (
    <section className={`${sectionBottomMarginVariants[section.bottomMargin]} w-full`} style={{ maxWidth: '960px' }}>
      {section.title && <h2 className="ui-text-h2">{section.title}</h2>}
      {section.description && <BodySectionDescription description={section.description} />}
      {cardsExist && (
        <div
          className={cn({
            [`grid grid-cols-1 sm:grid-cols-2 ${gridColVariants[columns]}  gap-24`]: !singleColumn,
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
