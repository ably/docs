import React, { ComponentProps } from 'react';
import { srcFromDocsSite } from 'src/utilities';

type StaticImageProps = ComponentProps<'img'> & {
  src: string;
};

export const StaticImage = ({ src, ...attribs }: StaticImageProps) => <img src={srcFromDocsSite(src)} {...attribs} />;
