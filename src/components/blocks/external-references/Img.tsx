import React, { ComponentProps, ReactElement } from 'react';
import { HtmlComponentProps } from '../../html-component-props';
import SelfClosingHtmlBlock from '../Html/SelfClosingHtmlBlock';

type CustomStaticImageProps =
  | ComponentProps<'img'>
  | {
      src: string;
    };

const CustomStaticImage = ({ src, ...attribs }: CustomStaticImageProps) => (
  <img src={`${process.env.GATSBY_DOCS_SITE_URL}/${src}`} {...attribs} />
);

const Img = ({ attribs }: HtmlComponentProps<'img'>): ReactElement => {
  const rawSrc = attribs?.src;
  if (rawSrc && /^\/images.*/.test(rawSrc)) {
    return <CustomStaticImage src={rawSrc} {...{ ...attribs }} />;
  }
  return SelfClosingHtmlBlock('img')({ attribs });
};

export default Img;
