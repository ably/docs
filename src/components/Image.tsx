import { GatsbyImage, GatsbyImageData, getImage } from 'gatsby-plugin-image';
import { ComponentProps } from 'react';

export type ImageProp = {
  childImageSharp: GatsbyImageData;
  extension: string;
  publicURL: string;
};

export type ImageComponentProps = ComponentProps<'img'> & {
  image: ImageProp;
};

export const Image = ({ image, src, ...attribs }: ImageProps) => {
  if (!image) {
    return;
  }

  if (src) {
    console.warn(`You're using <Image> in an unsupported way by passing src="${src}"`);
    return <img {...attribs} src={src} />;
  }

  const { childImageSharp, extension, publicURL } = image ?? {};

  if (!childImageSharp && extension === 'svg') {
    return <img {...attribs} src={publicURL} />;
  }

  const { alt } = attribs ?? '';
  delete attribs.alt;

  return <GatsbyImage image={getImage(image)} alt={alt} {...attribs} />;
};
