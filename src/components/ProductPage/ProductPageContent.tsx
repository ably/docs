import { ContentSection } from 'src/data/content/types';
import { BodySection } from './BodySection/BodySection';
import { ImageProps } from 'src/components/Image';

export const ProductPageContent = ({ sections, images }: { sections: ContentSection[]; images: ImageProps[] }) => (
  <article>
    {sections.map((section, index) => (
      <BodySection key={index} section={section} images={images} />
    ))}
  </article>
);
