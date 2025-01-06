import { BodySection } from './BodySection/BodySection';
import { LinkProps, CallToActionProps } from '../ProductPage/ProductPageContent';
import { ImageProps } from 'src/components/Image';

export type CardProps = {
  title: string;
  content: string;
  image: ImageProps;
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

export const HomepageContent = ({ sections, images }: { sections: SectionProps[]; images: ImageProps[] }) => (
  <article className="mx-auto" style={{ maxWidth: '960px' }}>
    {sections.map((section, index) => (
      <BodySection key={index} section={section} images={images} />
    ))}
  </article>
);
