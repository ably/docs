import NextImage from 'next/image';
import { ComponentProps } from 'react';

export type ImageProps = {
  // Next.js compatible props
  src?: string;
  name?: string;
  base?: string;
  width?: number;
  height?: number;
  // Legacy Gatsby props (optional for compatibility)
  childImageSharp?: unknown;
  extension?: string;
  publicURL?: string;
};

export type ImageComponentProps = ComponentProps<'img'> & {
  image: ImageProps;
};

export const getImageFromList = (images: ImageProps[] = [], name?: string | ImageProps): ImageProps | undefined => {
  const imageName = typeof name === 'string' ? name : name?.base;
  const result = images.find((image) => image.base === imageName || image.name === imageName);

  if (name && result === undefined) {
    console.warn(`Could not find image '${name}' in list`, images);
  }

  return result;
};

export const Image = ({ image, src, alt, className, ...attribs }: ImageComponentProps) => {
  if (!image) {
    return null;
  }

  // Handle direct src prop
  if (src) {
    return <img {...attribs} src={src} alt={alt ?? ''} className={className} />;
  }

  // Handle Next.js style image (src in image object)
  if (image.src) {
    return (
      <NextImage
        src={image.src}
        alt={alt ?? ''}
        className={className}
        width={image.width || 400}
        height={image.height || 300}
        style={{ objectFit: 'cover' }}
        {...attribs}
      />
    );
  }

  // Handle legacy Gatsby publicURL
  if (image.publicURL) {
    return <img {...attribs} src={image.publicURL} alt={alt ?? ''} className={className} />;
  }

  return null;
};
