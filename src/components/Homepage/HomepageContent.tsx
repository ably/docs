import { BodySection } from './BodySection/BodySection';
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

export type LinkProps = {
  text: string;
  href: string;
  external: boolean;
};

export type CallToActionProps = {
  text: string;
  href: string;
  external: boolean;
  type: string;
};

export const HomepageContent = ({ sections, images }: { sections: SectionProps[]; images: ImageProps[] }) => (
  <article className="mx-auto max-w-[960px]">
    {sections.map((section, index) => (
      <BodySection key={index} section={section} images={images} />
    ))}
  </article>
);
