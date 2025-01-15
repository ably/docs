import { ContentSection } from 'src/data/content/types';
import { BodySection } from './BodySection/BodySection';
import { ImageProps } from 'src/components/Image';

export type CardProps = {
  title: string;
  content: string;
  image: string;
  type: 'hero' | 'feature' | 'sdk';
  links?: LinkProps[];
  callToAction?: CallToActionProps;
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

export const HomepageContent = ({ sections, images }: { sections: ContentSection[]; images: ImageProps[] }) => (
  <article className="mx-auto max-w-[960px]">
    {sections.map((section, index) => (
      <BodySection key={index} section={section} images={images} />
    ))}
  </article>
);
