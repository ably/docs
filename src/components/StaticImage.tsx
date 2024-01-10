import React, { ComponentProps } from 'react';

type StaticImageProps = ComponentProps<'img'> & {
  src: string;
};

export const StaticImage = ({ src, ...attribs }: StaticImageProps) => <img src={src} {...attribs} />;
