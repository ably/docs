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
  <article className="col-span-4 2xl:col-span-6 w-full">
    {sections.map((section, index) => (
      <BodySection key={index} section={section} />
    ))}
  </article>
);
