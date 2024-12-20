import { BodySection } from './BodySection/BodySection';
import { ImageProps } from 'src/components/Image';

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

export type CardProps = {
  title: string;
  type: string;
  content: string;
  image: ImageProps;
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

export const ProductPageContent = ({ sections, images }: { sections: SectionProps[]; images: ImageProps[] }) => (
  <article className="px-24 md:px-0">
    {sections.map((section, index) => (
      <BodySection key={index} section={section} images={images} />
    ))}
  </article>
);
