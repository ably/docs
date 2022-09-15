import React, { ReactElement } from 'react';
import { StaticImage } from 'src/components/StaticImage';
import { HtmlComponentProps } from '../../html-component-props';
import SelfClosingHtmlBlock from '../Html/SelfClosingHtmlBlock';

const Img = ({ attribs }: HtmlComponentProps<'img'>): ReactElement => {
  const rawSrc = attribs?.src;
  if (rawSrc && /^\/images.*/.test(rawSrc)) {
    return <StaticImage src={rawSrc} {...{ ...attribs }} />;
  }
  return SelfClosingHtmlBlock('img')({ attribs });
};

export default Img;
