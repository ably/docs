import { BodySection } from './BodySection/BodySection';
import { ImageProps } from 'src/components/Image';
import { ContentSection } from 'src/data/content/types';

export const HomepageContent = ({ sections, images }: { sections: ContentSection[]; images: ImageProps[] }) => (
  <article className="mx-auto" style={{ maxWidth: '960px' }}>
    {sections.map((section, index) => (
      <BodySection key={index} section={section} images={images} />
    ))}
  </article>
);
