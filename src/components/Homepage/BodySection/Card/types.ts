import { ImageProps } from 'src/components/Image';
import { ContentCard } from 'src/data/content/types';

export type ContentCardWithImage = Omit<ContentCard, 'image'> & { image?: ImageProps };

export type ContentCardWithoutImage = Omit<ContentCard, 'image'>;
