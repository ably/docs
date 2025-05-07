import { ProductName } from '@ably/ui/core/ProductTile/data';

export type ContentLink = {
  text: string;
  href: string;
};

export type ContentCardType = 'feature' | 'hero' | 'sdk';

export type ContentCard = {
  title: string;
  type: ContentCardType;
  image?: string;
  content?: string;
  link?: string;
  links?: ContentLink[];
  callToAction?: ContentLink;
};

export type ContentSection = {
  title?: string;
  description?: string;
  level?: keyof JSX.IntrinsicElements | null;
  features?: string[];
  releaseStage?: string;
  callToAction?: { text: string; href: string; type: string };
  columns?: number;
  bottomMargin?: number;
  cards?: ContentCard[];
};

export type ContentMeta = {
  title: string;
  description: string;
  image: string;
  twitter: string;
};

export type ContentData = {
  name: string;
  meta: ContentMeta;
  platformProducts: PlatformProductsSectionData;
  examples: ExamplesSectionData;
};

export type PlatformCardData = {
  title: string;
  content: string;
  image: string;
  link: string;
};

export type ProductCardData = {
  name: ProductName;
  link: string;
};

export type PlatformProductsSectionData = {
  title: string;
  platformCard: PlatformCardData;
  productCards: ProductCardData[];
};

export type ExamplesSectionData = {
  title: string;
  link: ContentLink;
  content: string;
  image: string;
};
