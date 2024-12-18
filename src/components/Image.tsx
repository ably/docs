import { GatsbyImage, IGatsbyImageData, getImage } from 'gatsby-plugin-image';
import { ComponentProps } from 'react';

export type ImageProps = {
  childImageSharp: IGatsbyImageData;
  extension: string;
  publicURL: string;
  src?: string;
  base?: string;
  name?: string;
};

export type ImageComponentProps = ComponentProps<'img'> & {
  image: ImageProps;
};

export const getImageFromList = (images: ImageProps[] = [], name?: string | ImageProps): ImageProps | undefined => {
  const imageName = typeof name === 'string' ? name : name?.base;
  const result = images.find((image) => image.base === imageName);

  if (name && result === undefined) {
    console.warn(`Could not find image '${name}' in list`, images);
  }

  return result;
};

export const Image = ({ image, src, ...attribs }: ImageComponentProps) => {
  if (!image) {
    return null;
  }

  if (src) {
    console.warn(`You're using <Image> in an unsupported way by passing src="${src}"`);
    return <img {...attribs} src={src} />;
  }

  const { childImageSharp, extension, publicURL } = image ?? {};

  if (!childImageSharp && extension === 'svg') {
    return <img {...attribs} src={publicURL} />;
  }

  const { alt, className } = attribs ?? {};
  const imageAttributes = { alt: alt ?? '', className };
  const fetchedImage = getImage(image.childImageSharp);

  if (fetchedImage) {
    return <GatsbyImage image={fetchedImage} {...imageAttributes} />;
  }

  return null;
};
