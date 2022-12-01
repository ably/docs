import React from 'react';
import { BodySection } from './BodySection/BodySection';

export type CardProps = {
  title: string;
  content: string;
  link: string;
  flag: string | null;
  callToAction: string;
};

export type Section = {
  title: string;
  level: keyof JSX.IntrinsicElements | null;
  description: string | null;
  defaultCallToAction: string;
  cards: CardProps[];
};

export const HomepageContent = ({ sections }: { sections: Section[] }) => (
  <article className="px-24 md:pl-40 md:pr-48 xl:pr-64">
    {sections.map((section, index) => (
      <BodySection key={index} section={section} />
    ))}
  </article>
);
