import React, { ComponentProps } from 'react';
import { srcFromDocsSite } from 'src/utilities';

type SvgObjectProps = ComponentProps<'object'> & {
  src: string;
};

export const SvgObject = ({ src, ...attribs }: SvgObjectProps) => (
  <object type="image/svg+xml" data={srcFromDocsSite(src)} {...attribs}>
    svg-image
  </object>
);
