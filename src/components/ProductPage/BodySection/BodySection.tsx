import React from 'react';
import { SectionProps } from '../HomepageContent';
import { BodySectionDescription } from './BodySectionDescription';
import { FeatureCard } from './Card/FeatureCard';
import { QuickstartCard } from './Card/QuickstartCard';
import { ExampleCard } from './Card/ExampleCard';

const cardTypes = {
  feature: FeatureCard,
  quickstart: QuickstartCard,
  example: ExampleCard,
};

const betaPillStyle = {
  fontSize: 'var(--fs-p3)',
  borderRadius: '0.5rem',
  background: '#F8C100',
  marginTop: '0.125rem',
  paddingTop: '0.313rem',
};

export const BodySection = ({ section }: { section: SectionProps }) => {
  const cards = section.cards ?? [];
  const cardsExist = cards.length > 0;
  const columns = section.columns;

  const gridColVariants = {
    2: 'lg:grid-cols-2',
    5: 'lg:grid-cols-5',
    4: 'lg:grid-cols-4',
  };

  return (
    <section className="mb-48">
      {section.releaseStage ? (
        <h1 className={`ui-text-${section.level} mt-40 flex items-center`}>
          {section.title}
          <span style={betaPillStyle} className="px-12 py-4 ml-12 leading-normal">
            {section.releaseStage}
          </span>
        </h1>
      ) : section.level ? (
        <section.level className={`ui-text-${section.level} mt-40`}>{section.title}</section.level>
      ) : (
        <h2 className="ui-text-h2">{section.title}</h2>
      )}
      {section.description ? <BodySectionDescription description={section.description} /> : null}
      {cardsExist && (
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${gridColVariants[columns]} mb-${section.bottomMargin} gap-24`}
        >
          {cards.map((card, index) => {
            const Card = cardTypes[card.type];
            return <Card key={index} {...card} />;
          })}
        </div>
      )}
      {section.callToAction ? (
        <div className="h-full flex">
          <a className="mr-4 docs-link font-medium" href={section.callToAction.href}>
            {section.callToAction.text}
          </a>
          <Icon name="icon-gui-arrow-right" size="1rem" />
        </div>
      ) : null}
    </section>
  );
};
