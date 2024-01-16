import { BodySection } from './BodySection/BodySection';
import { LinkProps, CallToActionProps } from '../ProductPage/ProductPageContent';

export type CardProps = {
  title: string;
  content: string;
  image: string;
  type: 'hero' | 'feature' | 'sdk';
  links?: LinkProps[];
  callToAction?: CallToActionProps;
};

export type SectionProps = {
  title: string;
  type: string;
  columns: 1 | 2 | 4;
  mainImage: string;
  bottomMargin: 48 | 72;
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
