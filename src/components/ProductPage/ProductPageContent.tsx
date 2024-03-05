import React from 'react';
import { BodySection } from './BodySection/BodySection';

export type LinkProps = {
  text: string;
  href: string;
  external: string;
};

export type CallToActionProps = {
  text: string;
  href: string;
  external: boolean;
  type: string;
};

export type CardProps = {
  title: string;
  type: string;
  content: string;
  image: string;
  link: string;
  external: boolean;
  links: LinkProps[];
};

export type SectionProps = {
  title: string;
  level: keyof JSX.IntrinsicElements | null;
  description: string | null;
  columns: number;
  bottomMargin: number;
  releaseStage: string;
  callToAction: CallToActionProps;
  cards: CardProps[];
};

export const ProductPageContent = ({ sections }: { sections: SectionProps[] }) => (
  <article className="px-24 md:pl-40 md:pr-48 xl:pr-64">
    {sections.map((section, index) => (
      <BodySection key={index} section={section} />
    ))}
  </article>
);
