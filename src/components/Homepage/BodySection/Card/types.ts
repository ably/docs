import { ImageProps } from 'src/components/Image';
import { ContentCard } from 'src/data/content/types';

export type ContentCardWithImage = ContentCard & { image: ImageProps };
