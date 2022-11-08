import React, { ReactElement } from 'react';
import Zoom from 'react-medium-image-zoom';
import { StaticImage } from 'src/components/StaticImage';
import { HtmlComponentProps } from '../../html-component-props';
import SelfClosingHtmlBlock from '../Html/SelfClosingHtmlBlock';

import 'react-medium-image-zoom/dist/styles.css';
import { classDialog } from './Img.module.css';

const Img = ({ attribs }: HtmlComponentProps<'img'>): ReactElement => {
  const rawSrc = attribs?.src;

  return (
    <Zoom zoomMargin={32} classDialog={classDialog}>
      {rawSrc && /^\/images.*/.test(rawSrc) ? (
        <StaticImage src={rawSrc} {...{ ...attribs }} />
      ) : (
        SelfClosingHtmlBlock('img')({ attribs })
      )}
    </Zoom>
  );
};

export default Img;
