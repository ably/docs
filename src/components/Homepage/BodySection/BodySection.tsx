import React from 'react';
import { Section } from '../HomepageContent';
import { BodySectionDescription } from './BodySectionDescription';
import { BodySectionDescriptionContainer } from './BodySectionDescriptionContainer';
import { BodySectionCard } from './Card/Card';

export const BodySection = ({ section }: { section: Section }) => {
  const cardsExist = section.cards.length > 0;
  return (
    <section className="grid grid-cols-6">
      {section.level ? (
        <section.level className={`ui-text-${section.level} mt-40 col-span-6`}>{section.title}</section.level>
      ) : (
        <h2 className="ui-text-h2 col-span-6">{section.title}</h2>
      )}
      {section.description ? (
        <BodySectionDescription description={section.description} />
      ) : (
        <BodySectionDescriptionContainer />
      )}
      {cardsExist && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 col-span-6 mb-96 gap-24 mr-32">
          {section.cards.map((card, index) => (
            <BodySectionCard
              key={index}
              title={card.title}
              content={card.content}
              link={card.link}
              flag={card.flag}
              callToAction={card.callToAction ?? section.defaultCallToAction}
            />
          ))}
        </div>
      )}
    </section>
  );
};
