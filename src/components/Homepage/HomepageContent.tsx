import { BodySection } from './BodySection/BodySection';
import { LinkProps } from '../ProductPage/ProductPageContent';

export type CallToActionProps = {
  text: string;
  href: string;
};

export type CardProps = {
  title: string;
  content: string;
  image: string;
  links: LinkProps[];
};

export type SectionProps = {
  title: string;
  type: string;
  columns: number;
  mainImage: string;
  bottomMargin: number;
  description: string | null;
  callToAction: CallToActionProps;
  cards: CardProps[];
};

export const HomepageContent = ({ sections }: { sections: SectionProps[] }) => (
  <article className="mx-auto px-24 md:px-0" style={{ maxWidth: '960px' }}>
    {sections.map((section, index) => (
      <BodySection key={index} section={section} />
    ))}
  </article>
);
